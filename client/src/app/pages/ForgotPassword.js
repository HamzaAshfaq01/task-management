import * as Yup from "yup";
import {
  Box,
  Card,
  TextField,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Button,
  styled,
  Dialog,
  Slide,
  Avatar,
  Collapse,
  Alert,
  IconButton,
} from "@mui/material";
import React, { forwardRef, Ref, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TransitionProps } from "@mui/material/transitions";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import { ValidateEmail } from "../Validations/Email.validation";
import { forgotpassword } from "../redux/actions/auth.action";
import BackDrop from "../components/Backdrop";

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

function ForgotPassword() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.loader);

  const [openAlert, setOpenAlert] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const validate_email = ValidateEmail();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      ...validate_email,
    }),
    onSubmit: async (values) => {
      dispatch(forgotpassword(values.email));
    },
  });

  return (
    <>
      {BackDrop(isLoading)}
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
                  Forgot password
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  Please enter your email to reset your password.
                </Typography>
              </Box>

              <form noValidate onSubmit={formik.handleSubmit}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="EMAIL"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <Button
                  sx={{ mt: 3 }}
                  startIcon={
                    formik.isSubmitting ? (
                      <CircularProgress size="1rem" />
                    ) : null
                  }
                  disabled={Boolean(!formik.isValid || formik.isSubmitting)}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Reset password
                </Button>
              </form>
            </Card>
            <Box mt={3} textAlign="right">
              <Typography
                component="span"
                variant="subtitle2"
                color="text.primary"
                fontWeight="bold"
              >
                Want to login again &nbsp;
              </Typography>
              <Link className="text-primary" to="/auth/login">
                <b>Sign In</b>
              </Link>
            </Box>
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
              login again
            </Button>
          </Box>
        </DialogWrapper>
      </Box>
    </>
  );
}

export default ForgotPassword;
