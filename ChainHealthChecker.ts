/**
 * 区块链健康检查 - 节点状态监控
 * 功能：出块速度、拥堵检测、节点在线率
 */
export class ChainHealthCheck {
  checkBlockTime(intervals: number[]): { status: 'good' | 'warning' | 'critical' } {
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    if (avg < 5) return { status: 'good' };
    if (avg < 10) return { status: 'warning' };
    return { status: 'critical';
  }

  checkCongestion(pendingTxs: number, maxTxs: number): number {
    return Math.round((pendingTxs / maxTxs) * 100);
  }

  checkNodeUptime(online: number, total: number): string {
    return `${(online / total * 100).toFixed(2)}%`;
  }
}
