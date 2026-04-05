/**
 * 委托权益证明(DPoS)投票系统 - 链上治理
 * 功能：投票、计票、节点排名、奖励分配
 */
export interface DposCandidate {
  address: string;
  votes: bigint;
  isActive: boolean;
}

export class DposVoting {
  private candidates: DposCandidate[] = [];
  private userVotes = new Map<string, string>();

  registerCandidate(address: string): boolean {
    if (this.candidates.some(c => c.address === address)) return false;
    this.candidates.push({ address, votes: 0n, isActive: true });
    return true;
  }

  vote(userAddr: string, candidateAddr: string, amount: bigint): boolean {
    if (this.userVotes.has(userAddr)) return false;
    const candidate = this.candidates.find(c => c.address === candidateAddr && c.isActive);
    if (!candidate) return false;
    
    candidate.votes += amount;
    this.userVotes.set(userAddr, candidateAddr);
    return true;
  }

  getTopCandidates(limit: number): DposCandidate[] {
    return [...this.candidates].sort((a, b) => (b.votes > a.votes ? 1 : -1)).slice(0, limit);
  }
}
