import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Grid, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react/jsx-runtime';
import { User } from '../../models/user';

const styles = {
  details: {
    padding: '1rem',
    borderTop: '1px solid #e1e1e1',
  },
  value: {
    padding: '1rem 2rem',
    borderTop: '1px solid #e1e1e1',
    color: '#899499',
  },
};

const getUserFullname = (user: User) => {
  return `${user?.firstName || ''}${
    user?.lastName ? ' ' + user?.lastName : ''
  }`;
};

interface Props {
  user: User;
}

export default function ProfileCard({ user }: Props) {
  const {
    palette: {
      primary: { main: primary },
    },
  } = useTheme();

  return (
    <Card variant="outlined">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* CARD HEADER START */}
        <Grid item sx={{ p: '1.5rem 0rem', textAlign: 'center' }}>
          {/* PROFILE PHOTO */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <PhotoCameraIcon
                color="primary"
                sx={{
                  border: '5px solid',
                  borderColor: primary,
                  borderRadius: '50%',
                  padding: '.2rem',
                  width: 35,
                  height: 35,
                }}
              ></PhotoCameraIcon>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src={user.avatar}
            ></Avatar>
          </Badge>

          {/* DESCRIPTION */}

          <Typography variant="h6">{getUserFullname(user)}</Typography>
          <Typography color="primary">{user.jobTitle}</Typography>
        </Grid>
        {/* CARD HEADER END */}

        {/* DETAILS */}
        <Grid container>
          {user.attributes?.map((attr, index) => (
            <Fragment key={index}>
              <Grid item xs={6}>
                <Typography style={styles.details}>{attr.name}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography style={styles.value}>{attr.value}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>

        {/* BUTTON */}
        <Grid item style={styles.details} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(user.website, '_blank')}
            sx={{ width: '99%', p: 1, my: 2 }}
          >
            View Public Profile
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
