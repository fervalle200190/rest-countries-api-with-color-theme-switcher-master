import { Link, Outlet } from "react-router-dom";

function Details() {
     return (
          <>
               <div className="details-container">
                    <div className="btn-container">
                         <Link to="/">
                              <button className="btn-back">Back</button>
                         </Link>
                    </div>
                    <Outlet />
               </div>
          </>
     );
}

export default Details;
