import Lensrentals from "../assets/Lensrentals.png"


function Footer() {
  return (
    <footer className="footer" id="contact">
      <div>
        <strong>Lakeshore Lens Co.</strong>
        <p>
        <p>Contact</p>
        </p>
      </div>
      <a href="#">
        <img className="lensrentals" src={Lensrentals} alt="logo" />
      </a>

      <p>© 2026 Lakeshore Lens Co.</p>
    </footer>
  );
}

export default Footer;