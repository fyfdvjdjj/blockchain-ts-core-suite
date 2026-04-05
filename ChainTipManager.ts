/**
 * 区块链最新区块管理 - 链头维护
 * 功能：最新区块缓存、回滚、链头校验
 */
export class ChainTipManager {
  private currentTip: { height: number; hash: string } | null = null;

  updateTip(height: number, hash: string): void {
    if (!this.currentTip || height > this.currentTip.height) {
      this.currentTip = { height, hash };
    }
  }

  rollbackTip(targetHeight: number): boolean {
    if (!this.currentTip || this.currentTip.height < targetHeight) return false;
    this.currentTip = { height: targetHeight, hash: 'rollback_' + targetHeight };
    return true;
  }

  getTip(): { height: number; hash: string } | null {
    return this.currentTip;
  }
}
