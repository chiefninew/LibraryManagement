import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Alert } from "@mui/lab";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import Label from "../../../components/label";
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

import LogsListHead from "./LogsListHead";
import LogsForm from "./LogsForm";
import LogsDialog from "./LogsDialog";
import { applySortFilter, getComparator } from "../../../utils/tableOperations";
import { apiUrl, methods, routes } from "../../../constants";

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: "date", label: "DATE", alignRight: false },
  { id: "name", label: "NAME", alignRight: false },
  { id: "grade", label: "GRADE", alignRight: false },
  { id: "section", label: "SECTION", alignRight: false },
  { id: "purpose", label: "PURPOSE", alignRight: false },
  { id: "timeIn", label: "TIME-IN", alignRight: false },
  { id: "timeOut", label: "TIME-OUT", alignRight: false },
  { id: "", label: "", alignRight: true }, { id: "", label: "", alignRight: false }];


// ----------------------------------------------------------------------

const LogsPage = () => {
  const {user} = useAuth();
  // State variables
  // Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Data
  const [log, setLog] = useState({
    date: "",
    name: "",
    grade: "",
    section: "",
    purpose: "",
    timeIn: "",
    timeOut: ""
  })
  const [logs, setLogs] = useState([]);
  const [selectedLogId, setSelectedLogId] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)

  // Load data on initial page load
  useEffect(() => {
    getAllLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API operations=

  const getAllLogs = () => {
    axios.get(apiUrl(routes.LOGS, methods.GET_ALL))
      .then((response) => {
        // handle success
        console.log(response.data)
        setLogs(response.data.logsList)
        setIsTableLoading(false)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const addLog = () => {
    axios.post(apiUrl(routes.LOGS, methods.POST), {
      ...log,
      date: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }),
      timeIn: new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
    })
      .then((response) => {
        toast.success("Log added");
        console.log(response.data);
        handleCloseModal();
        getAllLogs();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const updateLog = () => {
    axios.put(apiUrl(routes.LOGS, methods.PUT, selectedLogId), log)
      .then((response) => {
        toast.success("Log updated");
        console.log(response.data);
        handleCloseModal();
        handleCloseMenu();
        getAllLogs();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const timeOut = (log) => {
    axios.put(apiUrl(routes.LOGS, methods.PUT, log._id), log)
      .then((response) => {
        toast.success("Log updated");
        console.log(response.data);
        handleCloseModal();
        handleCloseMenu();
        getAllLogs();
        clearForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const deleteLog = () => {
    axios.delete(apiUrl(routes.LOGS, methods.DELETE, selectedLogId))
      .then((response) => {
        toast.success("Log deleted");
        handleCloseDialog();
        handleCloseMenu();
        console.log(response.data);
        getAllLogs();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong, please try again")
      });
  }

  const getSelectedLogDetails = () => {
    const selectedLogs = logs.find((element) => element._id === selectedLogId)
    setLog(selectedLogs)
  }

  const clearForm = () => {
    setLog({
      date: "",
      name: "",
      grade: "",
      section: "",
      purpose: "",
      timeIn: "",
      timeOut: ""
    })
  }

  // Handler functions
  const handleOpenMenu = (event) => {
    setIsMenuOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  // Table functions

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setLog(applySortFilter(log, getComparator(order, orderBy), filterName));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (<>
    <Helmet>
      <title>Logs</title>
    </Helmet>

    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3" gutterBottom>
          Logs
        </Typography>
        <Button variant="contained" onClick={() => {
          setIsUpdateForm(false);
          handleOpenModal();
        }} startIcon={<Iconify icon="eva:plus-fill"/>}>
          New Log
        </Button>
      </Stack>
      {isTableLoading ? <Grid style={{"textAlign": "center"}}><CircularProgress size="lg"/></Grid> : <Card>
        <Scrollbar>
          {logs.length > 0 ? <TableContainer sx={{minWidth: 800}}>
            <Table>
              <LogsListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={log.length}
                onRequestSort={handleRequestSort}
              /><TableBody>
              {logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log) => <TableRow hover key={log._id} tabIndex={-1}>
                  <TableCell align="left"> {(new Date(log.date)).toLocaleDateString("en-US")}  </TableCell>
                  <TableCell align="left">{log.name}</TableCell>
                  <TableCell align="left">{log.grade}</TableCell>
                  <TableCell align="left">{log.section}</TableCell>
                  <TableCell align="left">{log.purpose}</TableCell>
                  <TableCell align="left">
                    {log.timeIn ? new Date(log.timeIn).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Manila"
                    }) : ""}
                  </TableCell>
                  <TableCell align="left">
                    {log.timeOut ? new Date(log.timeOut).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Manila"
                    }) : (
                      <Button variant="contained" color="error" onClick={() => {
                        timeOut({
                          ...log,
                          timeOut: new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
                        });
                      }}>
                        Mark Out
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="large" color="inherit" onClick={(e) => {
                      setSelectedLogId(log._id)
                      handleOpenMenu(e)
                    }}>
                      <Iconify icon={'eva:more-vertical-fill'}/>
                    </IconButton>
                  </TableCell>
                </TableRow>)}
            </TableBody></Table>
          </TableContainer> : <Alert severity="warning" color="warning">
            No logs found
          </Alert>}
        </Scrollbar>
        {logs.length > 0 && <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={logs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
      </Card>}
    </Container>
    <Popover
      open={Boolean(isMenuOpen)}
      anchorEl={isMenuOpen}
      onClose={handleCloseMenu}
      anchorOrigin={{vertical: 'top', horizontal: 'left'}}
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      PaperProps={{
        sx: {
          p: 1, width: 140, '& .MuiMenuItem-root': {
            px: 1, typography: 'body2', borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={() => {
        setIsUpdateForm(true);
        getSelectedLogDetails();
        handleCloseMenu();
        handleOpenModal();
      }}>
        <Iconify icon={'eva:edit-fill'} sx={{mr: 2}}/>
        Edit
      </MenuItem>
      <MenuItem sx={{color: 'error.main'}} onClick={handleOpenDialog}>
        <Iconify icon={'eva:trash-2-outline'} sx={{mr: 2}}/>
        Delete
      </MenuItem>
    </Popover>
    <LogsForm
      isUpdateForm={isUpdateForm}
      isModalOpen={isModalOpen}
      handleCloseModal={handleCloseModal}
      id={selectedLogId}
      log={log}
      setLog={setLog}
      handleAddLog={addLog}
      handleUpdateLog={updateLog}
    />
    <LogsDialog
      isDialogOpen={isDialogOpen}
      logId={selectedLogId}
      handleDeleteLog={deleteLog}
      handleCloseDialog={handleCloseDialog}
    />
  </>);
}

export default LogsPage
