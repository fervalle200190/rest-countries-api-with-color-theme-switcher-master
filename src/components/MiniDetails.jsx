import { Link } from "react-router-dom";

function MiniDetails({ el }) {
     const { name, flag, population, region, capital } = el;
     return (
          <>
               <div className="mini-details-container">
                    <Link to="/country">
                         <div className="mini-country-image">
                              <img src={flag} alt="flags" />
                         </div>
                         <div className="mini-country-details">
                              <h5 className="mini-country-name">{name}</h5>
                              <span className="mini-population">
                                   <b className="mini-bold">Population:</b>{" "}
                                   {population}
                              </span>
                              <span className="mini-region">
                                   <b className="mini-bold">Region:</b> {region}
                              </span>
                              <span className="mini-capital">
                                   <b className="mini-bold">Capital:</b>{" "}
                                   {capital}
                              </span>
                         </div>
                    </Link>
               </div>
          </>
     );
}

export default MiniDetails;
