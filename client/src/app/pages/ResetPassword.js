import { useState, forwardRef, Ref } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Slide,
  Dialog,
  Collapse,
  Button,
  Avatar,
  IconButton,
  styled,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import { useFormik } from "formik";
import {
  ValidateConfirmNewPassword,
  ValidateNewPassword,
} from "../Validations/Password.validation";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      top: -${theme.spacing(6)};
      position: absolute;
      left: 50%;
      margin-left: -${theme.spacing(6)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

function RecoverPasswordBasic() {
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

  const [openAlert, setOpenAlert] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const validate_new_password = ValidateNewPassword();
  const validate_confirm_new_password = ValidateConfirmNewPassword();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_new_password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      ...validate_new_password,
      ...validate_confirm_new_password,
    }),
    onSubmit: async (values) => {
      // if (result.code === 200) {
      // setOpenDialog(true);
      // }
    },
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
        <Container maxWidth="sm">
          <Card
            sx={{
              mt: 3,
              p: 4,
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                }}
              >
                Reset Password
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3,
                }}
              >
                Please enter a new password and confirm the new password.
              </Typography>
            </Box>

            <form noValidate onSubmit={formik.handleSubmit}>
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

              <Button
                sx={{ mt: 3 }}
                startIcon={
                  formik.isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={Boolean(!formik.isValid || formik.isSubmitting)}
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </form>
          </Card>
        </Container>
      </MainContent>

      <DialogWrapper
        open={openDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 10,
          }}
        >
          <AvatarSuccess>
            <CheckTwoToneIcon />
          </AvatarSuccess>

          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="info"
            >
              Please check your email.
            </Alert>
          </Collapse>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 10,
            }}
            variant="h3"
          >
            You will receive an email shortly to reset your password.
          </Typography>

          <Button
            fullWidth
            component={Link}
            size="large"
            variant="contained"
            onClick={handleCloseDialog}
            to="/auth/login"
          >
            Login again
          </Button>
        </Box>
      </DialogWrapper>
    </Box>
  );
}

export default RecoverPasswordBasic;
