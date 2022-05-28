import React, { useState,useEffect } from "react";
import "./filter.css";

function FilterContainer({
  currentDatabase,
  setCurrentQuery,
  currentQuery,
  queryArray,
  setQueryArray,
}) {
  const op = ["=", "!=", "<", ">"];
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters(currentQuery.filters);
  }, [currentQuery.filters]);
  const handleApplyFilter = () => {
    console.log("main", queryArray);
    if (currentQuery?.applyFilter) {
      setCurrentQuery({
        ...currentQuery,
        applyFilter: false,
        filters: {},
      });
      let arr = [...queryArray];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === currentQuery.id) {
          arr[i] = {
            ...arr[i],
            applyFilter: false,
            filters: {},
          };
          break;
        }
      }
      setQueryArray([...arr]);
    } else {
      setCurrentQuery({
        ...currentQuery,
        filters: filters,
        applyFilter: true,
      });
      let arr = [...queryArray];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === currentQuery.id) {
          arr[i] = {
            ...arr[i],
            filters: filters,
            applyFilter: true,
          };
          break;
        }
      }
      setQueryArray([...arr]);
    }
  };
  return (
    <div className="filterContainer">
      <p className="filterHeader">Filter</p>
      <select
        className="filterSelect"
        disabled={currentQuery.applyFilter}
        value={filters.head ?? ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            head: e.target.value,
          })
        }
      >
        {" "}
        <option value="" selected disabled hidden>
          Select column
        </option>
        {currentDatabase?.header?.map((head, index) => (
          <option value={head}>{head}</option>
        ))}
      </select>
      <select
        disabled={currentQuery.applyFilter}
        value={filters.op ?? ""}
        className="filterSelect"
        onChange={(e) =>
          setFilters({
            ...filters,
            op: e.target.value,
          })
        }
      >
        <option value="" selected disabled hidden>
          Select operator
        </option>
        {op?.map((head) => (
          <option value={head}>{head}</option>
        ))}
      </select>
      <input
        value={filters.text ?? ""}
        placeholder="Enter text..."
        type="text"
        className="filterInput"
        disabled={currentQuery.applyFilter}
        onChange={(e) =>
          setFilters({
            ...filters,
            text: e.target.value,
          })
        }
      />
      {filters.text == undefined ||
        filters.op == undefined ||
        (filters.head == undefined ? (
          ""
        ) : (
          <p className="filterSubmit" onClick={() => handleApplyFilter()}>
            {currentQuery.applyFilter ? "Remove" : "Apply"}
          </p>
        ))}
    </div>
  );
}

export default FilterContainer;
