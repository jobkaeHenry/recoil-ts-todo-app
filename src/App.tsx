import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import Calendar from "./components/Calender";

function App() {
  return (
  <RecoilRoot>
    <Calendar/>
  </RecoilRoot>
  )
}

export default App;


