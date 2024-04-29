import { Grid } from "@mui/material";
import profileCoverImageUrl from "../assets/images/profile-cover.png";
import { ProfileCard, SettingsCard } from "../components";
import { demoUser } from "../providers/authProvider";
import useGlobalSearchHandler from "../hooks/useGlobalSearchHandler";

function ProfilePage() {
  useGlobalSearchHandler();
  return (
    <Grid container direction="column" sx={{ overflowX: "hidden" }}>
      <Grid item xs={12} md={6}>
        <img
          alt="avatar"
          style={{
            width: "100vw",
            height: "35vh",
            objectFit: "cover",
            objectPosition: "50% 50%",
            position: "relative",
          }}
          src={profileCoverImageUrl}
        />
      </Grid>

      {/* COMPONENTS */}
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{
          position: "absolute",
          top: "20vh",
          px: { xs: 0, md: 7 },
        }}
      >
        {/* PROFILE CARD */}
        <Grid item md={3}>
          <ProfileCard user={demoUser}></ProfileCard>
        </Grid>

        {/* SETTINGS CARD */}
        <Grid item md={9}>
          <SettingsCard user={demoUser}></SettingsCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
