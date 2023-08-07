export const pageSkipCalculate = (perPage: number, pageNumber: number) => {
  return perPage * (pageNumber - 1)
}