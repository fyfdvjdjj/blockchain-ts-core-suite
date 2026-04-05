/**
 * 区块奖励减半机制 - 通缩模型核心
 * 功能：按高度计算奖励、减半周期、总发行量
 */
export class BlockRewardHalving {
  private readonly initialReward = 50n;
  private readonly halvingInterval = 210000;
  private readonly maxSupply = 21000000n;

  getBlockReward(height: number): bigint {
    const halvings = Math.floor(height / this.halvingInterval);
    let reward = this.initialReward;
    for (let i = 0; i < halvings; i++) reward /= 2n;
    return reward;
  }

  getMinedSupply(height: number): bigint {
    let supply = 0n;
    let currentHeight = 0;
    while (currentHeight < height) {
      const reward = this.getBlockReward(currentHeight);
      supply += reward;
      currentHeight++;
      if (supply >= this.maxSupply) break;
    }
    return supply;
  }
}
