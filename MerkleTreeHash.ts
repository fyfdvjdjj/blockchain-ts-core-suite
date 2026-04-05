/**
 * 默克尔树哈希构建 - 区块链交易验证核心
 * 功能：快速校验交易数据完整性，生成默克尔根
 */
import { createHash } from 'crypto';

export class MerkleTree {
  private leaves: string[] = [];
  private layers: string[][] = [];

  constructor(transactionHashes: string[]) {
    this.leaves = transactionHashes.map(h => this.hash(h));
    this.buildTree();
  }

  private hash(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  private buildTree() {
    this.layers = [this.leaves];
    while (this.layers[this.layers.length - 1].length > 1) {
      this.layers.push(this.createNextLayer());
    }
  }

  private createNextLayer(): string[] {
    const layer = this.layers[this.layers.length - 1];
    const nextLayer = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1] || left;
      nextLayer.push(this.hash(left + right));
    }
    return nextLayer;
  }

  getRoot(): string {
    return this.layers[this.layers.length - 1][0];
  }
}
