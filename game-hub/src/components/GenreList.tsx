import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useFetchGenres } from "../hooks/useFetchGenres";
import { Genre } from "../models/genre";

interface GenreListItemSkeletonProps {
  index: number;
}

export function GenreListItemSkeleton({ index }: GenreListItemSkeletonProps) {
  return (
    <ListItem key={index}>
      <ListItemAvatar>
        <Skeleton variant="rounded" width={40} height={40}></Skeleton>
      </ListItemAvatar>
      <Skeleton variant="text" width={90} height={35}></Skeleton>
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
  const { data: genres, error, isLoading } = useFetchGenres([]);

  if (error) return error;

  let skeletons: number[] = [];
  if (isLoading) {
    skeletons = Array(numOfSkeletons)
      .fill(1)
      .map((element, index) => index + element);
  }

  return (
    <List sx={{ minWidth: 250 }}>
      {isLoading &&
        skeletons.map((index) => (
          <GenreListItemSkeleton
            key={index}
            index={index}
          ></GenreListItemSkeleton>
        ))}
      {genres.map((genre) => (
        <ListItemButton
          key={genre.id}
          selected={selectedGenre?.id === genre.id}
          onClick={() => onSelectGenre(genre)}
        >
          <ListItemAvatar>
            <Avatar variant="rounded" src={genre.image_background}></Avatar>
          </ListItemAvatar>
          <ListItemText primary={genre.name} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default GenreList;
