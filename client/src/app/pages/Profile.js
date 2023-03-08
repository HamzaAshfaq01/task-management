import { useState, ChangeEvent, useCallback, useEffect } from "react";
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
} from "@mui/material";
import clsx from "clsx";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import CloseIcon from "@mui/icons-material/Close";
import Label from "../components/Label";
import Text from "../components/Text";

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
  const [users, setUsers] = useState();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [currentTab, setCurrentTab] = useState("user_information");
  const [tabs, setTabs] = useState([
    { value: "user_information", label: "User Information" },
    { value: "security_settings", label: "Security Settings" },
  ]);
  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      {/* {SimpleBackdrop(openBackdrop)} */}
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
            {currentTab == "user_information" && <PersonalInfo />}
            {currentTab == "security_settings" && <SecuritySettingsTab />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const PersonalInfo = () => {
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
            {/* <EditUserInformation
                        type={PersonalType.Personal}
                        editUser={true}
                        users={props.users}
                        onChangeUpdateUser={(e) => props.onChange(e)}
                      /> */}
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
                    <b>Hamza - Ashfaq</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
                  <Box pr={3} pb={2}>
                    Email :
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9} sx={{ display: "flex" }}>
                  <Text color="black">
                    <b>HamzaAshfaq7866@gmail.com</b>
                  </Text>
                  {Verified_EMAIL_Status(String(true))}
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
const SecuritySettingsTab = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Security</Typography>
          <Typography variant="subtitle2">security settings</Typography>
        </Box>
        <Card>
          <List>
            <ListItem
              sx={{
                p: 3,
              }}
            >
              <Grid container>
                <ListItemText
                  primaryTypographyProps={{ variant: "h5", gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: "subtitle2",
                    lineHeight: 1,
                  }}
                  primary="change password"
                  secondary="You can click here to change your password."
                />
                <Button
                  sx={{
                    mt: {
                      xs: 4, // apply margin top 4 on extra small screens
                      md: 0,
                    },
                  }}
                  variant="outlined"
                  size="large"
                >
                  change password
                </Button>
              </Grid>
            </ListItem>
            <Divider component="li" />
            <ListItem
              sx={{
                p: 3,
              }}
            >
              <Grid container>
                <ListItemText
                  primaryTypographyProps={{ variant: "h5", gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: "subtitle2",
                    lineHeight: 1,
                  }}
                  primary="Password change notification"
                  secondary="Turn on password change notifications every 90 days."
                />
                <Switch
                  sx={{
                    mt: {
                      xs: 4, // apply margin top 4 on extra small screens
                      md: 0,
                    },
                  }}
                  color="primary"
                />
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManagementUsersView;
