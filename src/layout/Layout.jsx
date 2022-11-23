import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
    return ( 
        <div>
            <Header className="mb-4"/>
            {children}
            <Footer className="mt-4" />
        </div>
     );
}
 
export default Layout;