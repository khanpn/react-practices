import {
  Avatar,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as y from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { demoUser } from "../providers/authProvider";
import useGlobalSearchHandler from "../hooks/useGlobalSearchHandler";

const paperStyle = {
  padding: 20,
  maxWidth: 480,
  margin: "40px auto",
};

function LoginPage() {
  useGlobalSearchHandler();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [validating, setValidating] = useState(false);
  const [showServerError, setShowServerError] = useState(false);

  const loginSchema = y.object({
    username: y.string().max(256).required(),
    password: y.string().required(),
    rememberMe: y.boolean().nullable(),
    allValid: y
      .boolean()
      .nullable()
      .test({
        name: "authenticated",
        message: "Username or password is incorrect",
        test: (value, { parent: { username, password } }) => {
          if (!username || !password) {
            setShowServerError(false);
            return !!value;
          }
          return new Promise((resolve) => {
            setValidating(true);
            setTimeout(() => {
              if (
                username === demoUser.username &&
                password === demoUser.password
              ) {
                resolve(true);
              } else {
                setShowServerError(true);
                resolve(false);
              }
              setValidating(false);
            }, 3000);
          });
        },
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  const onSuccess = () => {
    setUser(demoUser);
    navigate(-1);
  };

  return (
    <Container
      sx={{
        display: "flex",
        height: "calc(100vh - 130px)",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(() => {
          onSuccess();
        })}
      >
        <Paper elevation={10} style={paperStyle}>
          <Stack alignItems="center">
            <Avatar
              sizes="50px"
              sx={{
                backgroundColor: "#1bbd7e",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography p={2} variant="h5">
              Sign In
            </Typography>
          </Stack>
          <Typography pb={1} textAlign="center" variant="body2">
            Use demo/demo
          </Typography>
          <FormControl error={!!errors.username} fullWidth sx={{ my: 1 }}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput
              id="username"
              {...register("username")}
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              label="description"
            />
            {errors.username && (
              <FormHelperText>{errors.username.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.password} fullWidth sx={{ my: 1 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              {...register("password")}
              type="password"
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              label="password"
            />
            {errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                {...register("rememberMe")}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember me"
          />
          <FormControl error={!!errors.allValid} fullWidth sx={{ my: 1 }}>
            {showServerError && errors.allValid && (
              <FormHelperText>{errors?.allValid?.message}</FormHelperText>
            )}
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ my: 1 }}
          >
            Sign in
          </Button>
          <Typography>
            <Link>Forgot password?</Link>
          </Typography>
          <Typography>
            Do you have an account? <Link>Sign Up</Link>
          </Typography>
        </Paper>
      </form>
      <Backdrop
        sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={validating}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default LoginPage;
