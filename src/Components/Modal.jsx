import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Alert,
  Autocomplete,
  Dialog,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import { useContext } from "react";
import { StateContext } from "../Context/StateProvider";
const ZOHO = window.ZOHO;

export default function TransitionsModal() {

  const {
    open,
    setOpen,
    datas,
    modalSnackBar,
    setModalSnackBar,
  } = useContext(StateContext)
  const { handleSubmit, reset, setValue, control } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState(null);
  const [snackBar, setSnackBar] = useState(false);

  const skills = [
    "Ethical Hacker",
    "jr Developer",
    "sr Developer",
    "zoho Developer",
    "project Manager",
  ];
  const Team = ["Team 1", "Team 2", "Team 3"];
  const Experience = ["1 year", "2 year", "3 year", "1.5 year", "0.5 year"];
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const AddHandle = (d) => {
    let Id = "";
    var recordData = {
      Address: d.Address,
      Email: d.Email,
      Experience: d.Experience,
      Name: d.Name,
      Position: d.Position,
      Team: d.Team,
      BDay: d.BDay,
    };
    ZOHO.CRM.API.insertRecord({
      Entity: "Crud_widget_of_fahim",
      APIData: recordData,
      Trigger: ["workflow"],
    }).then(function (data) {
      // data?.data[0].code === "SUCCESS" ? setSnackBar(true) : setSnackBar(false);
      if (data?.data[0].code === "SUCCESS") {
        Id = data?.data[0].details.id;
        datas.push({
          id: Id,
          Address: d.Address,
          Email: d.Email,
          Experience: d.Experience,
          Name: d.Name,
          Position: d.Position,
          Team: d.Team,
          BDay: d.BDay,
        });
        setOpen(false);
        setModalSnackBar(true);
      } else {
        setModalSnackBar(false);
      }
      console.log(data?.data[0].details.id);
    });
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Dialog onClose={() => setOpen(false)} open={open}>
        <Box
          width={400}
          height={600}
          bgcolor="white"
          p={3}
          pt={1.5}
          pb={3.5}
          borderRadius={5}
        >
          <form
            onSubmit={handleSubmit((data) => AddHandle(data))}
            className="form"
          >
            <Typography variant="h6" color={"grey"} textAlign="center">
              Create Info
            </Typography>

            <section>
              {/* <label>Name</label> */}
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="standard"
                    fullWidth
                    required
                  />
                )}
                name="Name"
                control={control}
              />
            </section>
            <br />
            <section>
              <label>Position</label>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    // {...field}
                    disablePortal
                    id="combo-box-demo"
                    options={skills}
                    value={value}
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                )}
                name="Position"
                control={control}
              />
            </section>
            <br />
            <section>
              <label>Experience</label>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    // {...field}
                    disablePortal
                    id="combo-box-demo"
                    options={Experience}
                    value={value}
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                )}
                name="Experience"
                control={control}
              />
            </section>
            <br />
            <section>
              <label>Team</label>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    // {...field}
                    disablePortal
                    id="combo-box-demo"
                    options={Team}
                    value={value}
                    onChange={(event, item) => {
                      onChange(item);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                )}
                name="Team"
                control={control}
              />
            </section>
            <br />
            <section>
              <label>Birth Date</label>
              <Controller
                name="BDay"
                control={control}
                render={({
                  field: { onChange, value },
                  //   fieldState: { error },
                }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      //   sx={{ width: "100%" }}
                      components={["DatePicker"]}
                    >
                      <DatePicker
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} />}
                        value={value}
                        onChange={(newValue) => {
                          onChange(dayjs(newValue).format("YYYY-MM-DD"));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />
            </section>
            <br />
            <section>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    variant="standard"
                    fullWidth
                  />
                )}
                name="Address"
                control={control}
              />
            </section>
            <br />
            <section>
              {/* <label>Email</label> */}
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="standard"
                    fullWidth
                  />
                )}
                name="Email"
                control={control}
              />
            </section>
            <br />
            <Button
              variant="contained"
              size="xs"
              type="submit"
              fullWidth
              // onClick={() => window.location.reload(false)}
            >
              Add Deal
            </Button>
          </form>
          {/* <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Record is successfully added !
            </Alert>
          </Snackbar> */}
        </Box>
      </Dialog>
    </div>
  );
}
