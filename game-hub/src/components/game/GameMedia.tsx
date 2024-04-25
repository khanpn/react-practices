import { Skeleton, Theme, useMediaQuery } from "@mui/material";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchGameScreenshots } from "../../hooks/useFetchGameScreenshots";
import { useFetchGameTrailers } from "../../hooks/useFetchGameTrailers";
import { getResizedImageUrl } from "../../services/imageUrl";
import { Game } from "../../models/game";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  game: Game;
}

function GameMedia({ game }: Props) {
  const isLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { data: trailers, isLoading: isLoadingTrailers } = useFetchGameTrailers(
    game.slug
  );
  const { data: screenshots, isLoading: isLoadingScreenshots } =
    useFetchGameScreenshots(game.slug);

  let width;
  let maxHeight;
  if (isLarge) {
    width = 1280;
    maxHeight = 800;
  } else {
    width = 600;
    maxHeight = 400;
  }

  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={30}
      cssMode={true}
      navigation={true}
      pagination={{ clickable: true }}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="gameMediaSwiper"
    >
      {isLoadingTrailers && isLoadingScreenshots && (
        <SwiperSlide>
          <Skeleton width={width} height={maxHeight} />
        </SwiperSlide>
      )}
      {trailers?.slice(0, 2).map((trailer) => (
        <SwiperSlide key={trailer.id} style={{ maxHeight }}>
          <video
            src={trailer.data[isLarge ? "max" : 480]}
            poster={trailer.preview}
            controls
            width={width}
          ></video>
        </SwiperSlide>
      ))}
      {screenshots?.map((screenshot) => (
        <SwiperSlide key={screenshot.id} style={{ maxHeight }}>
          <img
            src={getResizedImageUrl(screenshot.image, {
              width: width,
              height: "-",
            })}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default GameMedia;
