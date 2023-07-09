import { Autocomplete, Box, IconButton, Stack, TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import React from "react";
import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
// import "./nav.css";

const NavBar = ({ searchItem, setSearchItem, value, setValue, setModule }) => {
  const [items, setItems] = useState([
    "Deals",
    "Leads",
    "Accounts",
    "Contacts",
    "Crud_widget_of_fahim",
  ]);
  const [open, setOpen] = useState(4);
  const [inputField, setInputField] = useState("");

  // const items = ["Deals",'Leads','Contacts','Account']

  const handleChange = (data) => {
    setSearchItem(data);
    setInputField(data);
  };
  const handleTab = () => {
    // setItems([...items, searchItem]);
    setInputField("");
  };
  const handleClick = (data) => {
    // setOpen(!open);
    setModule(data);
  };

  // const handleDelete = (data) => {
  //   setItems((chips) => chips.filter((chip) => chip !== data));
  //   // items.filter((chip) => chip !== data)
  //   console.log(items)
  // };

  return (
    <Stack direction={"row"} justifyContent={"space-around"}>
      <Box
        width={"68%"}
        textAlign={"left"}
        borderRadius={20}
        sx={{ backgroundColor: "#F3f3f3" }}
        m={"10px"}
        height={"37px"}
      >
        {items.map((item, index) => (
          <Chip
            label={item}
            color={item === items[open] ? "primary" : "default"}
            onClick={() => {
              handleClick(item);
              setOpen(index);
            }}
            // onDelete={() => handleDelete(item)}
            style={{ marginBottom: "10px", margin: "3px" }}
          />
        ))}
      </Box>

      <TextField
        sx={{
          borderRadius: 20,
          width: "30%",
          marginTop: "10px",
          marginRight: "10px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px ",
            height: "37px ",
            backgroundColor: "#F3f3f3 ",
          },
        }}
        label="Search..."
        size="small"
        id="fullWidth"
        value={inputField}
        onChange={(e) => handleChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => handleTab()} size="small">
              <SearchOutlined fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </Stack>
  );
};

export default NavBar;
const option = ["Name", "Email", "Position", "BDay", "Team"];
