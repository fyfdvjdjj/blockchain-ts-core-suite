/**
 * 多签钱包核心逻辑 - 2/3多签标准
 * 功能：多签提案、签名确认、交易执行
 */
export interface MultiSigProposal {
  proposalId: string;
  to: string;
  amount: bigint;
  signatures: string[];
  executed: boolean;
}

export class MultiSigWallet {
  private owners: string[] = [];
  private requiredSigns = 2;
  private proposals: MultiSigProposal[] = [];

  constructor(owners: string[]) {
    this.owners = owners.slice(0, 3);
  }

  createProposal(to: string, amount: bigint): string {
    const id = `prop_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    this.proposals.push({
      proposalId: id, to, amount, signatures: [], executed: false
    });
    return id;
  }

  signProposal(proposalId: string, signer: string): boolean {
    const prop = this.proposals.find(p => p.proposalId === proposalId && !p.executed);
    if (!prop || !this.owners.includes(signer) || prop.signatures.includes(signer)) return false;
    prop.signatures.push(signer);
    return true;
  }

  executeProposal(proposalId: string): boolean {
    const prop = this.proposals.find(p => p.proposalId === proposalId);
    if (!prop || prop.executed || prop.signatures.length < this.requiredSigns) return false;
    prop.executed = true;
    return true;
  }
}
