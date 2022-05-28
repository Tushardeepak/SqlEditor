import React, { useEffect } from "react";
import { header1, header2, rows1, rows2 } from "../../utils/databases";
import "./dbContainer.css";

function DBContainer({
  database,
  setDatabase,
  setCurrentQuery,
  currentQuery,
  queryArray,
  setQueryArray,
}) {
  const fileReader = new FileReader();

  const csvFileToArray = (string, fileName) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    handleChangeDatabase({
      name: fileName,
      header: csvHeader,
      rows: array,
    });
    setDatabase([
      ...database,
      {
        name: fileName,
        header: csvHeader,
        rows: array,
      },
    ]);
  };

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text, file.name.split(".")[0]);
      };
      fileReader.readAsText(file);
    }
  };

  const handleChangeDatabase = (data) => {
    setCurrentQuery({
      ...currentQuery,
      run:false,
      currentDatabase: {
        header: data.header,
        rows: data.rows,
        name: data.name,
      },
    });

    let arr = [...queryArray];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === currentQuery.id) {
        arr[i] = {
          ...arr[i],
          run:false,
          currentDatabase: {
            header: data.header,
            rows: data.rows,
            name: data.name,
          },
        };
        break;
      }
    }
    console.log("arrDataBase", arr);
    setQueryArray([...arr]);
  };

  useEffect(() => {
    setDatabase([
      {
        header: [...header1],
        rows: [...rows1],
        name: "Products",
      },
      {
        header: [...header2],
        rows: [...rows2],
        name: "Customers",
      },
    ]);
  }, []);

  return (
    <div className="dbContainer">
      <input
        type="file"
        id="csvFileInput"
        accept=".csv"
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      <label for="csvFileInput" className="dbContainerHeader">
        + Add Database
      </label>
      <div className="dbContainerBox">
        {database?.map((data) => (
          <p
            className={
              currentQuery.currentDatabase?.name === data.name
                ? "dbSelected"
                : "db"
            }
            onClick={() => handleChangeDatabase(data)}
          >
            {data.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DBContainer;
