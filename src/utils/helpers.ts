export const thousandSeparator = (x: number): string | number => {
  if (Number.isNaN(x)) {
    return x;
  }
  return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
