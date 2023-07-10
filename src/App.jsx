import "./App.css";
import Table from "./Components/Table";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import TransitionsModal from "./Components/Modal";
import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { StateContext } from "./Context/StateProvider";

const ZOHO = window.ZOHO;

function App() {
  const {
    allData,
    setAllData,
    zohoLoaded,
    setZohoLoaded,
    loader,
    setLoader,
    module,
    open,
  } = useContext(StateContext);

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

  let datas = [];
  datas = allData;
  console.log({ datas });
  return (
    <div className="App">
      <Box margin={"0 auto"} justifyContent={"center"} pt={2}>
        <NavBar />
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
        <Table datas={datas} />
        {zohoLoaded}
        {open && <TransitionsModal datas={datas} />}
      </Box>
    </div>
  );
}

export default App;
