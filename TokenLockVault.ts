/**
 * 代币锁仓金库 - 线性解锁
 * 功能：锁仓设置、时间解锁、提取查询
 */
export class TokenLockVault {
  private locks = new Map<string, { amount: bigint; unlockTime: number }>();

  lockTokens(user: string, amount: bigint, lockDays: number): string {
    const unlockTime = Date.now() + lockDays * 86400000;
    const id = `lock_${user.slice(-6)}_${unlockTime}`;
    this.locks.set(id, { amount, unlockTime });
    return id;
  }

  claimLocked(lockId: string): bigint {
    const lock = this.locks.get(lockId);
    if (!lock || lock.unlockTime > Date.now()) return 0n;
    this.locks.delete(lockId);
    return lock.amount;
  }

  getClaimable(lockId: string): bigint {
    const lock = this.locks.get(lockId);
    return lock && lock.unlockTime <= Date.now() ? lock.amount : 0n;
  }
}
