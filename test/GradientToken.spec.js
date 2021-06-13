const GradientToken = artifacts.require('GradientToken')
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const faker = require('faker')

contract('Gradient token', (accounts) => {
  let leftColor
  let rightColor
  let tokenInstance

  beforeEach(async () => {
    tokenInstance = await GradientToken.deployed('', '')
    leftColor = faker.commerce.color()
    rightColor = faker.commerce.color()
  })

  it('should make deployer as the owner of the token', async () => {
    const owner = await tokenInstance.owner()

    assert.equal(owner, accounts[0])
  })

  describe('mint', () => {
    it('should allow to mint tokens', async () => {
      const transaction = await tokenInstance.createGradient(leftColor, rightColor)
      expectEvent(transaction, 'CreatedGradient', {
        tokenId: new BN(0),
      })

      const gradientByTokenId = await tokenInstance.getGradient(0)
      assert.deepEqual(gradientByTokenId.left, leftColor)
      assert.deepEqual(gradientByTokenId.right, rightColor)
    })

    it('should allow to mint tokens only to owner', async () => {
      await expectRevert(
        tokenInstance.createGradient(leftColor, rightColor, {
          from: accounts[1],
        }),
        'caller is not the owner'
      )
    })

    it('should not allow to mint already existing gradient', async () => {
      await tokenInstance.createGradient(leftColor, rightColor)

      await expectRevert(
        tokenInstance.createGradient(leftColor, rightColor, {
          from: accounts[0],
        }),
        'Gradient already exists'
      )
    })
  })
})
