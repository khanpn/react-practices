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
import bgImagePlaceholder from "../../assets/images/no-image-placeholder.webp";
import { Game } from "../../models/game";
import getCroppedImageUrl from "../../services/imageUrl";
import CriticScore from "./CriticScore";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function GameCardSkeleton() {
  const bgCorlor = "gray.500";

  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia sx={{ height: 140 }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: 400, width: 600, bgcolor: bgCorlor }}
        />
      </CardMedia>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Skeleton
            variant="rectangular"
            sx={{ width: "80%", bgcolor: bgCorlor }}
          />
          <Skeleton variant="circular" sx={{ width: 37, bgcolor: bgCorlor }} />
        </Stack>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton height={40} variant="text" sx={{ bgcolor: bgCorlor }} />
        </Typography>
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
  const [raised, setRaised] = useState(false);
  const bgImage =
    getCroppedImageUrl(game.background_image) || bgImagePlaceholder;
  const toggleMouseOverEffect = () => setRaised((previous) => !previous);
  return (
    <Card
      sx={{ width: "100%" }}
      raised={raised}
      onMouseOut={toggleMouseOverEffect}
      onMouseOver={toggleMouseOverEffect}
    >
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
        <NavLink to={`games/${game.slug}`}>
          <Button size="small">Details</Button>
        </NavLink>
      </CardActions>
    </Card>
  );
}

export default GameCard;
