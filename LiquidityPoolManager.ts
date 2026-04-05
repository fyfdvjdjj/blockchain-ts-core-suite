/**
 * 去中心化交易所流动性池 - AMM模型
 * 功能：添加流动性、移除、价格计算
 */
export class LiquidityPool {
  private reserveA = 0n;
  private reserveB = 0n;

  addLiquidity(a: bigint, b: bigint): boolean {
    if (a <= 0n || b <= 0n) return false;
    this.reserveA += a;
    this.reserveB += b;
    return true;
  }

  calculateSwapAtoB(amountA: bigint): bigint {
    const k = this.reserveA * this.reserveB;
    const newA = this.reserveA + amountA;
    const newB = k / newA;
    return this.reserveB - newB;
  }

  getReserves(): { a: bigint; b: bigint } {
    return { a: this.reserveA, b: this.reserveB };
  }
}
