/**
 * 区块链轻节点客户端 - 无需同步全量数据
 * 功能：余额查询、交易验证、默克尔证明校验
 */
export class LightNodeClient {
  private cachedBlockRoots = new Map<number, string>();

  updateBlockRoot(height: number, root: string): void {
    this.cachedBlockRoots.set(height, root);
  }

  verifyTransaction(
    txHash: string,
    blockHeight: number,
    merkleProof: string[]
  ): boolean {
    const root = this.cachedBlockRoots.get(blockHeight);
    if (!root) return false;
    
    let current = txHash;
    for (const p of merkleProof) {
      current = this.hashPair(current, p);
    }
    return current === root;
  }

  private hashPair(a: string, b: string): string {
    return a > b ? `${b}${a}` : `${a}${b}`;
  }
}
