export const pageSkipCalculate = (perPage: number, pageNumber: number): number => {
  return perPage * (pageNumber - 1)
}