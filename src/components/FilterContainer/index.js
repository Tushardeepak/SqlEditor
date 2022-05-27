import React, { useEffect } from "react";
import "./filter.css";

function FilterContainer({
  currentDatabase,
  setFilters,
  filters,
  setApplyFilter,
  applyFilter,
}) {
  // useEffect(() => {
  //   setApplyFilter(false);
  // }, [filters?.head, filters?.op, filters?.text]);
  const op = ["=", "!=", "<", ">"];
  return (
    <div className="filterContainer">
      <p className="filterHeader">Filter</p>
      <select
        className="filterSelect"
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
          <p
            className="filterSubmit"
            onClick={() => setApplyFilter(!applyFilter)}
          >
            {applyFilter ? "Remove" : "Apply"}
          </p>
        ))}
    </div>
  );
}

export default FilterContainer;
