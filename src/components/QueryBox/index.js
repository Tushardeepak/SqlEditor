import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./queryBox.css";

function QueryBox({
  queryArray,
  setQueryArray,
  currentQuery,
  setCurrentQuery,
}) {
  const params = useParams();
  useEffect(() => {
    const _query = queryArray.filter((q) => q.id === params.queryID);
    setCurrentQuery(_query[0] ?? {});
  }, [params.queryID]);

  const debounce = (fn) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), 500);
    };
  };

  const handleCurrChange = (e) => {
    setCurrentQuery({ ...currentQuery, query: e.target.value });
  };

  const handleChange = (e) => {
    let arr = [...queryArray];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === params.queryID) {
        arr[i] = {
          ...arr[i],
          query: e.target.value,
        };
        break;
      }
    }
    setQueryArray([...arr]);
  };
  const optimizedFn = useCallback(debounce(handleChange), [
    queryArray,
    params.queryID,
  ]);
  return (
    <div className="queryBoxContainer">
      <textarea
        className="queryBoxTextArea"
        placeholder="Type Query..."
        onChange={(e) => {
          handleCurrChange(e);
          optimizedFn(e);
        }}
        value={currentQuery.query}
      />
    </div>
  );
}

export default QueryBox;
