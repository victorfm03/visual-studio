import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Carrousel from "../components/Carrousel";
import Descripcion from "../components/Descripcion";
import Footer from "../components/Footer";


function Home() {
  
  const location=useLocation();

  const isHome=location.pathname==="/";

  return (
    <>
      
        <div className="main-content">
          <Navbar/>
          <div className="content">

            {isHome? (

              <>
                <Carrousel />
                <Descripcion />
              </>
            ): (
              <Outlet />
            )}
          </div>

            <Footer />

        </div>
      
    </>
  );
}
export default Home;
