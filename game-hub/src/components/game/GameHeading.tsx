import { Typography } from "@mui/material";
import { useFetchGenres } from "../../hooks/useFetchGenres";
import { useFetchPlatforms } from "../../hooks/useFetchPlatforms";
import { useGameQueryStore } from "../../store";

function GameHeading() {
  const selectedPlatformIds = useGameQueryStore(
    (state) => state.gameQuery.platforms
  );
  const selectedGenreIds = useGameQueryStore((state) => state.gameQuery.genres);
  const { data: platforms } = useFetchPlatforms([]);
  const { data: genres } = useFetchGenres();

  const platformId =
    selectedPlatformIds && selectedPlatformIds[0]
      ? selectedPlatformIds[0]
      : undefined;
  let platformName = "";
  if (platformId) {
    if (platforms) {
      const index = platforms.findIndex(
        (platform) => `${platform.id}` == platformId
      );
      platformName = index !== -1 ? platforms[index].name : "";
    }
  }

  const genreId =
    selectedGenreIds && selectedGenreIds[0] ? selectedGenreIds[0] : undefined;
  let genreName = "";
  if (genreId) {
    if (genres) {
      const index = genres.findIndex((genre) => `${genre.id}` == genreId);
      genreName = index !== -1 ? genres[index].name : "";
    }
  }

  const genreTitle = genreName ? genreName + " " : "";
  const platformTitle = platformName ? platformName + " " : "";
  const title = `${platformTitle}${genreTitle}Games`;
  return <Typography variant="h4">{title}</Typography>;
}

export default GameHeading;
