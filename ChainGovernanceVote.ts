/**
 * 链上治理投票系统 - 参数升级投票
 * 功能：提案创建、投票、结果统计、自动执行
 */
export interface GovernanceProposal {
  id: string;
  title: string;
  optionA: string;
  optionB: string;
  votesA: bigint;
  votesB: bigint;
  endTime: number;
  executed: boolean;
}

export class ChainGovernance {
  private proposals: GovernanceProposal[] = [];

  createProposal(title: string, optA: string, optB: string, durationHours: number): string {
    const id = `gov_${Date.now()}`;
    this.proposals.push({
      id, title, optionA: optA, optionB: optB,
      votesA: 0n, votesB: 0n,
      endTime: Date.now() + durationHours * 3600000,
      executed: false
    });
    return id;
  }

  vote(proposalId: string, choice: 'A' | 'B', stake: bigint): boolean {
    const prop = this.proposals.find(p => p.id === proposalId && p.endTime > Date.now());
    if (!prop) return false;
    choice === 'A' ? (prop.votesA += stake) : (prop.votesB += stake);
    return true;
  }
}
