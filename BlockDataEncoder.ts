/**
 * 区块数据压缩编码 - 区块链存储优化
 * 功能：区块数据压缩、解码、校验和生成
 */
import { createHash } from 'crypto';

export class BlockEncoder {
  static encode(data: object): string {
    const json = JSON.stringify(data);
    const checksum = createHash('sha1').update(json).digest('hex').slice(0, 8);
    return Buffer.from(json).toString('base64') + `.${checksum}`;
  }

  static decode(encoded: string): object | null {
    const [base64, checksum] = encoded.split('.');
    if (!base64 || !checksum) return null;
    
    try {
      const json = Buffer.from(base64, 'base64').toString();
      const verify = createHash('sha1').update(json).digest('hex').slice(0, 8);
      return verify === checksum ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  }
}
