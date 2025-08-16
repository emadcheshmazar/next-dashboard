export const fontScale = (targetPx: number, isArea?: boolean) => {
  const basePx = 17;
  const scale = targetPx / basePx;

  if (isArea) {
    return {
      fontSize: `${basePx}px`,
      transform: `scale(${scale})`,
      transformOrigin: "top right",
      lineHeight: `${targetPx}px`,
    };
  } else {
    return {
      fontSize: `${basePx}px`,
      transform: `scale(${scale})`,
      transformOrigin: "center right",
      lineHeight: `${targetPx}px`,
    };
  }
};
