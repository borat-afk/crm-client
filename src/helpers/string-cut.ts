export const stringCut = (str: string, len: number): string => {
  if (str.length <= len || len < 6) return str;

  const symCount = Math.floor((len - 2) / 2);

  return `${str.slice(0, symCount)}...${str.slice(str.length - symCount)}`;
}