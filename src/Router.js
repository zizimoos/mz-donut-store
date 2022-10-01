import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./scenes/Home";
import About from "./scenes/About";

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
