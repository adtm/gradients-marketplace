const GradientMarketplace = artifacts.require('GradientMarketplace')
const GradientToken = artifacts.require('GradientToken')

const { BN, expectRevert } = require('@openzeppelin/test-helpers')

const faker = require('faker')

contract('Gradient marketplace', (accounts) => {
  let tokenInstance
  let markeplaceInstance

  const price = new BN(20)

  let leftColor
  let rightColor

  beforeEach(async () => {
    tokenInstance = await GradientToken.deployed('', '')
    markeplaceInstance = await GradientMarketplace.deployed(tokenInstance.address)

    leftColor = faker.commerce.color()
    rightColor = faker.commerce.color()
  })

  it('should receive nft address on constructor', async () => {
    const passedTokenAddress = await markeplaceInstance.gradientToken()
    assert.equal(passedTokenAddress, tokenInstance.address)
  })

  describe('sellGradient', () => {
    it('should put a gradient for sale by contract owner', async () => {
      const tokenId = new BN(0)

      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0],
      })

      const result = await markeplaceInstance.sellTransactionByTokenId.call(0)
      assert.deepEqual(result[0].toString(), tokenId.toString())
      assert.deepEqual(result[1].toString(), accounts[0].toString())
      assert.deepEqual(result[2], true)
      assert.deepEqual(result[3].toString(), price.toString())
    })

    it("shouldn't allow to sell gradient to not an owner", async () => {
      const tokenId = new BN(1)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })

      await expectRevert(
        markeplaceInstance.sellGradient(tokenId, price, {
          from: accounts[1],
        }),
        "Gradient doesn't belong to you"
      )
    })

    it("shouldn't allow to sell gradient for 0 price", async () => {
      const tokenId = new BN(2)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })

      await expectRevert(
        markeplaceInstance.sellGradient(tokenId, new BN(0), {
          from: accounts[0],
        }),
        'Sell price cannot be negative or zero'
      )
    })
  })

  describe('cancelSellGradient', () => {

    it("shouldn allow to cancel a gradient sale for owner", async () => {
      const tokenId = new BN(3)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0],
      })

      await markeplaceInstance.cancelSellGradient(tokenId, {
        from: accounts[0],
      })

      const result = await markeplaceInstance.sellTransactionByTokenId.call(3)
      assert.deepEqual(result[0].toString(), '0')
      assert.deepEqual(result[1].toString(), '0x0000000000000000000000000000000000000000')
      assert.deepEqual(result[2], false)
      assert.deepEqual(result[3].toString(), '0')
    })

    it("shouldn't allow to cancel a gradient sale to not an owner", async () => {
      const tokenId = new BN(4)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0],
      })

      await expectRevert(
        markeplaceInstance.cancelSellGradient(tokenId, {
          from: accounts[1],
        }),
        "Gradient doesn't belong to you"
      )
    })
  })

  describe('buyGradient', () => {
    it("shouldn't allow to buy a gradient, which is not for sale", async () => {
      const tokenId = new BN(5)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })

      await expectRevert(
        markeplaceInstance.buyGradient(tokenId, {
          from: accounts[1],
        }),
        'Gradient is not for sale'
      )
    })

    it("shouldn't allow to buy an own gradient for the owner", async () => {
      const tokenId = new BN(6)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0],
      })

      await expectRevert(
        markeplaceInstance.buyGradient(tokenId, {
          from: accounts[0],
        }),
        "Gradient can't be bought by owner"
      )
    })

    it('should fail if sent transaction value is lower than gradient price', async () => {
      const tokenId = new BN(7)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0],
      })

      await expectRevert(
        markeplaceInstance.buyGradient(tokenId, {
          from: accounts[1],
          value: new BN(1),
        }),
        'Gradient price is higher than sent amount'
      )
    })

    it('should buy a gradient when the seller approves it', async () => {
      const tokenId = new BN(8)
      await tokenInstance.createGradient(leftColor, rightColor, { from: accounts[0] })
      await markeplaceInstance.sellGradient(tokenId, price, {
        from: accounts[0],
      })
      const tokenOwner = await tokenInstance.ownerOf(tokenId)
      assert.deepEqual(tokenOwner, accounts[0])

      await tokenInstance.approve(markeplaceInstance.address, tokenId, { from: accounts[0] })
      await markeplaceInstance.buyGradient(tokenId, {
        from: accounts[1],
        value: 200,
      })

      const transferredOwner = await tokenInstance.ownerOf(tokenId)
      assert.deepEqual(transferredOwner, accounts[1])
    })
  })
})
