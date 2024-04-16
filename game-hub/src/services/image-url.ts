interface Options {
  width: number;
  height: number;
}

const getCroppedImageUrl = (url: string, options?: Options): string => {
  if (!url) return "";
  const { width, height } = options || { width: 600, height: 400 };
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  return (
    url.slice(0, index) +
    `crop/${width}/${height}/` +
    url.slice(index, url.length)
  );
};

export default getCroppedImageUrl;
