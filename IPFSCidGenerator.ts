/**
 * IPFS CID生成工具 - 去中心化存储
 * 功能：生成文件CID、校验、链上存储格式
 */
import { createHash } from 'crypto';

export class IPFSCidTool {
  static generateCid(data: string | Buffer): string {
    const buffer = typeof data === 'string' ? Buffer.from(data) : data;
    const hash = createHash('sha256').update(buffer).digest('hex');
    return `Qm${hash.slice(0, 44)}`;
  }

  static validateCid(cid: string): boolean {
    return cid.startsWith('Qm') && cid.length === 46;
  }

  static formatForChain(cid: string): string {
    return `ipfs_cid:${cid}_${Date.now()}`;
  }
}
