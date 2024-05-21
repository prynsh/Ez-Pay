// import { Card } from "@repo/ui/card";

// export const OnRampTransactions = ({
//     transactions
// }: {
//     transactions: {
//         time: Date,
//         amount: number,
//         status: string,
//         provider: string
//     }[]
// }) => {
//     if (!transactions.length) {
//         return (
//             <Card title="Recent Transactions">
//                 <div className="text-center pb-8 pt-8">
//                     No recent transactions
//                 </div>
//             </Card>
//         );
//     }

//     return (
//         <Card title="Recent Transactions">
//             <div className="pt-2">
//                 {transactions.map((t, index) => (
//                     <div key={index} className="flex justify-between">
//                         <div>
//                             <div className="text-sm">
//                                 Received INR
//                             </div>
//                             <div className="text-slate-600 text-xs">
//                                 {t.time.toDateString()}
//                             </div>
//                         </div>
//                         <div className="flex flex-col justify-center">
//                             {/* <div className={`text-xs ${t.status === 'success' ? 'text-green-600' : t.status === 'processing' ? 'text-yellow-600' : 'text-red-600'}`}>
//                                 {t.status}
//                             </div> */}
//                             <div>
//                                 + Rs {t.amount / 100}
//                             </div>
//                         </div>
//                         <div className="flex flex-col justify-center">
//                         <div className={`rounded-full h-3 w-3 ${t.status === 'success' ? 'bg-green-500' : t.status === 'processing' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>

//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </Card>
//     );
// };
import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No recent transactions
                </div>
            </Card>
        );
    }

    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {transactions.map((t, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <div>
                            <div className="text-sm">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-end">
                            <div>
                                + Rs {t.amount / 100}
                            </div>
                            <div className="flex items-center">
                                <div className={`rounded-full h-3 w-3 mr-2 ${t.status === 'success' ? 'bg-green-500' : t.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                <div className="text-xs">
                                    {t.status}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
