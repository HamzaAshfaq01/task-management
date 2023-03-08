import React, { useState, forwardRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Tooltip,
  IconButton,
  Grid,
  DialogTitle,
  Chip,
  Autocomplete,
  TextField,
  Card,
  Slide,
  DialogContent,
  Divider,
  CircularProgress,
  Button,
  Table,
  TableBody,
  Dialog,
  TableCell,
  TableHead,
  TableContainer,
  InputAdornment,
  TableRow,
  Typography,
  Paper,
  Pagination,
  Stack,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";

let TaskStatus = [
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
];

const DialogActions = styled(Box)(
  ({ theme }) => `
       background: ${theme.colors.alpha.black[5]}
    `
);

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const Task = () => {
  const [page, setPage] = useState(0);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };
  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 58,
        height: 58,
        mr: 1,
        letterSpacing: 2,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const handleConfirmDelete = (e) => {
    e.stopPropagation();
    setOpenConfirmDelete(true);
  };
  const handleAddTask = () => {
    setOpenAddTask(true);
  };
  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };
  const closeAddTask = () => {
    setOpenAddTask(false);
  };

  return (
    <Card>
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
      <>
        <TableContainer >
          <Table size="small" stickyHeader scrollable>
            <TableHead>
              <TableRow>
                <TableCell align="center">NO.</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">
                  <Typography fontWeight="bold">1</Typography>
                </TableCell>
                <TableCell>
                  <Typography>MOrning Shift</Typography>
                </TableCell>
                <TableCell>
                  <Typography>MOrning Shift</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Nov 5 - Nov 10</Typography>
                </TableCell>
                <TableCell>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={TaskStatus[0]}
                    options={TaskStatus}
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </TableCell>
                <TableCell align="center">
                  <Typography noWrap>
                    <Tooltip title="EDIT" arrow>
                      <IconButton>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="DELETE" arrow>
                      <IconButton onClick={handleConfirmDelete} color="error">
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={3} display="flex" justifyContent="center">
          <Pagination
            shape="rounded"
            size="large"
            color="primary"
            count={2}
            page={page + 1}
            defaultPage={0}
          />
        </Box>
      </>

      {/* Add Task */}
      <DialogWrapper
        fullWidth
        maxWidth="md"
        open={openAddTask}
        onClose={closeAddTask}
      >
        <DialogTitle sx={{ p: 3 }}>
          <Typography variant="h4">Add Task</Typography>
        </DialogTitle>
        <Divider />
        <Formik
          enableReinitialize={true}
          initialValues={{
            prefix_id: 1,
            first_name: "",
            people_type: 1,
            email: "",
            phone_number: "",
            laser_code: "",
            nationality_id: 206,
            role_id: [],
            department_uuid: "",
          }}
          onSubmit={async (values) => {}}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            isValid,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                sx={{
                  p: 3,
                }}
              ></DialogContent>
              <DialogActions
                p={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  onClick={closeAddTask}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(!isValid && isSubmitting)}
                  variant="contained"
                  color="success"
                >
                  Add Task
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogWrapper>

      {/* Dialog delete */}
      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6,
            }}
            variant="h3"
          >
            Are you sure you want to permanently delete this task?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDelete}
            >
              Cancel
            </Button>
            <ButtonError
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              Delete
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </Card>
  );
};

export default Task;
