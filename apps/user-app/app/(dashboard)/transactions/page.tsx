// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";
// import prisma from "@repo/db/client";

// async function getTransactions() {
//     const session = await getServerSession(authOptions);
//     const txns = await prisma.onRampTransaction.findMany({
//         where: {
//             userId: Number(session?.user?.id)
//         },
//         orderBy: {
//             startTime: 'desc'  // Sort transactions by startTime in descending order
//         }
//     });
//     return txns.map(t => ({
//         id: t.id,
//         time: t.startTime,
//         amount: t.amount,
//         status: t.status,
//         provider: t.provider
//     }));
// }

// export default async function TransactionsPage() {
//     const transactions = await getTransactions();

//     return (
//         <div className="w-screen">
//             <div className="font-bold text-5xl py-10 text-purple-900 italic">
//                 Transactions
//             </div>
//             <div className="p-4">
//                 {transactions.length > 0 ? (
//                     <ul>
//                         {transactions.map(transaction => (
//                             <li key={transaction.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
//                                 <div><strong>Time:</strong> {new Date(transaction.time).toLocaleString()}</div>
//                                 <div><strong>Amount:</strong> {transaction.amount / 100}</div>
//                                 <div><strong>Status:</strong> {transaction.status}</div>
//                                 <div><strong>Provider:</strong> {transaction.provider}</div>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <div>No transactions found.</div>
//                 )}
//             </div>
//         </div>
//     );
// }
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getTransactions() {
    const session = await getServerSession(authOptions);
    const onRampTxns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    const p2pTxns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
        },
        include: {
            fromUser: true,
            toUser: true
        }
    });

    const transactions = [
        ...onRampTxns.map(t => ({
            id: t.id,
            time: t.startTime,
            amount: t.amount,
            status: t.status,
            provider: t.provider,
            type: 'onRamp'
        })),
        ...p2pTxns.map(t => ({
            id: t.id,
            time: t.timestamp,
            amount: t.amount,
            status: 'Success',
            provider: `From: ${t.fromUser.name} To: ${t.toUser.name}`,
            type: 'p2p'
        }))
    ];
    transactions.sort((a, b) => b.time.getTime() - a.time.getTime());

    return transactions;
}

export default async function TransactionsPage() {
    const transactions = await getTransactions();

    return (
        <div className="w-screen px-4">
            <div className="font-bold text-5xl py-10 text-purple-900 italic text-center md:text-left">
                Transactions
            </div>
            <div className="p-4">
                {transactions.length > 0 ? (
                    <ul>
                        {transactions.map(transaction => (
                            <li key={transaction.id} className="mb-4 p-4 border border-gray-300 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div className="flex-grow">
                                    <div><strong>Time:</strong> {new Date(transaction.time).toLocaleString()}</div>
                                    <div><strong>Amount:</strong> {transaction.amount / 100}</div>
                                    <div><strong>Status:</strong> {transaction.status}</div>
                                    <div><strong>Provider:</strong> {transaction.provider}</div>
                                </div>
                                <div className="text-right mt-2 md:mt-0 md:ml-4">
                                    <strong>Type:</strong> {transaction.type}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No transactions found.</div>
                )}
            </div>
        </div>
    );
}
