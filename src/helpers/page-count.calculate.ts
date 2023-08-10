export const pageCountCalculate = (totalItems: number, itemsPerPage: number): number => {
  return Math.floor(totalItems / itemsPerPage) + 1;
}