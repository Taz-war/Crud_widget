import React, { Children } from "react";
import { useState, createContext } from "react";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [zohoLoaded, setZohoLoaded] = useState(false);
  const [allData, setAllData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [module, setModule] = useState("");
  const [modalSnackBar, setModalSnackBar] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [value, setValue] = useState("");

  const viewObj = {
    zohoLoaded,
    setZohoLoaded,
    allData,
    setAllData,
    loader,
    setLoader,
    module,
    setModule,
    modalSnackBar,
    setModalSnackBar,
    open,
    setOpen,
    searchItem,
    setSearchItem,
    value,
    setValue,
  };

  return (
    <StateContext.Provider value={viewObj}>
        {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
