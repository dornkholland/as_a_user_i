import { NavLink } from 'react-router-dom';
function Hero() {
  return (
    <div className="hero">
      <div
        className="hero__image"
        style={{ backgroundImage: 'url(/images/hero.jpg)' }}
      ></div>
      <div className="hero__content">
        <div content__text>
          <h1>
            Software should be engineered
            <span> for the user.</span>
          </h1>
          <h2> We can help you with that. </h2>
        </div>
        <div className="content__signup">
          <h1> Sign up within minutes and get started today!</h1>
          <NavLink to="/signup">Click me!</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Hero;
