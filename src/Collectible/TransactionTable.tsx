import React, { useState, useEffect } from 'react';
import { useEthereumProvider } from '../hooks/ethereum';
import BN from 'bn.js';
import { shortenAddress } from '../utils/addressShortener';
import { Link } from 'react-router-dom';


const people = [
	{
		name: 'Jane Cooper',
		title: 'Regional Paradigm Technician',
		department: 'Optimization',
		role: 'Admin',
		email: 'jane.cooper@example.com',
		image:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
	},
	// More people...
]

interface Transaction {
	buyer: string;
	owner: string;
	price: string;
	date: string;
}

export default function Example({ id }: { id: string }) {

	const { contracts: { marketplaceContract } } = useEthereumProvider()
	const [transactions, setTransactions] = useState<Transaction[]>([])

	const getTransactions = async () => {
		const length = await marketplaceContract.methods.getTransactionCount(new BN(id)).call();
		console.log(length)

		const transactionsFetched = []
		for (let i = 0; i < length; i++) {
			const { buyer, owner, price, date } = await marketplaceContract.methods.getTransaction(new BN(id), i).call();
			transactionsFetched.push({ buyer, owner, price, date })
		}

		console.log(transactionsFetched)
		setTransactions(transactionsFetched);
	}

	useEffect(() => {
		getTransactions()

	}, [])

	if (transactions.length == 0) {
		return (
			<p className="text-xs">No transactions yet 🌻</p>
		)
	}

	return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Date
                    </th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Owner
                    </th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Buyer
                    </th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Price
                    </th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{transactions.map((transaction) => (
									<tr key={transaction.date}>
										<td className="px-6 py-4  ">
											<div className="text-sm ">{new Date(Number(transaction.date) * 1000).toLocaleDateString()}</div>
										</td>
										<td className="px-6 py-4 font-medium">
											<Link to={`/owner/${transaction.owner}`}>
												<div className="text-sm">{shortenAddress(transaction.owner)}</div>
											</Link>
										</td>
										<td className="px-6 py-4  font-medium">
											<Link to={`/owner/${transaction.buyer}`}>
												<div className="text-sm">{shortenAddress(transaction.buyer)}</div>
											</Link>
										</td>
										<td className="px-6 py-4  ">
											<div className="text-sm">{transaction.price} <span className="text-xs">ONE</span></div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}