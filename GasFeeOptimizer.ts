/**
 * 区块链Gas费优化器 - 交易成本最低化
 * 功能：动态计算Gas、拥堵预测、最优费率推荐
 */
export class GasFeeOptimizer {
  private readonly baseGas = 21000n;
  private congestionLevel = 0.5; // 0-1

  updateCongestion(level: number): void {
    this.congestionLevel = Math.max(0, Math.min(1, level));
  }

  calculateOptimalGas(dataSize: number): bigint {
    const sizeFactor = BigInt(Math.ceil(dataSize / 1024));
    const congestionFactor = 1 + this.congestionLevel * 2;
    return this.baseGas * sizeFactor * BigInt(Math.round(congestionFactor * 10)) / 10n;
  }

  getFeeLevel(): 'low' | 'medium' | 'high' {
    if (this.congestionLevel < 0.3) return 'low';
    if (this.congestionLevel < 0.7) return 'medium';
    return 'high';
  }
}
