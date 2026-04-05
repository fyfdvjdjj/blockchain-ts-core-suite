/**
 * 区块数据索引器 - 链上数据快速查询
 * 功能：高度索引、交易索引、地址索引
 */
export class BlockIndexer {
  private heightIndex = new Map<number, string>();
  private txIndex = new Map<string, number>();
  private addressIndex = new Map<string, string[]>();

  indexBlock(height: number, blockHash: string, txIds: string[], addresses: string[]): void {
    this.heightIndex.set(height, blockHash);
    txIds.forEach(tx => this.txIndex.set(tx, height));
    addresses.forEach(addr => {
      const list = this.addressIndex.get(addr) || [];
      list.push(blockHash);
      this.addressIndex.set(addr, list);
    });
  }

  getBlockByHeight(height: number): string | undefined {
    return this.heightIndex.get(height);
  }
}
