import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
const Home = () => {
  const history = useHistory();
  // useEffect(() => {}, []);
  return (
    <div>
      <Navbar />
      <h1>home</h1>
    </div>
  );
};
export default Home;
