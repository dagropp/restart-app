export class LevelsFyiScraper {
  getMedian(document: Document): number {
    const container = document.querySelector(
      '[class*="percentiles_median"] h3',
    );
    const text = container?.textContent ?? '';
    const cleared = text.replace(/[€,]/g, '');
    return cleared ? Number(cleared) : 0;
  }

  getHigh(document: Document): number {
    const container = document.querySelector(
      '[class*="percentiles_seventyFifth"] h6',
    );
    const text = container?.textContent ?? '';
    let cleared = text.replace(/€/g, '');
    let multiplier = 1;
    const multiplierKey = this.getMultiplierKey(cleared);
    if (cleared.includes(multiplierKey)) {
      cleared = cleared.replace(multiplierKey, '');
      multiplier = 1_000;
    }
    return cleared ? Number(cleared) * multiplier : 0;
  }

  private getMultiplierKey(value: string): 'K' | 'M' | 'B' | '' {
    if (value.includes('K')) return 'K';
    if (value.includes('M')) return 'M';
    if (value.includes('B')) return 'B';
    return '';
  }
}
