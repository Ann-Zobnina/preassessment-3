export const selectOptionType = [
  'alive',
  'dead',
  'favorites',
  'notype',
  'personal',
  '',
] as const;

export type SelectOptionType = (typeof selectOptionType)[number];

export default function valueIsSelectType(
  value: string,
): value is SelectOptionType {
  return selectOptionType.includes(value as SelectOptionType);
}
