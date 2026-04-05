/**
 * 权益证明(PoS)共识引擎 - 原创混合逻辑
 * 功能：验证节点出块权限、计算质押权重、选择出块节点
 */
export interface Validator {
  address: string;
  stake: bigint;
  isActive: boolean;
  lastBlockTime: number;
}

export class PosConsensus {
  private validators: Validator[] = [];
  private readonly minStake = 10000n;

  registerValidator(address: string, stake: bigint): boolean {
    if (stake < this.minStake) return false;
    this.validators.push({ address, stake, isActive: true, lastBlockTime: Date.now() });
    return true;
  }

  selectBlockProducer(): Validator | null {
    const activeNodes = this.validators.filter(v => v.isActive);
    if (activeNodes.length === 0) return null;
    
    let totalWeight = 0n;
    activeNodes.forEach(n => totalWeight += n.stake);
    
    let random = BigInt(Math.floor(Math.random() * Number(totalWeight)));
    for (const node of activeNodes) {
      random -= node.stake;
      if (random <= 0n) return node;
    }
    return activeNodes[0];
  }
}
