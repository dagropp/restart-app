import { type QualityIndexResponse } from '@services/api';

export type QualityKey = keyof QualityIndexResponse;

const urlMap: Record<QualityKey, string> = {
  quality: 'quality-of-life',
  crime: 'crime',
  pollution: 'pollution',
  traffic: 'traffic',
  health: 'health-care',
};

const getLinkUrl = (key: QualityKey, costOfLivingKey?: string) => {
  const urlKey = urlMap[key];
  return costOfLivingKey
    ? `https://www.numbeo.com/${urlKey}/in/${costOfLivingKey}`
    : `https://www.numbeo.com/${urlKey}/rankings.jsp`;
};

const getRankDisplay = (
  key: QualityKey,
  rank: number,
  minRank: number,
): number => {
  const isBackwards = ['crime', 'pollution', 'traffic'].includes(key);
  return isBackwards ? minRank - rank : rank + 1;
};

export const qualityUtils = { getLinkUrl, getRankDisplay };
