import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./queryTabContainer.css";

function QueryTabContainer({ queryArray }) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="queryTabContainer">
      {queryArray.map((query, index) => (
        <div
          key={query.id}
          className={
            params.queryID === query.id ? "queryTabBoxSelected" : "queryTabBox"
          }
          onClick={() => navigate(`/${query.id}`)}
        >{`${query.title} ${index + 1}`}</div>
      ))}
    </div>
  );
}

export default QueryTabContainer;
