import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import Row from "./Row";

const ZOHO = window.ZOHO;

const deleteHandle = (d, datas, setSelected) => {
  ZOHO.CRM.API.deleteRecord({
    Entity: "Crud_widget_of_fahim",
    RecordID: d,
  }).then( (data)=> {
    if (data?.data[0].code === "SUCCESS") {
      d.map((obj,index)=>{
        const i = datas.findIndex((item)=>item.id===d[index])
        datas.splice(i,1)
        setSelected([])
        console.log(i)
      })
    }
  });
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 1,
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: 2,
    numeric: false,
    disablePadding: false,
    label: "Position",
  },
  {
    id: 3,
    numeric: false,
    disablePadding: false,
    label: "Team",
  },
  {
    id: 4,
    numeric: false,
    disablePadding: false,
    label: "BDay",
  },
  {
    id: 5,
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    setOpen,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontSize: "large" }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" sx={{ fontSize: "large" }}>
          <Button
            variant="contained"
            startIcon={<AddCardOutlinedIcon color="white" />}
            onClick={() => setOpen(true)}
          >
            Add Record
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, recordId, datas, setSelected } = props;

  return (
    <Toolbar
      sx={{
        textAlign: "left",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="blue"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              deleteHandle(recordId, datas, setSelected);
              // window.location.reload(false);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({
  setOpen,
  searchItem,
  module,
  datas,
  modalSnackBar,
  setModalSnackBar,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [recordId, setRecordId] = useState([]);

  let columns = [
    { field: "Name" },
    { field: "Position" },
    { field: "Team" },
    { field: "BDay" },
    { field: "Email" },
  ];

  if (module === "Leads") {
    columns = [
      { field: "Last_Name" },
      { field: "Phone" },
      { field: "Mobile" },
      { field: "Lead_Status" },
      { field: "Email" },
    ];
    headCells[0].label = "Lead Owner";
    headCells[1].label = "Phone";
    headCells[2].label = "Mobile";
    headCells[3].label = "Lead Status";
    headCells[4].label = "Email";
  } else if (module === "Crud_widget_of_fahim") {
    columns = [
      { field: "Name" },
      { field: "Position" },
      { field: "Team" },
      { field: "BDay" },
      { field: "Email" },
    ];
    headCells[0].label = "Name";
    headCells[1].label = "Position";
    headCells[2].label = "Team";
    headCells[3].label = "BDay";
    headCells[4].label = "Email";
  } else if (module === "Deals") {
    columns = [
      { field: "Deal_Name" },
      { field: "Amount" },
      { field: "Stage" },
      { field: "Modified_Time" },
      { field: "Closing_Date" },
    ];
    headCells[0].label = "Deal Name";
    headCells[1].label = "Amount";
    headCells[2].label = "Stage";
    headCells[3].label = "Modified Date";
    headCells[4].label = "Closing date";
  } else if (module === "Accounts") {
    columns = [
      { field: "Account_Name" },
      { field: "Created_Time" },
      { field: "Currency" },
      { field: "country" },
      { field: "Modified_Time" },
    ];
    headCells[0].label = "Aoccunts Name";
    headCells[1].label = "Created Time";
    headCells[2].label = "Currency";
    headCells[3].label = "country";
    headCells[4].label = "Modified Time";
  } else if (module === "Contacts") {
    columns = [
      { field: "Name" },
      { field: "Account_Name" },
      { field: "Currency" },
      { field: "Owner.name" },
      { field: "Email" },
    ];
    headCells[0].label = "Full Name";
    headCells[1].label = "Aoccunts Name";
    headCells[2].label = "Currency";
    headCells[3].label = "Contact Owner";
    headCells[4].label = "Email";
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = datas.map((n) => n.Name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  ///////////////pagination/////////////
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setModalSnackBar(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
      <EnhancedTableToolbar
        numSelected={selected.length}
        recordId={recordId}
        datas={datas}
        setSelected={setSelected}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={datas.length}
            setOpen={setOpen}
            columns={columns}
          />

          <TableBody>
            {datas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((item) => {
                return searchItem.toLowerCase() === ""
                  ? item
                  : Object.values(item).some((data) => {
                      return typeof data === "string"
                        ? data.toLowerCase().includes(searchItem)
                        : false;
                    });
              })
              .map((row, index) => {
                const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <Row
                    key={index}
                    number={index}
                    row={row}
                    isItemSelected={isItemSelected}
                    labelId={labelId}
                    selected={selected}
                    setSelected={setSelected}
                    recordId={row.id}
                    setRecordId={setRecordId}
                    columns={columns}
                    datas={datas}
                  />
                );
              })}

            {emptyRows > 0 && (
              <TableRow
                style={{
                  // height: (dense ? 33 : 53) * emptyRows,
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={datas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Snackbar
        open={modalSnackBar}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Record is successfully added !
        </Alert>
      </Snackbar>
      {/* </Paper> */}
    </Box>
  );
}
