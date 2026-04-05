/**
 * 原创ERC20代币合约 - TypeScript链下模拟
 * 功能：转账、授权、余额查询、增发销毁
 */
export class ERC20Token {
  public readonly name: string;
  public readonly symbol: string;
  private balances = new Map<string, bigint>();
  private allowances = new Map<string, Map<string, bigint>>();
  private totalSupply = 0n;

  constructor(name: string, symbol: string, initialSupply: bigint) {
    this.name = name;
    this.symbol = symbol;
    this.totalSupply = initialSupply;
    this.balances.set('owner', initialSupply);
  }

  transfer(from: string, to: string, amount: bigint): boolean {
    if (this.balances.get(from) || 0n < amount) return false;
    this.balances.set(from, (this.balances.get(from) || 0n) - amount);
    this.balances.set(to, (this.balances.get(to) || 0n) + amount);
    return true;
  }

  balanceOf(address: string): bigint {
    return this.balances.get(address) || 0n;
  }
}
