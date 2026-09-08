import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        Lakeshore Lens Co.
      </div>

      <div className="navbar__links">
        <Link to="/">Home</Link>

        <button
          type="button"
          onClick={() => goToSection("lenses")}
        >
          Find Your Lens
        </button>

        <button
          type="button"
          onClick={() => goToSection("contact")}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}

export default Navbar;