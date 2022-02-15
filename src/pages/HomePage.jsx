import MiniDetails from "../components/MiniDetails";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

let initialData = [];

function HomePage({ setData, data }) {
     const [continent, setContinent] = useState(null);
     const [country, setCountry] = useState("");
     const [limit, setLimit] = useState(20);
     const [actualData, setActualData] = useState([]);
     const options = useRef();
     const toHide = (e) => {
          e.stopPropagation();
          options.current.classList.toggle("to-hide");
     };
     const numberWithDots = (num) => {
          let parts = num.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return parts.join(".");
     };
     const handleContinent = (e) => {
          e.stopPropagation();
          if (e.target.textContent === "Filter by Region") {
               setContinent(null);
               return;
          }
          setContinent(e.target.textContent);
     };
     const norm = () => {
          setContinent(null);
     };
     const handleAll = (ab) => {
          ab.forEach((el, index) => {
               if (index <= limit) {
                    setActualData((actualData) => [...actualData, el]);
               }
          });
     };
     const askData = async () => {
          try {
               let res = await axios(`https://restcountries.com/v3.1/all`);
               console.log("hola 1");
               let infos = await res.data;
               initialData = []
               for (const info in infos) {
                    let itself = infos[info];
                    initialData = [
                         ...initialData,
                         {
                              flag: itself.flags.svg,
                              name: itself.name.common,
                              population:
                                   numberWithDots(itself.population) ||
                                   "no information",
                              region: itself.region || "no information",
                              capital: itself.capital || "no information",
                         },
                    ];
               }
               setActualData([])
               setData(initialData);
          } catch (error) {
               console.log(error);
          }
     };
     const update = () => {
          setLimit((limit) => limit + 20);
          setActualData([]);
     };
     useEffect(() => {
          document.querySelector("body").addEventListener("click", (e) => {
               if (
                    !e.target.matches(".select-country") ||
                    !e.target.matches(".select-country-options")
               ) {
                    if (options.current.classList.contains("to-hide")) {
                         options.current.classList.remove("to-hide");
                    } else {
                         return;
                    }
               }
          });
          askData();
          window.addEventListener("scroll", () => {
               const { scrollTop, clientHeight, scrollHeight } =
                    document.documentElement;

               if (scrollTop + clientHeight >= scrollHeight) {
                    update();
               }
          });
     }, []);
     useEffect(() => {
          axios(`https://restcountries.com/v3.1/name/${country}`)
               .then((res) => {
                    console.log(res.data);
               })
               .catch((err) => console.log(err));
     }, [country]);
     useEffect(() => {
          handleAll(data);
     }, [data]);
     useEffect(() => {
          handleAll(data);
     }, [limit]);
     const askContinent = () => {
          axios(`https://restcountries.com/v3.1/region/${continent}`)
          .then((res) => {
               let infos = res.data;
               initialData = [];
               for (const info in infos) {
                    let itself = infos[info];
                    initialData = [
                         ...initialData,
                         {
                              flag: itself.flags.svg,
                              name: itself.name.common,
                              population:
                                   numberWithDots(itself.population) ||
                                   "no information",
                              region: itself.region || "no information",
                              capital: itself.capital || "no information",
                         },
                    ];
               }
               setLimit(20)
               setActualData([])
               setData(initialData);
          })
          .catch((err) => console.log(err));
     }
     useEffect(() => {
          if(continent === null) {
               askData()
          } else {
               askContinent()
          }
     }, [continent]);
     return (
          <>
               <div className="home-container">
                    <div className="mini-search">
                         <div className="inner-mini-search">
                              <div className="input-container">
                                   <div className="inner-i-container">
                                        <ion-icon name="search-outline"></ion-icon>
                                        <input
                                             type="text"
                                             placeholder="Search for a country..."
                                             name="country"
                                             id="country"
                                             value={country}
                                             onChange={(e) => {
                                                  norm();
                                                  setCountry(e.target.value);
                                             }}
                                        />
                                   </div>
                              </div>
                              <div className="options-container">
                                   <div className="inner-select-container">
                                        <button
                                             id="select-country"
                                             onClick={toHide}
                                        >
                                             {continent !== null
                                                  ? continent
                                                  : "Filter by Region"}
                                             <ion-icon name="chevron-down-outline"></ion-icon>
                                        </button>
                                        <div
                                             className="select-country-options"
                                             ref={options}
                                        >
                                             <div
                                                  className="option"
                                                  onClick={handleContinent}
                                             >
                                                  Filter by Region
                                             </div>
                                             <div
                                                  className="option"
                                                  onClick={handleContinent}
                                             >
                                                  Africa
                                             </div>
                                             <div
                                                  className="option"
                                                  onClick={handleContinent}
                                             >
                                                  America
                                             </div>
                                             <div
                                                  className="option"
                                                  onClick={handleContinent}
                                             >
                                                  Asia
                                             </div>
                                             <div
                                                  className="option"
                                                  onClick={handleContinent}
                                             >
                                                  Europe
                                             </div>
                                             <div
                                                  className="option"
                                                  onClick={handleContinent}
                                             >
                                                  Oceania
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="countries-container">
                         <div className="inner-countries-container">
                              {actualData.length > 0 &&
                                   actualData.map((el, index) => {
                                        return (
                                             <MiniDetails key={index} el={el} />
                                        );
                                   })}
                         </div>
                    </div>
               </div>
          </>
     );
}

export default HomePage;
