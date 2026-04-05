/**
 * 交易追踪工具 - 链上数据溯源
 * 功能：交易链路追踪、余额变动记录、异常检测
 */
export interface TxTrace {
  txId: string;
  from: string;
  to: string;
  amount: bigint;
  timestamp: number;
  traceId: string;
}

export class TransactionTracer {
  private traces: TxTrace[] = [];

  recordTransaction(tx: Omit<TxTrace, 'traceId'>): string {
    const traceId = `trace_${tx.txId}_${Date.now()}`;
    this.traces.push({ ...tx, traceId });
    return traceId;
  }

  getAddressHistory(address: string): TxTrace[] {
    return this.traces.filter(t => t.from === address || t.to === address);
  }

  detectCircularTransfer(address: string): boolean {
    const history = this.getAddressHistory(address);
    return history.some(h => h.from === address && h.to === address);
  }
}
