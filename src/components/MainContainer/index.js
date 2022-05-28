import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import DBContainer from "../DBContainer";
import FilterContainer from "../FilterContainer";
import QueryBox from "../QueryBox";
import QueryTabContainer from "../QueryTabContainer";
import TableContainer from "../TableContainer";
import "./mainContainer.css";

function MainContainer({ uid }) {
  const [queryArray, setQueryArray] = useState([
    {
      title: "Query",
      id: uid,
      query: "",
      run: false,
      currentDatabase: {
        header: [],
        rows: [],
        name: "",
      },
      filters: {},
      applyFilter: false,
    },
  ]);
  const [database, setDatabase] = useState([
    {
      header: [],
      rows: [],
      name: "",
    },
  ]);
  const [currentQuery, setCurrentQuery] = useState({});
  const navigate = useNavigate();

  const addQuery = () => {
    const temp = {
      title: "Query",
      id: uuidV4().toString().replace(/-/g, ""),
      query: "",
      run: false,
      currentDatabase: {
        header: [],
        rows: [],
        name: "",
      },
      filters: {},
      applyFilter: false,
    };
    navigate(`/${temp.id}`);
    setQueryArray([...queryArray, temp]);
  };

  const handleRunChange = () => {
    setCurrentQuery({ ...currentQuery, run: true });
    let arr = [...queryArray];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === currentQuery.id) {
        arr[i] = {
          ...arr[i],
          run: true,
        };
        break;
      }
    }
    setQueryArray([...arr]);
  };

  useEffect(() => {
    navigate(`/${uid}`);
  }, [uid]);

  // useEffect(() => {
  //   setRun(false);
  // }, [queryArray.length]);

  return (
    <div className="mainContainer">
      <div className="mainContainerDBBox">
        <DBContainer
          setDatabase={setDatabase}
          database={database}
          setCurrentQuery={setCurrentQuery}
          currentQuery={currentQuery}
          setQueryArray={setQueryArray}
          queryArray={queryArray}
        />
        {!currentQuery.run ||
          (currentQuery.currentDatabase.name !== "" && (
            <FilterContainer
              currentDatabase={currentQuery.currentDatabase}
              setQueryArray={setQueryArray}
              queryArray={queryArray}
              setCurrentQuery={setCurrentQuery}
              currentQuery={currentQuery}
            />
          ))}
      </div>
      <div className="mainContainerQueryBox">
        <div className="mainContainerTabBox">
          <QueryTabContainer
            setQueryArray={setQueryArray}
            queryArray={queryArray}
          />
          <div className="queryTabAddBtn" onClick={() => addQuery()}>
            <p className="queryTabPlus">+</p>
          </div>
          <div className="queryTabRunBtn" onClick={() => handleRunChange()}>
            <p className="queryTabRun">RUN</p>
          </div>
        </div>
        <QueryBox
          queryArray={queryArray}
          setQueryArray={setQueryArray}
          currentQuery={currentQuery}
          setCurrentQuery={setCurrentQuery}
        />
        <TableContainer
          data={currentQuery.currentDatabase}
          run={currentQuery.run}
          currentQuery={currentQuery}
          applyFilter={currentQuery.applyFilter}
          filters={currentQuery.filters}
        />
      </div>
    </div>
  );
}

export default MainContainer;
