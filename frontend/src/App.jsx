import "./App.css";
import Banner from "./components/Banner";
import Card from "./components/Card";
import Dishes from "./pages/Dishes";
import Login from "./pages/Login";
import RegisterPage from "./pages/Registes";
import UploadDish from "./pages/UploadDish";

function App() {
  return (
    <>
      {/* <Login/> */}
      <Banner />
      <Dishes />
    </>
  );
}

export default App;
