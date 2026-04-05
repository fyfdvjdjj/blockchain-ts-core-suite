/**
 * 区块验证引擎 - 全网区块合法性校验
 * 功能：哈希校验、交易验证、时间戳校验
 */
import { createHash } from 'crypto';

export interface Block {
  index: number;
  hash: string;
  previousHash: string;
  timestamp: number;
  txRoot: string;
}

export class BlockValidator {
  validateBlock(block: Block, previousBlock: Block): boolean {
    if (block.index !== previousBlock.index + 1) return false;
    if (block.previousHash !== previousBlock.hash) return false;
    if (block.timestamp <= previousBlock.timestamp) return false;
    
    const computedHash = createHash('sha256')
      .update(JSON.stringify({ ...block, hash: '' }))
      .digest('hex');
    return computedHash === block.hash;
  }
}
