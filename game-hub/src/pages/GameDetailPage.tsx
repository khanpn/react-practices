import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { ExpandableText, GameMeta, PlatformIconList } from "../components";
import GameMedia from "../components/game/GameMedia";
import { useFetchGame } from "../hooks/useFetchGame";

function GameDetailPage() {
  const { slug } = useParams();
  const { data: game, isLoading, error } = useFetchGame(slug!);

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  if (error) throw error;
  if (!game) throw new Error("There was an error occurred");

  return (
    <Container>
      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
        <PlatformIconList
          platforms={game?.parent_platforms.map((pp) => pp.platform)}
          maxLength={10}
        />
        <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
          Everage playtime: {game?.playtime} HOURS
        </Typography>
      </Stack>
      <Box sx={{ my: 2 }}>
        <Typography variant="h3">{game?.name}</Typography>
      </Box>
      <GameMedia game={game} />

      <Stack direction="column" spacing={1} sx={{ my: 2 }}>
        <Typography variant="h5">About</Typography>
        <ExpandableText variant="body1">{game?.description_raw}</ExpandableText>
      </Stack>
      <GameMeta game={game} />
    </Container>
  );
}

export default GameDetailPage;
