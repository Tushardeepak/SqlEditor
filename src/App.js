import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import "./App.css";
import MainContainer from "./components/MainContainer";

function App() {
  const [uid, setUid] = useState(uuidV4().toString().replace(/-/g, ""));
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainContainer uid={uid} />} />
        <Route path="/:queryID" element={<MainContainer uid={uid} />} />
      </Routes>
    </div>
  );
}

export default App;
