import * as React from "react";
import {
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Api } from "../utils/API";
import { toast } from "react-toastify";
import { setCregential } from "../utils/localstorage";
import { useHistory } from "react-router-dom";
import { pagePath } from "../utils/config";
import { colors } from "../Theme/ColorPalette";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const input = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      const cred = {
        userName: btoa(input.get("userName")),
        password: btoa(input.get("password")),
      };

      const { statusCode, data } = await Api.postRequest("/auth/signin", cred);
      const { isOk, message } = JSON.parse(data);
      if (statusCode === 400 || statusCode === 500 || !isOk) {
        toast.error(message);
        return;
      }
      toast.success(message);
      setCregential(cred);
      history.replace(pagePath.ARTIST_PAGE);
    },
    [history]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, background: colors.primary }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="userName" label="User name" name="userName" autoComplete="userName" autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, background: colors.primary }}>
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
