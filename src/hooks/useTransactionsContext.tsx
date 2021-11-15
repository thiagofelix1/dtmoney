import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface TransactionProps {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string,
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>

interface TransactionsProviderProps {
    children: React.ReactNode;
}

interface TransactionsContextData {
    transactions: TransactionProps[],
    createTransaction: (transaction: TransactionInput) => Promise<void>,
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
            .catch(e => { console.log(e) });
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });

        const { transaction } = response.data;
        console.log(transaction);

        setTransactions([...transactions, transaction]);

    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}