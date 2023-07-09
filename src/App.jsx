import logo from "./logo.svg";
import "./App.css";
import Table from "./Components/Table";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import TransitionsModal from "./Components/Modal";
import { Box, CircularProgress } from "@mui/material";

const ZOHO = window.ZOHO;

function App() {
  const [zohoLoaded, setZohoLoaded] = useState(false);
  const [allData, setAllData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [module, setModule] = useState("");
  const [modalSnackBar, setModalSnackBar] = useState(false);

  useEffect(() => {
    ZOHO.embeddedApp.on("PageLoad", function (data) {
      console.log(data);
      //Custom Bussiness logic goes here
    });

    /*
     * initializing the widget.
     */
    ZOHO.embeddedApp.init().then(() => setZohoLoaded(true));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      if (zohoLoaded) {
        await ZOHO.CRM.API.getAllRecords({
          Entity: module || "Crud_widget_of_fahim",
          sort_order: "asc",
          per_page: 200,
          page: 1,
        }).then(function (data) {
          setAllData(data.data);
          setLoader(false);
        });
      }
    };

    fetchData();
  }, [module, zohoLoaded]);
  // console.log(allData);
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [value, setValue] = useState("");
  let datas = [];
  datas = allData;
  console.log({ datas });
  return (
    <div className="App">
      <Box margin={"0 auto"} justifyContent={"center"} pt={2}>
        <NavBar
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          value={value}
          setValue={setValue}
          setModule={setModule}
        />
        {loader && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Table
          setLoader={setLoader}
          allData={allData}
          datas={datas}
          setOpen={setOpen}
          searchItem={searchItem}
          value={value}
          setZohoLoaded={setZohoLoaded}
          zohoLoaded={zohoLoaded}
          module={module}
          modalSnackBar={modalSnackBar}
          setModalSnackBar={setModalSnackBar}
        />
        {zohoLoaded}
        {open && (
          <TransitionsModal
            open={open}
            setOpen={setOpen}
            datas={datas}
            modalSnackBar={modalSnackBar}
            setModalSnackBar={setModalSnackBar}
          />
        )}
      </Box>
    </div>
  );
}

export default App;
