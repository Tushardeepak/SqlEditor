import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./table.css";

function TableContainer({ data, currentQuery, run, applyFilter, filters }) {
  const [rows, setRows] = useState([]);
  const [start, setStart] = useState(20);
  const [end, setEnd] = useState(40);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (data?.rows && run) {
      setTimeout(() => {
        const r = data?.rows?.slice(start, end);
        setRows([...rows, ...r]);
        setStart(end);

        if (end > data?.rows?.length) {
          setHasMore(false);
        } else {
          setEnd(end + 20);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    setStart(20);
    setEnd(40);
    if (data?.name !== undefined) {
      const row = data?.rows?.slice(0, 20);
      setRows([...row]);
    }
  }, [run, data?.name]);

  return (
    <div className="tableContainer">
      {data?.name === undefined && currentQuery.query === "" ? (
        <p className="info">Welcome to Online SQL Editor</p>
      ) : data?.name !== "" ? (
        run ? (
          <table className="table">
            <th className="tableHead">
              {data?.header?.map((d, index) => (
                <td key={index} className="tableHeadData">
                  <abbr className="tableAbbr" title={d}>
                    {d}
                  </abbr>
                </td>
              ))}
            </th>
            <tbody>
              <InfiniteScroll
                dataLength={rows.length}
                next={() => fetchMoreData()}
                hasMore={hasMore}
                loader={hasMore && <h4>Loading...</h4>}
              >
                {rows
                  .filter((row) => {
                    if (applyFilter) {
                      let text = filters.text;
                      if (filters.op === "=") {
                        if (row[filters.head] === text) return row;
                      } else if (filters.op === "!=") {
                        if (row[filters.head] !== text) return row;
                      } else if (filters.op === "<") {
                        if (row[filters.head] < text) return row;
                      } else if (filters.op === ">") {
                        if (row[filters.head] > text) return row;
                      }
                    } else {
                      return row;
                    }
                  })
                  .map((d, index) => (
                    <tr className="tableRow" key={index}>
                      {Object.values(d).map((val) => (
                        <td className="tableRowData">
                          {" "}
                          <abbr className="tableAbbr" title={val}>
                            {val}
                          </abbr>
                        </td>
                      ))}
                    </tr>
                  ))}
              </InfiniteScroll>
            </tbody>
          </table>
        ) : currentQuery.query === "" ? (
          <p className="info">Enter query or Click run to see table</p>
        ) : (
          <p className="info">Click run</p>
        )
      ) : (
        <p className="info">Select any Database</p>
      )}
    </div>
  );
}

export default TableContainer;
