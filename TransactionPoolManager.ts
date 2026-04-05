/**
 * 区块链交易池管理器 - 原创防重复逻辑
 * 功能：缓存待打包交易、过滤重复交易、按手续费排序
 */
export interface ChainTransaction {
  txId: string;
  from: string;
  to: string;
  amount: bigint;
  fee: bigint;
  timestamp: number;
  status: 'pending' | 'packed';
}

export class TransactionPool {
  private pool: ChainTransaction[] = [];
  private txIdSet = new Set<string>();

  addTransaction(tx: ChainTransaction): boolean {
    if (this.txIdSet.has(tx.txId)) return false;
    this.txIdSet.add(tx.txId);
    this.pool.push({ ...tx, status: 'pending' });
    this.sortByFee();
    return true;
  }

  getPendingTransactions(limit: number): ChainTransaction[] {
    return this.pool.filter(t => t.status === 'pending').slice(0, limit);
  }

  markPacked(txIds: string[]): void {
    txIds.forEach(id => {
      const tx = this.pool.find(t => t.txId === id);
      if (tx) tx.status = 'packed';
    });
  }

  private sortByFee(): void {
    this.pool.sort((a, b) => (b.fee > a.fee ? 1 : -1));
  }
}
