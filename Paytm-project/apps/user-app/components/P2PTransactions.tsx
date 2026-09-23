import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transactions,
    userId
}: {
    transactions: {
        id: number,
        amount: number,
        timestamp: Date,
        fromUserId: number,
        toUserId: number,
        fromUser: { number: string, name: string | null },
        toUser: { number: string, name: string | null }
    }[],
    userId: number
}) => {
    if (!transactions.length) {
        return <Card title="P2P Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="P2P Transactions">
        <div className="pt-2">
            {transactions.map(t => {
                const isSent = t.fromUserId === userId;
                return <div className="flex justify-between" key={t.id}>
                    <div>
                        <div className="text-sm">
                            {isSent ? `Sent to ${t.toUser.name || t.toUser.number}` : `Received from ${t.fromUser.name || t.fromUser.number}`}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {new Date(t.timestamp).toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        {isSent ? "- " : "+ "}Rs {t.amount / 100}
                    </div>
                </div>
            })}
        </div>
    </Card>
}