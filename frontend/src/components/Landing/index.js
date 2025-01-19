import Hero from './Hero';
import * as sessionActions from '../../store/session';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Landing.css';
function Landing() {
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Redirect to="/projects" />;
  return (
    <>
      <Hero />
    </>
  );
}

export default Landing;
