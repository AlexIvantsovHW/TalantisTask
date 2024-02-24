type Item = {
  brand: string | null;
  id: string;
  price: number;
  product: string;
};

export function removeDuplicates(arr: Item[]): Item[] {
  const uniqueIds = new Set();
  return arr?.filter((item) => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      return true;
    }
    return false;
  });
}
