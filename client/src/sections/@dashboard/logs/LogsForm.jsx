import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import { baseURL } from "../../../constants";
import Iconify from "../../../components/iconify";
import allSections from './sections.json';

const LogForm = ({
                    isUpdateForm,
                    isModalOpen,
                    handleCloseModal,
                    log,
                    setLog,
                    handleAddLog,
                    handleUpdateLog
                  }) => {

  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([])

  useEffect(() => {
    if (log && log.grade) {
      const userSections = allSections[log.grade];
      setSections(userSections || []);
    }
  }, [log]);

  const getAllGrades = () => {
    setGrades([1,2,3,4,5,6,7,8,9,10,11,12])
  }

  // Load data on initial page load
  useEffect(() => {
    getAllGrades();
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'white',
    borderRadius: '20px',
    boxShadow: 16,
    p: 4,
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          <Typography variant="h4" textAlign="center" paddingBottom={2} paddingTop={1}>
            {isUpdateForm ? <span>Update</span> : <span>Add</span>} log
          </Typography>
          <Stack
            spacing={3}
            paddingY={2}
            paddingX={3}
            height="600px"
            overflow="scroll"
          >
            
            <Grid container spacing={0} sx={{paddingBottom: "4px"}}>
              <Grid item xs={12} md={6} paddingRight={1}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  type="text"
                  value={log.firstName}
                  required
                  onChange={(e) => setLog({ ...log, firstName: e.target.value })} />
              </Grid>
              <Grid item xs={12} md={6} paddingLeft={1}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={log.lastName}
                  required
                  onChange={(e) => setLog({ ...log, lastName: e.target.value })}
                />
              </Grid>
            </Grid>
            <FormControl sx={{m: 1}}>
              <InputLabel id="author-label">Grade</InputLabel>
              <Select
                required
                labelId="grade-label"
                id="grade"
                value={log.grade}
                label="Grade"
                onChange={(e) => setLog({...log, grade: e.target.value, section: ''})}>
                {
                  grades.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)
                }
              </Select>
            </FormControl>
            {
              sections.length > 0 ? (
                <FormControl sx={{m: 1}}>
                  <InputLabel id="author-label">Section</InputLabel>
                  <Select
                    required
                    labelId="section-label"
                    id="section"
                    value={log.section}
                    label="Section"
                    onChange={(e) => setLog({...log, section: e.target.value})}>
                    {
                      sections.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  name="section"
                  label="Section"
                  value={log.section}
                  required
                  onChange={(e) => setLog({...log, section: e.target.value})}
                />
              )
            }
            <TextField
              name="purpose"
              label="Purpose"
              value={log.purpose}
              multiline
              required
              rows={6}
              maxRows={4}
              onChange={(e) => setLog({...log, purpose: e.target.value})}
            />
            <br/>
            <Box textAlign="center" paddingBottom={2}>
              <Button size="large" variant="contained" onClick={isUpdateForm ? handleUpdateLog : handleAddLog}
                      startIcon={<Iconify icon="bi:check-lg"/>} style={{marginRight: "12px"}}>
                Submit
              </Button>

              <Button size="large" color="inherit" variant="contained" onClick={handleCloseModal}
                      startIcon={<Iconify icon="charm:cross"/>} style={{marginLeft: "12px"}}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Modal>
  );
}

LogForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  log: PropTypes.object,
  setLog: PropTypes.func,
  handleAddLog: PropTypes.func,
  handleUpdateLog: PropTypes.func
};

export default LogForm
