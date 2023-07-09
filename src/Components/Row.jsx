import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Alert,
  Autocomplete,
  Button,
  Collapse,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ZOHO = window.ZOHO;

const Row = (props) => {
  const {
    number,
    row,
    isItemSelected,
    labelId,
    selected,
    setSelected,
    setRecordId,
    columns,
    key,
    datas,
  } = props;
  // const [surName, setSurName] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState(null);
  const [team1, setTeam1] = useState(null);
  const [email, setEmail] = useState("");
  const skills = [
    "Ethical Hacker",
    "jr Developer",
    "sr Developer",
    "zoho Developer",
    "project Manager",
  ];
  const Team = ["Team 1", "Team 2", "Team 3"];
  const Experience = ["1 year", "2 year", "3 year", "1.5 year", "0.5 year"];
  const [open, setOpen] = useState(false);
  const [date1, setDate1] = useState(null);
  const [message, setMessage] = useState(true);
  const [snackBar, setSnackBar] = useState(false);

  const Addhandle = ({
    name,
    position,
    team,
    date,
    email,
    id,
    index,
    setSelected,
  }) => {
    var config = {
      Entity: "Crud_widget_of_fahim",
      APIData: {
        id: id,
        Team: team,
        Email: email,
        Name: name,
        Position: position,
        BDay: dayjs(date).format("YYYY-MM-DD"),
      },
      Trigger: ["workflow"],
    };
    ZOHO.CRM.API.updateRecord(config).then(function (data) {
      console.log(data);
      let Id = "";
      // data?.data[0].code === "SUCCESS" ? setSnackBar(true) : setSnackBar(false);
      if (data?.data[0].code === "SUCCESS") {
        Id = data?.data[0].details.id;
        datas[index] = {
          id: Id,
          Team: team,
          Email: email,
          Name: name,
          Position: position,
          BDay: dayjs(date).format("YYYY-MM-DD"),
        };

        setSelected([]);
        setSnackBar(true);
        setOpen(false);
      } else {
        setSnackBar(false);
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const emailValidation = (e) => {
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    var emailValue = e.target.value;
    setEmail(emailValue);
    if (email.match(pattern)) {
      setMessage(true);
    } else {
      setMessage(false);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // const [openRow,setOpenRow] =useState(false)
  return (
    <>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.Name)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={number}
        selected={isItemSelected}
        sx={{ cursor: "pointer" }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            onClick={(e) => setRecordId((prev) => [...prev, props.recordId])}
          />
        </TableCell>
        {columns.map((col) => (
          <>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {col.field === "Created_Time"
                ? dayjs(row[col?.field]).format("YYYY-MM-DD")
                : col.field === "Modified_Time"
                ? dayjs(row[col?.field]).format("YYYY-MM-DD")
                : row[col?.field]}
            </TableCell>
          </>
        ))}

        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow style={{ backgroundColor: "#F8F4FD" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="outlined-size-small"
                        size="medium"
                        label="Name"
                        defaultValue={row.Name || ""}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </TableCell>

                    <TableCell>
                      <Autocomplete
                        id="grouped-demo"
                        options={skills}
                        // size="medium"
                        sx={{ width: "210px", height: "56px" }}
                        // value={position}
                        defaultValue={row.Position || ""}
                        onChange={(event, newValue) => setPosition(newValue)}
                        renderInput={(params) => (
                          <TextField {...params} label="Position" />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        id="grouped-demo"
                        sx={{ width: "210px", height: "56px" }}
                        // size="small"
                        options={Team}
                        // value={team1}
                        defaultValue={row.Team || ""}
                        onChange={(event, newValue) => setTeam1(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={Team.filter((item) => {
                              return item === row.Team;
                            })}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          sx={{ width: "210px" }}
                          components={["DatePicker"]}
                        >
                          <DatePicker
                            label={row.BDay}
                            renderInput={(params) => <TextField {...params} />}
                            value={date1}
                            defaultValue={row.BDay || ""}
                            onChange={(newValue) => {
                              setDate1(newValue);
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-size-small"
                        size="medium"
                        label="Email"
                        // value={row.Email || ''}
                        defaultValue={row.Email || ""}
                        type="email"
                        color={message === true ? "primary" : "error"}
                        onChange={(e) => emailValidation(e)}
                      />
                    </TableCell>
                    <TableCell>
                      {message === true ? (
                        <Button
                          variant="contained"
                          sx={{ width: "160px", height: "45px" }}
                          onClick={() => {
                            Addhandle({
                              name: name || row.Name,
                              position: position || row.Position,
                              team: team1 || row.Team,
                              date: date1 || row.BDay,
                              email: email || row.Email,
                              id: props.recordId,
                              index: number,
                              setSelected: setSelected,
                            });
                            setOpen(false);
                            // window.location.reload(false);
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="contained"
                          sx={{ width: "160px", height: "45px" }}
                          onClick={() =>
                            Addhandle({
                              name: name || row.Name,
                              position: position || row.Position,
                              team: team1 || row.Team,
                              date: date1 || row.BDay,
                              email: email || row.Email,
                              id: props.recordId,
                              index: key,
                              setSelected: setSelected,
                            })
                          }
                        >
                          Save
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell>
                      <TextField
                        id="outlined-size-small"
                        size="medium"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        id="grouped-demo"
                        options={Experience}
                        value={experience}
                        onChange={(event, newValue) => setExperience(newValue)}
                        // size="small"
                        sx={{ width: "210px", height: "56px" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Experience" />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Autocomplete
                        id="grouped-demo"
                        options={Team}
                        value={team2}
                        onChange={(event, newValue) => setTeam2(newValue)}
                        // size="small"
                        sx={{ width: "210px", height: "56px" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Team"
                            // onChange={(e) => setTeam2(e.target.value)}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          sx={{ width: "210px", p: "0px" }}
                          components={["DatePicker"]}
                        >
                          <DatePicker
                            label="BDay"
                            renderInput={(params) => <TextField {...params} />}
                            value={date2}
                            onChange={(newValue) => {
                              setDate2(newValue);
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-size-small"
                        size="medium"
                        label="Address"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      {message === true ? (
                        <Button
                          variant="contained"
                          sx={{ width: "160px", height: "45px" }}
                          onClick={() => {
                            Addhandle(
                              surName,
                              name,
                              position,
                              team1,
                              team2,
                              date1,
                              date2,
                              email,
                              address,
                              experience,
                              id
                            );
                            setOpen(false);
                            window.location.reload(false);
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="contained"
                          sx={{ width: "160px", height: "45px" }}
                          onClick={() =>
                            Addhandle(
                              surName,
                              name,
                              position,
                              team1,
                              team2,
                              date1,
                              date2,
                              email,
                              address,
                              experience,
                              id
                            )
                          }
                        >
                          Save
                        </Button>
                      )}
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Record is successfully updated !
        </Alert>
      </Snackbar>
    </>
  );
};

export default Row;
