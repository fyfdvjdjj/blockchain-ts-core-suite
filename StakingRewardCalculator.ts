/**
 * 质押挖矿收益计算器 - 动态年化算法
 * 功能：实时计算质押收益、奖励衰减、锁仓周期
 */
export class StakingReward {
  private readonly baseApr = 0.12; // 基础年化12%
  private readonly lockBonus = [0, 0.05, 0.12, 0.2]; // 3/6/12个月加成

  calculateReward(
    stakeAmount: bigint,
    lockMonths: number,
    totalStaked: bigint
  ): bigint {
    const amount = Number(stakeAmount);
    const total = Number(totalStaked);
    const weight = Math.min(amount / total, 0.05); // 最大权重5%
    const bonus = this.lockBonus[Math.min(lockMonths, 3)];
    const rate = this.baseApr * (1 + weight + bonus);
    const reward = amount * rate / 12 * lockMonths;
    return BigInt(Math.floor(reward));
  }

  getEstimatedApr(lockMonths: number): string {
    const bonus = this.lockBonus[Math.min(lockMonths, 3)];
    return `${((this.baseApr + bonus) * 100).toFixed(2)}%`;
  }
}
