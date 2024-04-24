import { Chip, Grid, Stack, Typography } from "@mui/material";
import { Game } from "../../models/game";

interface GameMetaItemItem {
  name: string;
  onClick?: () => void;
}

interface GameMetaItemProps {
  title: string;
  items: GameMetaItemItem[];
}

function GameMetaItem({ title, items }: GameMetaItemProps) {
  return (
    <Grid item xs={6} sm={6} md={4} xl={2}>
      <Stack>
        <Typography variant="h6">{title}</Typography>
        <Stack direction={{ xs: "column", sm: "row", md: "row" }} spacing={0.5}>
          {items.map((item, index) => (
            <Chip
              key={index}
              clickable={item.onClick ? true : false}
              label={item.name}
              variant="filled"
              onClick={item.onClick}
              size="small"
              sx={{ width: "fit-content" }}
            />
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
}

interface Props {
  game: Game;
}

function GameMeta({ game }: Props) {
  return (
    <Grid container spacing={{ xs: 1, sm: 1, md: 3 }} direction="row">
      <GameMetaItem
        title="Platforms"
        items={game.parent_platforms.map((pp) => ({
          name: pp.platform.name,
        }))}
      />
      <GameMetaItem
        title="Genre"
        items={game.genres.map((genre) => ({ name: genre.name }))}
      />
      <GameMetaItem
        title="Publishers"
        items={game.publishers.map((publisher) => ({ name: publisher.name }))}
      />
      <GameMetaItem
        title="Release date"
        items={[{ name: game.released || "TBA" }]}
      />
      <GameMetaItem
        title="Website"
        items={[
          {
            name: game.website || "TBA",
            onClick: () => {
              window.location.href = game.website;
            },
          },
        ]}
      />
      <GameMetaItem
        title="Age rating"
        items={[{ name: game.esrb_rating?.name || "Not rated" }]}
      />
    </Grid>
  );
}

export default GameMeta;
