/**
 * Ed25519椭圆曲线签名工具 - 区块链专用
 * 功能：账户签名、验签、密钥对生成，抗量子攻击
 */
import { sign, verify, generateKeyPair } from 'crypto';

export class Ed25519Signer {
  static createKeyPair() {
    const { publicKey, privateKey } = generateKeyPair('ed25519');
    return {
      publicKey: publicKey.export({ type: 'spki', format: 'hex' }),
      privateKey: privateKey.export({ type: 'pkcs8', format: 'hex' })
    };
  }

  static signMessage(privateKeyHex: string, message: string): string {
    const privateKey = Buffer.from(privateKeyHex, 'hex');
    const msgBuffer = Buffer.from(message);
    return sign(null, msgBuffer, privateKey).toString('hex');
  }

  static verifySignature(publicKeyHex: string, message: string, signature: string): boolean {
    const publicKey = Buffer.from(publicKeyHex, 'hex');
    const msgBuffer = Buffer.from(message);
    const sigBuffer = Buffer.from(signature, 'hex');
    return verify(null, msgBuffer, publicKey, sigBuffer);
  }
}
