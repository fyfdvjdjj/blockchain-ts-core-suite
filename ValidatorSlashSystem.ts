/**
 * 验证者惩罚系统 - 作恶节点处罚
 * 功能：离线检测、双花惩罚、质押扣除
 */
export class ValidatorSlash {
  private readonly slashRate = 0.1; // 惩罚10%

  slashOffline(validatorStake: bigint): bigint {
    const penalty = validatorStake * BigInt(Math.round(this.slashRate * 10)) / 10n;
    return penalty;
  }

  slashDoubleSign(validatorStake: bigint): bigint {
    return validatorStake / 2n; // 双签惩罚50%
  }

  isSlashed(penalty: bigint, stake: bigint): boolean {
    return penalty > 0n && penalty <= stake;
  }
}
