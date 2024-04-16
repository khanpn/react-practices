import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Game } from "../models/game";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";

export function GameCardSkeleton() {
  const {
    palette: { mode },
  } = useTheme();

  const bgCorlor = mode === "dark" ? "white" : "gray";

  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 140 }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: "100%", bgcolor: bgCorlor }}
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton variant="text" sx={{ bgcolor: bgCorlor }} />
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Skeleton
            variant="rectangular"
            sx={{ width: "80%", bgcolor: bgCorlor }}
          />
          <Skeleton
            variant="circular"
            sx={{ width: "30px", bgcolor: bgCorlor }}
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ pl: 2 }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: "50px", bgcolor: bgCorlor }}
        />
      </CardActions>
    </Card>
  );
}

interface Props {
  game: Game;
}

function GameCard({ game }: Props) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={getCroppedImageUrl(game.background_image)}
        title={game.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {game.name}
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <PlatformIconList
            platforms={game.parent_platforms.map(({ platform }) => platform)}
          ></PlatformIconList>
          <CriticScore score={game.metacritic}></CriticScore>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export default GameCard;
