import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ExpandableText,
  GameMedia,
  GameMeta,
  PlatformIconList,
  SimilarGamesGrid,
} from '../components';
import { useFetchGame } from '../hooks/useFetchGame';
import useGlobalSearchHandler from '../hooks/useGlobalSearchHandler';

interface PaperProps {
  background_image: string;
}

const BoxWithBackgroundImage = styled(Box)<PaperProps>(
  ({ background_image }) => ({
    backgroundImage: 'none',
    '&::before': {
      content: "''",
      display: 'block',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '720px',
      opacity: 0.1,
      backgroundImage: `url(${background_image})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

function GameDetailPage() {
  useGlobalSearchHandler();

  const {
    palette: {
      background: { paper },
    },
  } = useTheme();
  const { slug } = useParams();
  const { data: game, isLoading, error } = useFetchGame(slug!);

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [slug]);

  if (isLoading)
    return (
      <Backdrop
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  if (error) throw error;
  if (!game) throw new Error('There was an error occurred');

  return (
    <BoxWithBackgroundImage
      sx={{ pt: 2 }}
      background_image={game.background_image}
    >
      <Container>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
          <PlatformIconList
            platforms={game?.parent_platforms.map((pp) => pp.platform)}
            maxLength={10}
          />
          <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
            Everage playtime: {game?.playtime} HOURS
          </Typography>
        </Stack>
        <Box sx={{ my: 2 }}>
          <Typography variant="h3">{game?.name}</Typography>
        </Box>
        <GameMedia game={game} />

        <Stack direction="column" spacing={1} sx={{ my: 2 }}>
          <Typography variant="h5">About</Typography>
          <ExpandableText variant="body1">
            {game?.description_raw}
          </ExpandableText>
        </Stack>

        <Box
          sx={{
            p: 2,
            backgroundColor: paper,
            borderRadius: '4px',
          }}
        >
          <GameMeta game={game} />
        </Box>
        <Stack direction="column" spacing={1} sx={{ my: 4 }}>
          <Typography variant="h5">Similar games</Typography>
          <SimilarGamesGrid game={game} />
        </Stack>
      </Container>
    </BoxWithBackgroundImage>
  );
}

export default GameDetailPage;
