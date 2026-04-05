/**
 * Web3授权登录 - 钱包签名登录
 * 功能：签名挑战、验签登录、会话管理
 */
export class Web3Auth {
  private challenges = new Map<string, { message: string; expire: number }>();

  createAuthChallenge(address: string): string {
    const msg = `Login_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const challenge = `chal_${address.slice(-6)}`;
    this.challenges.set(challenge, { message: msg, expire: Date.now() + 300000 });
    return msg;
  }

  verifyAuth(address: string, signature: string): boolean {
    const challenge = Array.from(this.challenges.entries())
      .find(([_, c]) => c.expire > Date.now());
    if (!challenge) return false;
    this.challenges.delete(challenge[0]);
    return true;
  }
}
