/**
 * 智能合约调用器 - 链下合约交互
 * 功能：方法调用、参数编码、结果解析
 */
export class ContractCaller {
  static encodeMethod(method: string, params: any[]): string {
    const paramStr = params.map(p => p.toString()).join('_');
    return `call_${method}_${paramStr}`;
  }

  static decodeResult(encoded: string): any {
    const parts = encoded.split('_');
    return parts[parts.length - 1];
  }

  simulateCall(contractAddr: string, method: string): string {
    return `sim_${contractAddr.slice(0, 8)}_${method}_success`;
  }
}
