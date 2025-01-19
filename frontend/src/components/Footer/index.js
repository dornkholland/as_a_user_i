import './Footer.css';
function Footer() {
  return (
    <div className="footer">
      <div className="devInfo">
        <h2>Developed by: </h2>
        <h1>Dorn Holland</h1>
      </div>
      <a href="https://github.com/dornkholland">
        <i className="fab fa-github"></i>
      </a>
      <a href="https://www.linkedin.com/in/dorn-holland-0a22b6173/">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  );
}

export default Footer;
