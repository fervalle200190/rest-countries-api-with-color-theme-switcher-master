import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "../pages/Details";
import HomePage from "../pages/HomePage";
import CountrySelf from "./CountrySelf";

function MainContainer() {
     const [mode, setMode] = useState(false);
     const [data, setData] = useState([]);
     return (
          <>
               <div className="main-container">
                    <nav className="nav-container">
                         <div className="inner-nav">
                              <div className="title-cont">
                                   <h1 className="main-title">
                                        Where in the world?
                                   </h1>
                              </div>
                              <div className="mode-container">
                                   {mode ? (
                                        <ion-icon name="moon"></ion-icon>
                                   ) : (
                                        <ion-icon name="moon-outline"></ion-icon>
                                   )}
                                   <span className="dark-toggle">
                                        Dark Mode
                                   </span>
                              </div>
                         </div>
                    </nav>
                    <Routes>
                         <Route
                              path="/"
                              element={
                                   <HomePage data={data} setData={setData} />
                              }
                         />
                         <Route
                              path="/country/*"
                              element={<Details setData={setData} />}
                         >
                              <Route
                                   path="ven"
                                   element={
                                        <CountrySelf
                                             data={data}
                                             setData={setData}
                                        />
                                   }
                              />
                         </Route>
                    </Routes>
               </div>
          </>
     );
}

export default MainContainer;
