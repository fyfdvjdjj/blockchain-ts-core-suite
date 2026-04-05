/**
 * P2P网络节点管理 - 区块链去中心化通信
 * 功能：节点发现、连接管理、消息广播
 */
export interface PeerNode {
  nodeId: string;
  address: string;
  latency: number;
  isConnected: boolean;
}

export class P2PPeerManager {
  private peers: PeerNode[] = [];

  addPeer(address: string): string {
    const nodeId = `node_${address}_${Date.now()}`;
    this.peers.push({
      nodeId, address, latency: Math.random() * 500, isConnected: true
    });
    return nodeId;
  }

  broadcastMessage(message: string): string[] {
    const active = this.peers.filter(p => p.isConnected);
    return active.map(p => `sent_to_${p.nodeId}_${message.slice(0, 8)}`);
  }

  getBestPeer(): PeerNode | null {
    return this.peers.filter(p => p.isConnected).sort((a, b) => a.latency - b.latency)[0] || null;
  }
}
