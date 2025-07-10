export const interpolateTranslations = (
  template: string,
  params: Record<string, unknown>,
): string =>
  template.replace(/{{(.*?)}}/g, (_, key) => {
    key = key.trim();
    return key in params ? String(params[key]) : '';
  });
