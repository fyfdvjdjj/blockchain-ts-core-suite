/**
 * ERC721 NFT元数据生成器 - 链上元数据标准
 * 功能：生成合规NFT元数据、唯一ID、链上存储格式
 */
export interface NFTMetadata {
  tokenId: string;
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait: string; value: string }>;
  chainData: string;
}

export class NFTMetadataTool {
  static generateTokenId(chainId: number, index: number): string {
    return `${chainId}_${index}_${Date.now().toString(16)}`;
  }

  static createMetadata(
    tokenId: string,
    name: string,
    imageCid: string
  ): NFTMetadata {
    return {
      tokenId,
      name,
      description: `On-Chain NFT #${tokenId.slice(-6)}`,
      image: `ipfs://${imageCid}`,
      attributes: [
        { trait: 'chain', value: 'custom-pos' },
        { trait: 'rarity', value: 'legendary' }
      ],
      chainData: `metadata_${tokenId}_${Math.random().toString(36).slice(2)}`
    };
  }
}
