import {
  Box,
  Container,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LogoutPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [progressDone, setProgressDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const logout = () => {
    setProgressDone(true);
  };

  useEffect(() => {
    // use this effect to do navigate to avoid an issue `Cannot update a component (`RouterProvider`) while rendering a different component` due to the LinearProgress is being re-rendered
    if (progressDone) {
      setUser(undefined);
      navigate("/");
    }
  }, [progressDone]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          logout();
        }
        const diff = 5;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        height: "calc(100vh - 130px)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h5">
          You are logging out. Click <Link onClick={() => logout()}>here</Link>{" "}
          to direct logout.
        </Typography>
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Stack>
    </Container>
  );
}

export default LogoutPage;
