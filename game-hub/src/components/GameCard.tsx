import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import bgImagePlaceholder from "../assets/images/no-image-placeholder.webp";
import { Game } from "../models/game";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";

export function GameCardSkeleton() {
  const bgCorlor = "gray.500";

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
  const bgImage =
    getCroppedImageUrl(game.background_image) || bgImagePlaceholder;
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 140 }} image={bgImage} title={game.name} />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <PlatformIconList
            platforms={game.parent_platforms.map(({ platform }) => platform)}
          ></PlatformIconList>
          <CriticScore score={game.metacritic}></CriticScore>
        </Stack>
        <Typography gutterBottom variant="h5" component="div">
          {game.name + " "}
          <Emoji rating={game.rating_top} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

export default GameCard;
