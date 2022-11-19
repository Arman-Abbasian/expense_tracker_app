import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
    return ( 
        <div>
            <Header className="mb-4"/>
            {children}
            <Footer />
        </div>
     );
}
 
export default Layout;