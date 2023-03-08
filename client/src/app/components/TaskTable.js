import React from "react";
import {
  Tooltip,
  IconButton,
  Grid,
  Autocomplete,
  TextField,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  InputAdornment,
  TableRow,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import { decryptData } from "../utils/crypto.util";
import { updateTask } from "../redux/actions/task.action";

let PeriorityStatus = [
  { label: "High", value: "HIGH" },
  { label: "Medium", value: "MEDIUM" },
  { label: "Low", value: "LOW" },
];
let TaskStatus = [
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
];

const Task = ({
  setOpenConfirmDelete,
  setOpenAddTask,
  setSelectedTask,
  setOpenConfirmEdit,
  setTaskID,
  handlePriority,
  handleStatus,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const handleConfirmDelete = (taskID) => {
    setOpenConfirmDelete(true);
    setTaskID(taskID);
  };
  const handleAddTask = () => {
    setOpenAddTask(true);
  };
  const handleEditTask = (task) => {
    setOpenConfirmEdit(true);
    setSelectedTask(task);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="SEARCH"
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Button
            sx={{
              mt: { xs: 1, sm: 0.5 },
            }}
            variant="contained"
            startIcon={<ControlPointIcon fontSize="small" />}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <TableContainer>
        <Table size="small" stickyHeader scrollable="true">
          <TableHead>
            <TableRow>
              <TableCell align="center">NO.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.tasks?.map((task, index) => (
              <TableRow key={index} hover>
                <TableCell align="center">
                  <Typography fontWeight="bold">1</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{decryptData(task.title)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{decryptData(task.description)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{task.due_date}</Typography>
                </TableCell>
                <TableCell>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={PeriorityStatus.find(
                      (priority) => priority.value == decryptData(task.priority)
                    )}
                    onChange={(_e, { value }) =>
                      handlePriority(task._id, value)
                    }
                    options={PeriorityStatus}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={TaskStatus.find(
                      (status) => status.value == decryptData(task.status)
                    )}
                    onChange={(_e, { value }) => handleStatus(task._id, value)}
                    options={TaskStatus}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography noWrap>
                    <Tooltip title="EDIT" arrow>
                      <IconButton onClick={() => handleEditTask(task)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="DELETE" arrow>
                      <IconButton
                        onClick={() => handleConfirmDelete(task._id)}
                        color="error"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Task;
