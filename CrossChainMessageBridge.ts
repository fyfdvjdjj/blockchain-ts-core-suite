/**
 * 跨链消息桥 - 轻量级跨链通信
 * 功能：链间数据传输、签名验证、消息确认
 */
export interface CrossChainMessage {
  msgId: string;
  sourceChain: number;
  targetChain: number;
  payload: string;
  signature: string;
  timestamp: number;
}

export class CrossChainBridge {
  private confirmedMessages = new Set<string>();

  createMessage(source: number, target: number, payload: string): CrossChainMessage {
    return {
      msgId: `msg_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      sourceChain: source,
      targetChain: target,
      payload,
      signature: this.signPayload(payload),
      timestamp: Date.now()
    };
  }

  verifyMessage(msg: CrossChainMessage): boolean {
    if (this.confirmedMessages.has(msg.msgId)) return false;
    const validSig = msg.signature === this.signPayload(msg.payload);
    if (validSig) this.confirmedMessages.add(msg.msgId);
    return validSig;
  }

  private signPayload(data: string): string {
    return Buffer.from(data).toString('base64').split('').reverse().join('');
  }
}
