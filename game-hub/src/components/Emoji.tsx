import bullsEye from "../assets/emojis/bulls-eye.webp";
import meh from "../assets/emojis/meh.webp";
import thumbsUp from "../assets/emojis/thumbs-up.webp";

interface Props {
  rating: number;
  width?: number;
  height?: number;
}

interface ImageProps {
  src: string;
  alt: string;
}

const emojiMap: { [key: number]: ImageProps } = {
  3: { src: meh, alt: "meh" },
  4: { src: thumbsUp, alt: "recommended" },
  5: { src: bullsEye, alt: "exceptional" },
};

function Emoji({ rating = 0, width = 24, height = 24 }: Props) {
  if (rating < 3) return null;

  const emoji = emojiMap[rating];
  return (
    <img
      {...emoji}
      width={width}
      height={height}
      style={{ backgroundColor: "none" }}
    ></img>
  );
}

export default Emoji;
