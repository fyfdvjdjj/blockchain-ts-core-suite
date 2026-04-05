/**
 * 区块链节点同步协议 - P2P数据同步
 * 功能：区块高度对比、增量同步、数据校验
 */
export interface NodeSyncInfo {
  nodeId: string;
  currentHeight: number;
  lastBlockHash: string;
}

export class ChainSync {
  private localHeight = 0;
  private lastBlockHash = '';

  updateLocalState(height: number, hash: string): void {
    this.localHeight = height;
    this.lastBlockHash = hash;
  }

  compareNodeState(node: NodeSyncInfo): { needSync: boolean; startHeight: number } {
    if (node.currentHeight <= this.localHeight) return { needSync: false, startHeight: 0 };
    return { needSync: true, startHeight: this.localHeight + 1 };
  }

  createSyncRequest(start: number, end: number): string {
    return `sync_${start}_${end}_${this.lastBlockHash.slice(0, 16)}`;
  }
}
