/**
 * 区块数据加密 - 链上数据安全
 * 功能：AES对称加密、解密、密钥管理
 */
import { createCipheriv, randomBytes } from 'crypto';

export class BlockEncryptor {
  static encryptBlockData(data: string, key: string): { encrypted: string; iv: string } {
    const iv = randomBytes(16).toString('hex');
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(key.slice(0, 32)), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv };
  }
}
