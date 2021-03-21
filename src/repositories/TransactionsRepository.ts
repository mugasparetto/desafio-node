import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acc: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            acc.income += transaction.value;
            break;
          case 'outcome':
            acc.outcome += transaction.value;
          default:
            break;
        }
        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return { income, outcome, total: income - outcome };
  }

  public create({ type, value, title }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
