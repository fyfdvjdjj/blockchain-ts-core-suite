/**
 * 链上数据分析报告 - 数据统计
 * 功能：交易量、活跃地址、增长率统计
 */
export class ChainAnalytics {
  generateDailyReport(
    txCount: number,
    activeAddresses: number,
    newBlocks: number
  ): object {
    return {
      date: new Date().toISOString().split('T')[0],
      totalTransactions: txCount,
      activeWalletCount: activeAddresses,
      newBlocksCreated: newBlocks,
      networkGrowthRate: ((activeAddresses / 10000) * 100).toFixed(2) + '%'
    };
  }

  getTxTypeRatio(contractTxs: number, normalTxs: number): string {
    const total = contractTxs + normalTxs;
    return total === 0 ? '0%' : `${(contractTxs / total * 100).toFixed(1)}%`;
  }
}
