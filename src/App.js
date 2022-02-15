import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";
import MainContainer from "./components/MainContainer";

function App() {
     return (
          <Router>
               <MainContainer />
          </Router>
     );
}

export default App;
