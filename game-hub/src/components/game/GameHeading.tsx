import { Typography } from "@mui/material";
import { GameQuery } from "../../models/gameQuery";

interface Props {
  gameQuery: GameQuery;
}

function GameHeading({ gameQuery: { genres, platforms } }: Props) {
  const platformTitle = platforms ? platforms[0].name + " " : "";
  const genreTitle = genres ? genres[0].name + " " : "";
  const title = `${platformTitle}${genreTitle}Games`;
  return <Typography variant="h4">{title}</Typography>;
}

export default GameHeading;
