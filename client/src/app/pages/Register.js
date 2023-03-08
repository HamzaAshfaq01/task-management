import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
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
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import {
  ValidateNewPassword,
  ValidateConfirmNewPassword,
} from "../Validations/Password.validation";
import { ValidateEmail } from "../Validations/Email.validation";
import { ValidateName } from "../Validations/Name.validation";

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

function Register() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickNewShowPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickConfirmShowPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const first_name = ValidateName();
  const validate_new_password = ValidateNewPassword();
  const validate_confirm_new_password = ValidateConfirmNewPassword();
  const validate_email = ValidateEmail();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      email: "",
      new_password: "",
      confirm_new_password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      ...first_name,
      ...validate_email,
      ...validate_new_password,
      ...validate_confirm_new_password,
    }),
    onSubmit: async (values, helpers) => {},
  });
  return (
    <Box
      component="div"
      sx={{
        minHeight: "80vh",
        display: "flex",
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
                Sign Up
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3,
                }}
              >
                Please complete the information as specified by the system.
              </Typography>
            </Box>

            <form noValidate onSubmit={formik.handleSubmit}>
              <TextField
                error={Boolean(
                  formik.touched.first_name && formik.errors.first_name
                )}
                fullWidth
                margin="normal"
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                name="first_name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.first_name}
                variant="outlined"
                placeholder="NAME"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
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
                  formik.touched.new_password && formik.errors.new_password
                )}
                fullWidth
                margin="normal"
                helperText={
                  formik.touched.new_password && formik.errors.new_password
                }
                name="new_password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showNewPassword ? "text" : "password"}
                value={formik.values.new_password}
                variant="outlined"
                placeholder="PASSWORD"
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
                        onClick={handleClickNewShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                error={Boolean(
                  formik.touched.confirm_new_password &&
                    formik.errors.confirm_new_password
                )}
                fullWidth
                margin="normal"
                helperText={
                  formik.touched.confirm_new_password &&
                  formik.errors.confirm_new_password
                }
                name="confirm_new_password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirm_new_password}
                variant="outlined"
                placeholder="CONFIRM PASSWORD"
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
                        onClick={handleClickConfirmShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

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
              >
                Sign Up
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
                    Already have an account?
                  </Typography>{" "}
                  <Link className="text-primary" to="/auth/login">
                    <b>Login</b>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </MainContent>
    </Box>
  );
}

export default Register;
