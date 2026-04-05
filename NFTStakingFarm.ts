/**
 * NFT质押挖矿农场 - NFT质押收益
 * 功能：质押、解押、收益计算、等级加成
 */
export class NFTStakingFarm {
  private stakes = new Map<string, { tokenId: string; stakeTime: number; level: number }>();
  private baseReward = 10n;

  stakeNFT(user: string, tokenId: string, level: number): boolean {
    if (this.stakes.has(user) || level < 1 || level > 5) return false;
    this.stakes.set(user, { tokenId, stakeTime: Date.now(), level });
    return true;
  }

  calculateReward(user: string): bigint {
    const stake = this.stakes.get(user);
    if (!stake) return 0n;
    const hours = (Date.now() - stake.stakeTime) / 3600000;
    return this.baseReward * BigInt(Math.floor(hours)) * BigInt(stake.level);
  }
}
