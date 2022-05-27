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
    },
  ]);
  const [database, setDatabase] = useState([
    {
      header: [],
      rows: [],
      name: "",
    },
  ]);
  const [currentDatabase, setCurrentDatabase] = useState({});
  const [currentQuery, setCurrentQuery] = useState({});
  const [applyFilter, setApplyFilter] = useState(false);
  const [filters, setFilters] = useState({});
  const [run, setRun] = useState(false);
  const navigate = useNavigate();

  const addQuery = () => {
    const temp = {
      title: "Query",
      id: uuidV4().toString().replace(/-/g, ""),
      query: "",
    };
    navigate(`/${temp.id}`);
    setQueryArray([...queryArray, temp]);
  };

  useEffect(() => {
    setRun(false);
  }, [currentDatabase.name, queryArray.length]);

  return (
    <div className="mainContainer">
      <div className="mainContainerDBBox">
        <DBContainer
          setDatabase={setDatabase}
          database={database}
          setCurrentDatabase={setCurrentDatabase}
          currentDatabase={currentDatabase}
        />
        {run && currentDatabase.name !== undefined && (
          <FilterContainer
            currentDatabase={currentDatabase}
            setFilters={setFilters}
            filters={filters}
            setApplyFilter={setApplyFilter}
            applyFilter={applyFilter}
          />
        )}
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
          <div className="queryTabRunBtn" onClick={() => setRun(true)}>
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
          data={currentDatabase}
          run={run}
          currentQuery={currentQuery}
          applyFilter={applyFilter}
          filters={filters}
        />
      </div>
    </div>
  );
}

export default MainContainer;
