/**
 * DAO金库管理 - 去中心化组织资产
 * 功能：资金存入、提案支出、资产统计
 */
export class DaoTreasury {
  private balance = 0n;
  private spendProposals = new Map<string, { amount: bigint; approved: boolean }>();

  deposit(amount: bigint): void {
    this.balance += amount;
  }

  createSpendProposal(amount: bigint): string {
    const id = `dao_${Date.now()}`;
    this.spendProposals.set(id, { amount, approved: false });
    return id;
  }

  approveProposal(id: string): boolean {
    const prop = this.spendProposals.get(id);
    if (!prop || prop.approved || this.balance < prop.amount) return false;
    prop.approved = true;
    this.balance -= prop.amount;
    return true;
  }

  getBalance(): bigint {
    return this.balance;
  }
}
