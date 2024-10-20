import { Outlet } from "react-router-dom";
import Header from "./Header";
import IndexPage from "./pages/IndexPage";
import { UserContextProvider } from "./UserContext";

const Layout = () =>{
    return(
        <main>
            <> 
          
            <Header></Header>
            <IndexPage></IndexPage>
      
        </>
            <Outlet></Outlet>
        </main>
    )
}
export default Layout;