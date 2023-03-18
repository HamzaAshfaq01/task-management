import { useState, ChangeEvent, useCallback, useEffect } from "react";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Box,
  Tabs,
  Tab,
  Grid,
  styled,
  Stack,
  ListItemText,
  List,
  Button,
  ListItem,
  Switch,
  Card,
  Typography,
  Divider,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import Label from "../components/Label";
import Text from "../components/Text";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import BackDrop from "../components/Backdrop";
import { updateProfile } from "../redux/actions/auth.action";
import {
  ValidateConfirmNewPassword,
  ValidateNewPassword,
} from "../Validations/Password.validation.js";

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
  `
);

const TextWrapper = styled("span")(
  ({ theme }) => `
      display: inline-block;
      align-items: center;

      &.flexItem {
        display: inline-flex;
      }
      
      &.MuiText {

        &-black {
          color: ${theme.palette.common.black}
        }

        &-primary {
          color: ${theme.palette.primary.main}
        }
        
        &-secondary {
          color: ${theme.palette.secondary.main}
        }
        
        &-success {
          color: ${theme.palette.success.main}
        }
        
        &-warning {
          color: ${theme.palette.warning.main}
        }
              
        &-error {
          color: ${theme.palette.error.main}
        }
        
        &-info {
          color: ${theme.palette.info.main}
        }
      }
`
);

function ManagementUsersView() {
  const isLoading = useSelector((state) => state.loading.loader);

  const [currentTab, setCurrentTab] = useState("user_information");
  const [tabs, setTabs] = useState([
    { value: "user_information", label: "User Information" },
  ]);
  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      {BackDrop(isLoading)}
      <Box sx={{ mt: 3 }}>
        <Grid
          sx={{ px: 4 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid style={{ paddingLeft: 0 }} item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab, index) => {
                return (
                  <Tab key={tab?.value} label={tab?.label} value={tab?.value} />
                );
              })}
            </TabsWrapper>
          </Grid>
          <Grid style={{ paddingLeft: 0 }} item xs={12}>
            <PersonalInfo />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const PersonalInfo = () => {
  const { user } = useAuth0();
  const Verified_EMAIL_Status = (verified_email_status) => {
    const map = {
      true: {
        text: "Successful Confirmation",
        icon: <DoneTwoToneIcon fontSize="small" />,
        color: "success",
      },
      false: {
        text: "Unconfirmed",
        icon: <CloseIcon fontSize="small" />,
        color: "error",
      },
    };

    const { text, icon, color } = map[verified_email_status];

    return (
      <Box pl={1} component="span">
        <Label color={color}>
          <Stack spacing={0.3} direction="row">
            {icon}
            <b>{text}</b>
          </Stack>
        </Label>
      </Box>
    );
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Information
              </Typography>
              <Typography variant="subtitle2">
                Manage Personal Information
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              p: 4,
            }}
          >
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Full name :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>
                      {user.given_name} - {user.family_name}
                    </b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Email :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9} sx={{ display: "flex" }}>
                  <Text color="black">
                    <b>{user.email}</b>
                  </Text>
                  {Verified_EMAIL_Status(String(user.email_verified))}
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManagementUsersView;
