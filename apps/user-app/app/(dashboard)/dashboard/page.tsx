// import { getServerSession } from "next-auth";
// import { BalanceCard } from "../../../components/BalanceCard"
// import { authOptions } from "../../lib/auth";
// import prisma from "@repo/db/client";

// async function getBalance() {
//     const session = await getServerSession(authOptions);
//     const balance = await prisma.balance.findFirst({
//         where: {
//             userId: Number(session?.user?.id)
//         }
//     });
//     return {
//         amount: balance?.amount || 0,
//         locked: balance?.locked || 0
//     }
// }
// export default async function() {
//     const balance = await getBalance();
//     return <div>
//         <div className="font-bold text-5xl py-10 text-purple-900 italic">
//         Hello Alice,
//         </div>
//         <div>
//             Your balance is Amount= {balance.amount/100}
//         </div>
//         <div>
//         Your locked balance is Amount= {balance.locked/100}
//         </div>
//         <div>
//         Your Total balance is = {balance.locked/100 + balance.amount/100}
//         </div>
//     </div>
// }
import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getBalance(userId: number) {
    const balance = await prisma.balance.findFirst({
        where: {
            userId: userId
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    const balance = await getBalance(userId);
    const userName = capitalizeFirstLetter(session?.user?.name || "Guest");

    return (
        <div>
            <div className="font-bold text-5xl py-10 text-purple-900 italic">
                Hello {userName},
            </div>
            <div>
                Your balance is Amount= {balance.amount / 100}
            </div>
            <div>
                Your locked balance is Amount= {balance.locked / 100}
            </div>
            <div>
                Your Total balance is = {(balance.locked + balance.amount) / 100}
            </div>
        </div>
    );
}

