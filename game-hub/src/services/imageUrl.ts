interface Options {
  width?: number | string;
  height?: number | string;
}

const getAlternativeImageUrl = (
  url: string,
  operation: string,
  options?: Options
) => {
  if (!url) return "";
  const { width, height } = options || { width: 600, height: 400 };
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return (
    url.slice(0, index) +
    `${operation}/${width}/${height}/` +
    url.slice(index, url.length)
  );
};

const getCroppedImageUrl = (url: string, options?: Options): string => {
  return getAlternativeImageUrl(url, "crop", options);
};

const getResizedImageUrl = (url: string, options?: Options): string => {
  return getAlternativeImageUrl(url, "resize", options);
};

export { getCroppedImageUrl, getResizedImageUrl };
