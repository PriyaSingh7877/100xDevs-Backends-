import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SendCard } from "../../../components/SendCard";
import { P2PTransactions } from "../../../components/P2PTransactions";

async function getP2PTransactions(userId: number) {
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUsed: userId },
                { toUserId: userId }
            ]
        },
        include: {
            fromUser: {
                select: { number: true, name: true }
            },
            toUser: {
                select: { number: true, name: true }
            }
        },
        orderBy: {
            timestamp: 'desc'
        }
    });
    return txns;
}

export default async function() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    const transactions = await getP2PTransactions(userId);

    return <div className="w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <div>
                <P2PTransactions transactions={transactions} userId={userId} />
            </div>
        </div>
    </div>
}