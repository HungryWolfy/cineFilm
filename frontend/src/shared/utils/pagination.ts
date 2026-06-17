export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const siblings = 1; // Сколько цифр показывать по бокам от текущей страницы
  const totalPageNumbers = siblings * 2 + 5; // 7

  // Если страниц меньше 7, возвращаем реальное количество страниц, а не жесткую семерку
  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  // Math.min, чтобы не вылетать за правый край
  const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 2;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblings;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblings;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, '...', ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, '...', ...middleRange, '...', totalPages];
  }

  return [];
};