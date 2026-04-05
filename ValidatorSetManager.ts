/**
 * 验证者集合管理 - 动态节点变更
 * 功能：节点加入/退出、活跃集合维护
 */
export class ValidatorSet {
  private activeSet = new Set<string>();
  private pendingSet = new Map<string, bigint>();

  joinPending(address: string, stake: bigint): boolean {
    if (stake < 10000n || this.pendingSet.has(address)) return false;
    this.pendingSet.set(address, stake);
    return true;
  }

  activateValidators(): number {
    let count = 0;
    this.pendingSet.forEach((stake, addr) => {
      this.activeSet.add(addr);
      count++;
    });
    this.pendingSet.clear();
    return count;
  }

  isActive(address: string): boolean {
    return this.activeSet.has(address);
  }
}
