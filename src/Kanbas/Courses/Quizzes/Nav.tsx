import { Link, useLocation } from "react-router-dom";
import QuizDetailor from "./Editor/QuizDetails";
function Nav() {
  const { pathname } = useLocation();
return (
  <nav className="nav nav-tabs mt-2">
    <Link className={`nav-link ${pathname.includes("Details") || pathname === "/Editor/" ? "active" : ""}`} to="" style={{color:"red"}}>Details</Link>
    <Link className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`} to="" style={{color:"red"}}>Questions</Link>
    {pathname.includes("Details") && <QuizDetailor />}
  </nav>
);
}
export default Nav;