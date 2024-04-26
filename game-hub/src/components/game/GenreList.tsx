import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFetchGenres } from "../../hooks/useFetchGenres";
import { Genre } from "../../models/genre";

interface GenreListItemSkeletonProps {
  index: number;
  isXs: boolean;
}

export function GenreListItemSkeleton({
  index,
  isXs,
}: GenreListItemSkeletonProps) {
  return (
    <ListItem key={index}>
      <Stack
        direction={{ xs: "column", sm: "row", md: "row" }}
        alignItems={{ sx: "start", sm: "center", md: "center" }}
      >
        <ListItemAvatar sx={{ minWidth: 40 }}>
          <Skeleton variant="rounded" width={40} height={40}></Skeleton>
        </ListItemAvatar>
        <Skeleton
          sx={{
            ml: isXs ? 0 : 1,
          }}
          variant="text"
          width={isXs ? 40 : 90}
          height={35}
        ></Skeleton>
      </Stack>
    </ListItem>
  );
}

interface Props {
  selectedGenre?: Genre;
  numOfSkeletons?: number;
  onSelectGenre: (genre: Genre) => void;
}

function GenreList({
  selectedGenre,
  numOfSkeletons = 10,
  onSelectGenre,
}: Props) {
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { data: genres, error, isLoading } = useFetchGenres();

  if (error) return error.message;

  let skeletons: number[] = [];
  if (isLoading) {
    skeletons = Array(numOfSkeletons)
      .fill(1)
      .map((element, index) => index + element);
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          pl: 2,
          display: {
            xs: "none",
            md: "inline",
          },
        }}
      >
        Genres
      </Typography>
      <Box width={{ xs: 60, sm: "unset", md: "unset" }} pl={0.5}>
        <List>
          {isLoading &&
            skeletons.map((index) => (
              <GenreListItemSkeleton
                key={index}
                index={index}
                isXs={isXs}
              ></GenreListItemSkeleton>
            ))}
          {genres?.map((genre) => (
            <ListItemButton
              key={genre.id}
              selected={selectedGenre?.id === genre.id}
              onClick={() => onSelectGenre(genre)}
              sx={{ p: isXs ? 1 : 2 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                alignItems={{ sx: "start", sm: "center", md: "center" }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={genre.image_background}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={isXs ? genre.name.slice(0, 5) : genre.name}
                />
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default GenreList;
