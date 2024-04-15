import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

function GameCardSkeleton() {
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

export default GameCardSkeleton;
