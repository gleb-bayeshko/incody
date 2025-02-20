function createWordPluralizer(
  baseWord: string,
  endings: { one: string; few: string; many: string }
): (count: number) => string {
  return function (count: number): string {
    let endingKey: "one" | "few" | "many";
    if (count % 10 === 1 && count % 100 !== 11) {
      endingKey = "one";
    } else if (
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      (count % 100 < 10 || count % 100 >= 20)
    ) {
      endingKey = "few";
    } else {
      endingKey = "many";
    }
    return `${baseWord}${endings[endingKey]}`;
  };
}

export default createWordPluralizer;
