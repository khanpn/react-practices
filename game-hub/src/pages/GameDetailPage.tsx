import { useParams } from "react-router-dom";
import { useFetchGame } from "../hooks/useFetchGame";
import { Typography } from "@mui/material";

function GameDetailPage() {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useFetchGame(slug!);

  if (isLoading) return "Loading...";
  if (error) throw error;

  return (
    <>
      <Typography variant="h4">{game?.name}</Typography>
      <Typography variant="body1">{game?.description_raw}</Typography>
    </>
  );
}

export default GameDetailPage;
