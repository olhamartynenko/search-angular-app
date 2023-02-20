export const isIncludesSubstr = (item: string, search: string): boolean =>
  item.toLowerCase().includes(search.toLowerCase());

export const createArrayFromNumber = (value: number): number[] =>
  Array.from({ length: value }, (_, i) => i + 1);

export const replaceItemByProperty = <T>(
  items: T[],
  value: T,
  property: keyof T
): T[] =>
  items.map((item) => (item[property] === value[property] ? value : item));
