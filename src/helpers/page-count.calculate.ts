export const pageCountCalculate = (totalItems: number, itemsPerPage: number): number => {
  console.log((totalItems / itemsPerPage).toFixed(0))
  return +(totalItems / itemsPerPage).toFixed(0) + 1;
}