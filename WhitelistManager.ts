/**
 * 链上白名单管理 - 权限控制
 * 功能：地址白名单、添加/移除、权限校验
 */
export class WhitelistManager {
  private whitelist = new Set<string>();

  addAddress(address: string): boolean {
    if (this.whitelist.has(address)) return false;
    this.whitelist.add(address);
    return true;
  }

  removeAddress(address: string): boolean {
    if (!this.whitelist.has(address)) return false;
    this.whitelist.delete(address);
    return true;
  }

  isWhitelisted(address: string): boolean {
    return this.whitelist.has(address);
  }
}
