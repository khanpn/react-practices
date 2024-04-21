import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useFetchGenres } from "../../hooks/useFetchGenres";
import { Genre } from "../../models/genre";

interface GenreListItemSkeletonProps {
  index: number;
}

export function GenreListItemSkeleton({ index }: GenreListItemSkeletonProps) {
  return (
    <ListItem key={index}>
      <ListItemAvatar sx={{ minWidth: 40 }}>
        <Skeleton variant="rounded" width={40} height={40}></Skeleton>
      </ListItemAvatar>
      <Skeleton
        sx={{ ml: 1, display: { xs: "none", sm: "inline", md: "inline" } }}
        variant="text"
        width={90}
        height={35}
      ></Skeleton>
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
  const { data, error, isLoading } = useFetchGenres();

  if (error) return error.message;

  const genres = data?.results;

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
      <List
        sx={{
          minWidth: {
            md: 250,
          },
        }}
      >
        {isLoading &&
          skeletons.map((index) => (
            <GenreListItemSkeleton
              key={index}
              index={index}
            ></GenreListItemSkeleton>
          ))}
        {genres?.map((genre) => (
          <ListItemButton
            key={genre.id}
            selected={selectedGenre?.id === genre.id}
            onClick={() => onSelectGenre(genre)}
          >
            <ListItemAvatar sx={{ minWidth: 40 }}>
              <Avatar variant="rounded" src={genre.image_background}></Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                pl: 1,
                display: { xs: "none", sm: "inline", md: "inline" },
              }}
              primary={genre.name}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default GenreList;
