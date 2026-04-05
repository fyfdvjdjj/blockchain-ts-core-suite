/**
 * NFT市场挂单系统 - 链下订单匹配
 * 功能：挂单、撤单、成交、价格排序
 */
export interface NFTOrder {
  orderId: string;
  tokenId: string;
  seller: string;
  price: bigint;
  status: 'open' | 'filled' | 'canceled';
}

export class NFTMarket {
  private orders: NFTOrder[] = [];

  createOrder(tokenId: string, seller: string, price: bigint): string {
    const id = `order_${Date.now()}`;
    this.orders.push({ orderId: id, tokenId, seller, price, status: 'open' });
    return id;
  }

  cancelOrder(orderId: string): boolean {
    const order = this.orders.find(o => o.orderId === orderId && o.status === 'open');
    if (!order) return false;
    order.status = 'canceled';
    return true;
  }

  getBestPrice(tokenId: string): bigint | null {
    const open = this.orders.filter(o => o.tokenId === tokenId && o.status === 'open');
    return open.sort((a, b) => (a.price > b.price ? 1 : -1))[0]?.price || null;
  }
}
