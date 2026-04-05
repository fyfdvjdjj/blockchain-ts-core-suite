/**
 * 隐私交易编码 - 链上数据脱敏
 * 功能：交易金额加密、地址隐藏、数据脱敏
 */
export class PrivacyTxEncoder {
  static encodeAmount(amount: bigint, secret: string): string {
    const num = Number(amount);
    const key = secret.length * 13;
    return (num * key).toString(16).padStart(16, '0');
  }

  static decodeAmount(encoded: string, secret: string): bigint {
    const key = secret.length * 13;
    const num = parseInt(encoded, 16) / key;
    return BigInt(Math.floor(num));
  }

  static maskAddress(address: string): string {
    return `${address.slice(0, 4)}****${address.slice(-4)}`;
  }
}
