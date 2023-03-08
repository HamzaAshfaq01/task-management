import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  Tabs,
  Tab,
} from "@mui/material";
import TaskTable from "../components/TaskTable";

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.xl}px) {
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          box-shadow: none;
      }
    }
    `
);

let TaskStatus = [
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
];

const Tasks = () => {
  const [currentTab, setCurrentTab] = useState("ALL");
  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Box pb={2}>
            <Typography variant="h3">Schedule Management</Typography>
            <Typography variant="subtitle2">
              Manage all your existing schedule or add new schedule
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: 0 }}>
          <Box
            display="flex"
            alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "center", sm: "space-between" }}
            pb={3}
          >
            <TabsWrapper
              sx={{ width: "100%" }}
              onChange={handleTabsChange}
              scrollButtons="auto"
              textColor="secondary"
              value={currentTab}
              variant="scrollable"
            >
              <Tab key={0} value={"ALL"} label="Show All" />
              {TaskStatus.map((tab) => (
                <Tab key={tab.label} value={tab.value} label={tab.label} />
              ))}
            </TabsWrapper>
          </Box>
          <TaskTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tasks;
