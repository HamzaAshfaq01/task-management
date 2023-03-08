import React, { useEffect, useState, forwardRef } from "react";
import {
  Box,
  Typography,
  Button,
  styled,
  Card,
  Tabs,
  Tab,
  Avatar,
  Grid,
  DialogTitle,
  Autocomplete,
  TextField,
  Slide,
  DialogContent,
  Divider,
  CircularProgress,
  Dialog,
  Pagination,
  Stack,
  Backdrop,
} from "@mui/material";
import TaskTable from "../components/TaskTable";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { th } from "date-fns/locale";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
  ValidateDescription,
  ValidateDueDate,
  ValidateTitle,
} from "../Validations/Task.validation";
import { createTask } from "../redux/actions/task.action";
import {
  getUserTasks,
  deleteTaskByID,
  updateTask,
} from "../redux/actions/task.action";
import BackDrop from "../components/Backdrop";
import { decryptData } from "../utils/crypto.util";

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

const Tasks = () => {
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("ALL");
  const [taskID, setTaskID] = useState(null);
  const [selectedTask, setSelectedTask] = useState(false);

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
    dispatch(getUserTasks(limit, String((page + 1 - 1) * limit), value));
  };
  const isLoading = useSelector((state) => state.loading.loader);
  const tasks = useSelector((state) => state.task.tasks);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };
  const closeAddTask = () => {
    setOpenAddTask(false);
  };
  const closeEditTask = () => {
    setOpenConfirmEdit(false);
  };

  const [value, setValue] = useState(new Date());
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value, "YYYY-MM-DD");

  const handleChangeDate = (newValue) => {
    setValue(newValue);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(newValue, "YYYY-MM-DD");
    formik.setFieldValue("due_date", formattedDate);
  };

  const editChangeDate = (newValue) => {
    setValue(newValue);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(newValue, "YYYY-MM-DD");
    editFormik.setFieldValue("due_date", formattedDate);
  };

  const validate_title = ValidateTitle();
  const validate_description = ValidateDescription();
  const validate_due_date = ValidateDueDate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      due_date: "",
      priority: "",
    },
    validationSchema: Yup.object({
      ...validate_title,
      ...validate_description,
      ...validate_due_date,
    }),
    onSubmit: async (values) => {
      dispatch(createTask(values, closeAddTask)).then(() => {
        dispatch(
          getUserTasks(limit, String((page + 1 - 1) * limit)),
          currentTab
        );
      });
    },
  });

  useEffect(() => {
    if (selectedTask) {
      editFormik.setFieldValue("title", decryptData(selectedTask.title));
      editFormik.setFieldValue(
        "description",
        decryptData(selectedTask.description)
      );
      editFormik.setFieldValue("due_date", dayjs(selectedTask.due_date));
    }
  }, [selectedTask]);

  const editFormik = useFormik({
    initialValues: {
      title: "",
      description: "",
      due_date: "",
    },
    onSubmit: async (values, helpers) => {
      dispatch(updateTask(selectedTask._id, values, closeEditTask)).then(() => {
        dispatch(
          getUserTasks(limit, String((page + 1 - 1) * limit)),
          currentTab
        );
      });
    },
  });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const handlePageChange = (_event, newPage) => {
    setPage(newPage - 1);
    dispatch(
      getUserTasks(
        String(limit),
        String(limit * (newPage - 1) + 1 - 1),
        currentTab
      )
    );
  };

  useEffect(() => {
    dispatch(getUserTasks(limit, String((page + 1 - 1) * limit)), currentTab);
  }, []);

  const handleDeleteTask = () => {
    dispatch(deleteTaskByID(taskID, closeConfirmDelete)).then(() => {
      dispatch(getUserTasks(limit, String((page + 1 - 1) * limit)), currentTab);
    });
  };
  const handlePriority = (taskID, priority) => {
    dispatch(updateTask(taskID, { priority })).then(() => {
      dispatch(getUserTasks(limit, String((page + 1 - 1) * limit)), currentTab);
    });
  };
  const handleStatus = (taskID, status) => {
    dispatch(updateTask(taskID, { status })).then(() => {
      dispatch(getUserTasks(limit, String((page + 1 - 1) * limit)), currentTab);
    });
  };

  return (
    <>
      {BackDrop(isLoading)}
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
            <Card>
              <TaskTable
                setOpenAddTask={setOpenAddTask}
                setOpenConfirmEdit={setOpenConfirmEdit}
                setOpenConfirmDelete={setOpenConfirmDelete}
                setSelectedTask={setSelectedTask}
                currentTab={currentTab}
                setTaskID={setTaskID}
                handlePriority={handlePriority}
                handleStatus={handleStatus}
              />

              <Box p={3} display="flex" justifyContent="center">
                <Pagination
                  shape="rounded"
                  size="large"
                  color="primary"
                  onChange={handlePageChange}
                  count={tasks?.pagination?.pages}
                  page={page + 1}
                  defaultPage={0}
                />
              </Box>

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
                <form noValidate onSubmit={formik.handleSubmit}>
                  <DialogContent
                    sx={{
                      p: 3,
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.title && formik.errors.title
                              )}
                              fullWidth
                              margin="normal"
                              helperText={
                                formik.touched.title && formik.errors.title
                              }
                              name="title"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              value={formik.values.title}
                              variant="outlined"
                              placeholder="Title"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                formik.touched.description &&
                                  formik.errors.description
                              )}
                              fullWidth
                              margin="normal"
                              helperText={
                                formik.touched.description &&
                                formik.errors.description
                              }
                              name="description"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              type="text"
                              value={formik.values.description}
                              variant="outlined"
                              placeholder="Description"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <LocalizationProvider
                              locale={th}
                              dateAdapter={AdapterDayjs}
                            >
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Due Date"
                                  inputFormat="MM/DD/YYYY"
                                  onChange={handleChangeDate}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </Stack>
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={PeriorityStatus}
                              getOptionLabel={(option) =>
                                option.label ?? option
                              }
                              isOptionEqualToValue={(option, value) =>
                                option.label === value.label
                              }
                              value={PeriorityStatus[0]}
                              onChange={(_e, { value }) => {
                                formik.setFieldValue("priority", value);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  fullWidth
                                  {...params}
                                  label="Priority"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
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
                        isLoading ? <CircularProgress size="1rem" /> : null
                      }
                      disabled={Boolean(!formik.isValid && formik.isSubmitting)}
                      variant="contained"
                      color="success"
                    >
                      Add Task
                    </Button>
                  </DialogActions>
                </form>
              </DialogWrapper>

              {/* Edit Task */}
              <DialogWrapper
                fullWidth
                maxWidth="md"
                open={openConfirmEdit}
                onClose={closeEditTask}
              >
                <DialogTitle sx={{ p: 3 }}>
                  <Typography variant="h4">Edit Task</Typography>
                </DialogTitle>
                <Divider />
                <form noValidate onSubmit={editFormik.handleSubmit}>
                  <DialogContent
                    sx={{
                      p: 3,
                    }}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                editFormik.touched.title &&
                                  editFormik.errors.title
                              )}
                              fullWidth
                              margin="normal"
                              helperText={
                                editFormik.touched.title &&
                                editFormik.errors.title
                              }
                              name="title"
                              onBlur={editFormik.handleBlur}
                              onChange={editFormik.handleChange}
                              type="text"
                              value={editFormik.values.title}
                              variant="outlined"
                              placeholder="Title"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              error={Boolean(
                                editFormik.touched.description &&
                                  editFormik.errors.description
                              )}
                              fullWidth
                              margin="normal"
                              helperText={
                                editFormik.touched.description &&
                                editFormik.errors.description
                              }
                              name="description"
                              onBlur={editFormik.handleBlur}
                              onChange={editFormik.handleChange}
                              type="text"
                              value={editFormik.values.description}
                              variant="outlined"
                              placeholder="Description"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <LocalizationProvider
                              locale={th}
                              dateAdapter={AdapterDayjs}
                            >
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="Due Date"
                                  value={dayjs(editFormik.values.due_date)}
                                  inputFormat="MM/DD/YYYY"
                                  onChange={editChangeDate}
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                />
                              </Stack>
                            </LocalizationProvider>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Button
                      onClick={closeEditTask}
                      variant="contained"
                      color="error"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      startIcon={
                        isLoading ? <CircularProgress size="1rem" /> : null
                      }
                      // disabled={Boolean(
                      //   !editFormik.isValid && editFormik.isSubmitting
                      // )}
                      variant="contained"
                      color="success"
                    >
                      Edit Task
                    </Button>
                  </DialogActions>
                </form>
              </DialogWrapper>

              {/* Dialog delete */}
              <DialogWrapper
                open={openConfirmDelete}
                maxWidth="sm"
                fullWidth
                // TransitionComponent={Transition}
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
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </ButtonError>
                  </Box>
                </Box>
              </DialogWrapper>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Tasks;
