export function normalize_item_list<T>(result: Common.PaginationResult<T>): Common.ItemList<T> {
  console.log(result);
  return {
    data: result.results,
    total: result.count,
    success: true,
  };
}
