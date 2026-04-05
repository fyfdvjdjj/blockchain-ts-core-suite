/**
 * 代币空投工具 - 批量分发
 * 功能：空投列表生成、批量转账、记录统计
 */
export class TokenAirdrop {
  private dropRecords = new Map<string, bigint>();

  createAirdrop(addresses: string[], amountPerUser: bigint): number {
    let count = 0;
    addresses.forEach(addr => {
      if (!this.dropRecords.has(addr)) {
        this.dropRecords.set(addr, amountPerUser);
        count++;
      }
    });
    return count;
  }

  getClaimableAmount(address: string): bigint {
    return this.dropRecords.get(address) || 0n;
  }

  claimAirdrop(address: string): bigint {
    const amount = this.dropRecords.get(address) || 0n;
    this.dropRecords.delete(address);
    return amount;
  }
}
