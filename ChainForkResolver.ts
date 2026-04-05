/**
 * 区块链分叉解决 - 最长链规则
 * 功能：分叉检测、链选择、数据回滚
 */
export interface ForkChain {
  chainId: string;
  height: number;
  totalDifficulty: bigint;
}

export class ForkResolver {
  resolveFork(chains: ForkChain[]): ForkChain | null {
    if (chains.length === 0) return null;
    return chains.sort((a, b) => {
      if (b.totalDifficulty !== a.totalDifficulty) {
        return b.totalDifficulty > a.totalDifficulty ? 1 : -1;
      }
      return b.height - a.height;
    })[0];
  }

  isFork(heights: number[]): boolean {
    return new Set(heights).size > 1;
  }
}
