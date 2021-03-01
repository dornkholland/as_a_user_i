import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="devInfo">
        <h2>Developed by: </h2>
        <h1>Dorn Holland</h1>
      </div>
      <button>
        <i className="fab fa-github"></i>
      </button>
      <button>
        <i className="fab fa-linkedin-in"></i>
      </button>
    </div>
  );
}

export default Footer;
