import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={3}
    >
      <Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <ErrorOutlineIcon sx={{ fontSize: 120 }} />
          <Typography variant="h2">Opps!</Typography>
        </Stack>
        <Divider variant="fullWidth" sx={{ my: 3 }} />
        <Typography variant="h4">
          {isRouteErrorResponse(error)
            ? "Page not found!"
            : "An unexpected error occurred!"}
        </Typography>
      </Stack>
    </Box>
  );
}

export default ErrorPage;
