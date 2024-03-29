import { Injectable, computed, signal } from '@angular/core';
import {
  ITransaction,
  TTransactionRegisterFormData,
} from '../interfaces/transaction.interface';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  readonly transactionList = signal<ITransaction[]>([]);
  readonly total = computed(() =>
    this.transactionList().reduce((accValue, transaction) => {
      if (transaction.type === 'entrada') {
        return accValue + Number(transaction.value);
      } else {
        return accValue - Number(transaction.value);
      }
    }, 0)
  );

  getTransactionList() {
    return this.transactionList();
  }

  getTotal() {
    return this.total();
  }

  addTransaction(formData: TTransactionRegisterFormData) {
    const newTransaction = { ...formData, id: crypto.randomUUID() };

    this.transactionList.update((transactionList) => [
      ...transactionList,
      newTransaction,
    ]);
  }

  removeTransaction(removingId: string) {
    this.transactionList.update((transactionList) =>
      transactionList.filter((transaction) => transaction.id !== removingId)
    );
  }
}
