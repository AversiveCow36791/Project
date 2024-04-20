import { Link, useLocation } from "react-router-dom";
function Nav() {
  const { pathname } = useLocation();
 return (
   <nav className="nav nav-tabs mt-2">
     <Link className={`nav-link ${pathname.includes("Details") ? "active" : ""}`} to="" style={{color:"red"}}>Details</Link>
     <Link className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`} to="" style={{color:"red"}}>Questions</Link>
   </nav>
 );
}
export default Nav;