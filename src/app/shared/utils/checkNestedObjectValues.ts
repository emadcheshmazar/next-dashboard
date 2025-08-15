interface CheckObjectResult {
  allHaveValues: boolean;
  missingKeys: string[];
}

type PlainObject = Record<string, unknown>;

export function checkNestedObjectValues(
  obj: PlainObject,
  ignoreKeys?: string[]
): CheckObjectResult {
  const missingKeys: string[] = [];

  function recurse(currObj: PlainObject, parentKey = "") {
    for (const key in currObj) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (ignoreKeys?.includes(key) || ignoreKeys?.includes(fullKey)) continue;

      const value = currObj[key];

      if (value && typeof value === "object" && !Array.isArray(value)) {
        recurse(value as PlainObject, fullKey);
      } else if (value === null || value === undefined || value === "") {
        missingKeys.push(fullKey);
      }
    }
  }

  recurse(obj);

  return {
    allHaveValues: missingKeys.length === 0,
    missingKeys,
  };
}
