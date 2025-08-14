export const convertPersianToEnglishDigits = (str: string): string => {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  return str
    .replace(/[۰-۹]/g, (d) => {
      return persianDigits.indexOf(d).toString();
    })
    .replace(/[٠-٩]/g, (d) => {
      return arabicDigits.indexOf(d).toString();
    });
};

export const correctFee = (f: string): string => {
  const clean = convertPersianToEnglishDigits(f);
  if (clean === "" || isNaN(Number(clean))) return f;

  const parts = clean.split(".");
  let l = Number(parts[0]).toLocaleString("en-US") + ".";
  l = l.substring(0, l.indexOf("."));
  return l + (parts[1] ? "." + parts[1] : "");
};

export const correctNumberVal = (args: {
  value: string;
  floatCount?: number;
  isSeprator?: boolean;
}): string => {
  const { value, floatCount = 0, isSeprator } = args;
  const clean = convertPersianToEnglishDigits(value);

  if (clean === "" || isNaN(Number(clean))) return value;

  const num = (
    floatCount !== 0 || isSeprator
      ? Number(clean).toFixed(Number(floatCount))
      : clean
  ).toString();

  const withSeparator = isSeprator ? correctFee(num) : num;

  return withSeparator.replace(/\.0+$/, "");
};

export const formatNumber = (number: string): string => {
  const clean = convertPersianToEnglishDigits(number);
  return Number(clean).toLocaleString("en-US");
};

export function isNumber(c: string, byZero?: boolean): boolean {
  const clean = convertPersianToEnglishDigits(c);
  if (byZero) {
    return /^0\d*$/.test(clean);
  }
  return /^[0-9]+$/.test(clean);
}
