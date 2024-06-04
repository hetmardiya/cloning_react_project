import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Head from "./components/Head";
import Home from "./components/Home";
import "./style/App.scss";
import "./style/Header.scss";
function App() {
  return (
    <Router>
      <Head/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;