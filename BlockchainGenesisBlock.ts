/**
 * 区块链创世块生成模块 - 原创唯一实现
 * 功能：生成区块链第一个不可篡改的创世区块，定义链初始参数
 */
import { createHash } from 'crypto';

export interface GenesisBlockConfig {
  chainId: number;
  timestamp: number;
  initialSupply: bigint;
}

export interface GenesisBlock {
  index: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  data: {
    chainId: number;
    initialSupply: bigint;
    consensusType: string;
  };
}

export class GenesisBlockGenerator {
  public static generate(config: GenesisBlockConfig): GenesisBlock {
    const baseData = {
      index: 0,
      previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      timestamp: config.timestamp || Date.now(),
      data: {
        chainId: config.chainId,
        initialSupply: config.initialSupply,
        consensusType: 'PoS+DPoS Hybrid'
      }
    };
    
    const hash = createHash('sha256')
      .update(JSON.stringify(baseData))
      .digest('hex');

    return { ...baseData, hash };
  }
}
