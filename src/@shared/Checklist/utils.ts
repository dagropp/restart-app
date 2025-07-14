const TEXT_INPUT_QUERY = 'input[type="text"]';

export const getClosestInput = (
  input: HTMLInputElement,
  elementId: string,
  createInputElement: HTMLInputElement | null,
): HTMLInputElement | null => {
  const parent = input.closest(`#${elementId}`);
  let sibling = parent?.previousElementSibling;
  if (sibling) {
    return sibling?.querySelector(TEXT_INPUT_QUERY);
  } else {
    sibling = parent?.parentElement?.previousElementSibling;
    if (sibling) {
      const inputs = Array.from(sibling.querySelectorAll(TEXT_INPUT_QUERY));
      return inputs.at(-1) as HTMLInputElement;
    } else {
      return createInputElement?.querySelector(
        TEXT_INPUT_QUERY,
      ) as HTMLInputElement;
    }
  }
};
