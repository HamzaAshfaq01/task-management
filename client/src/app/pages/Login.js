import { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  Container,
  Slide,
  styled,
  Button,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { ValidatePasswordSignIn } from "../Validations/Password.validation";
import { ValidateEmail } from "../Validations/Email.validation";
import LoginWithOtherProvider from "./LoginWithOtherProvider";
import { login } from "../redux/actions/auth.action";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loading.loader);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate_password_singin = ValidatePasswordSignIn();
  const validate_email = ValidateEmail();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      terms: false,
      submit: null,
    },
    validationSchema: Yup.object({
      ...validate_email,
      ...validate_password_singin,
    }),
    onSubmit: async (values, helpers) => {
      dispatch(login(values, helpers.resetForm, navigate));
    },
  });

  return (
    <Box
      component="div"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainContent>
        <Container sx={{ pl: 0, pr: 0 }} maxWidth="sm">
          <Card
            sx={{
              mt: 3,
              p: 4,
            }}
          >
            <Box textAlign="center">
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                }}
              >
                Sign In
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3,
                }}
              >
                Please enter your email and password to login.
              </Typography>
            </Box>

            <form noValidate onSubmit={formik.handleSubmit}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                margin="normal"
                helperText={formik.touched.email && formik.errors.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
                placeholder="EMAIL"
                data-testid="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                margin="normal"
                helperText={formik.touched.password && formik.errors.password}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                variant="outlined"
                placeholder="PASSWORD"
                data-testid="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box
                alignItems="center"
                display={{ xs: "block", md: "flex" }}
                justifyContent="space-between"
              >
                <Box display={{ xs: "block", md: "flex" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.terms}
                        name="terms"
                        color="primary"
                        onChange={formik.handleChange}
                      />
                    }
                    label={
                      <>
                        <Typography variant="body2">
                          Remember password
                        </Typography>
                      </>
                    }
                  />
                </Box>
                <Link className="text-primary" to="/auth/forgot-password">
                  <b>Forgot password</b>
                </Link>
              </Box>

              {Boolean(formik.touched.terms && formik.errors.terms) && (
                <FormHelperText error>{formik.errors.terms}</FormHelperText>
              )}

              <Button
                sx={{ marginTop: 3 }}
                startIcon={
                  formik.isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={Boolean(!formik.isValid || formik.isSubmitting)}
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
                data-testid="submit"
              >
                Sign In
              </Button>
            </form>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                mt={4}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                    fontWeight="bold"
                  >
                    Don't have an account?
                  </Typography>{" "}
                  <Link className="text-primary" to="/auth/registration">
                    <b>Register</b>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Card>
          {/* <LoginWithOtherProvider /> */}
        </Container>
      </MainContent>
    </Box>
  );
}

export default Login;
