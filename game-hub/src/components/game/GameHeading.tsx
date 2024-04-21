import { Typography } from "@mui/material";
import { GameQuery } from "../../models/gameQuery";

interface Props {
  gameQuery: GameQuery;
}

function GameHeading({ gameQuery: { genre, platform } }: Props) {
  const platformTitle = platform ? platform.name + " " : "";
  const genreTitle = genre ? genre.name + " " : "";
  const title = `${platformTitle}${genreTitle}Games`;
  return <Typography variant="h4">{title}</Typography>;
}

export default GameHeading;
