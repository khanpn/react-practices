import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import { ReactNode, useState } from "react";
import { useGameQueryStore } from "../../store";
import { useFetchGenres } from "../../hooks/useFetchGenres";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  boxShadow: theme.shadows[1],
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": { position: "relative", ...openedMixin(theme) },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": { position: "relative", ...closedMixin(theme) },
  }),
}));

interface GenreListItemSkeletonProps {
  index: number;
}

export function GenreListItemSkeleton({ index }: GenreListItemSkeletonProps) {
  return (
    <ListItem key={index}>
      <Stack direction="row" alignItems="center">
        <ListItemAvatar sx={{ minWidth: 56 }}>
          <Skeleton variant="rounded" width={40} height={40}></Skeleton>
        </ListItemAvatar>
        <Skeleton
          sx={{
            ml: 1,
          }}
          variant="text"
          width={90}
          height={35}
        ></Skeleton>
      </Stack>
    </ListItem>
  );
}

interface Props {
  heading?: string;
  children?: ReactNode;
  numOfSkeletons?: number;
}

function GenreList({ heading, children, numOfSkeletons = 10 }: Props) {
  const isMedium = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(isMedium);

  const toggleDrawer = () => {
    setOpen((previous) => !previous);
  };

  const selectedGenres = useGameQueryStore((state) => state.gameQuery.genres);
  const setGenres = useGameQueryStore((state) => state.setGenres);

  const { data: genres, error, isLoading } = useFetchGenres();

  if (error) return error.message;
  let skeletons: number[] = [];
  if (isLoading) {
    skeletons = Array(numOfSkeletons)
      .fill(1)
      .map((element, index) => index + element);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={open ? "space-between" : "center"}
        >
          {open && heading && (
            <Typography variant="h4" p={2}>
              {heading}
            </Typography>
          )}
          <IconButton sx={{ textAlign: "right" }} onClick={toggleDrawer}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Stack>
        <Divider />
        <List>
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
              selected={selectedGenres?.includes(`${genre.id}`)}
              onClick={() => setGenres([`${genre.id}`])}
            >
              <Stack direction="row" alignItems="center">
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={genre.image_background}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText primary={genre.name} />
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box>{children}</Box>
    </Box>
  );
}

export default GenreList;
