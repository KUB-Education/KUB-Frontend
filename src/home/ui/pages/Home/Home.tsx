import { Link } from 'react-router';
import { Root } from './styles';

const Home = () => {
  return (
    <Root>
      <p>Home page</p>
      {/* TODO: remove when auth is done, here for testing purposes */}
      <Link to="/change-password">Change password</Link>
    </Root>
  );
};

export default Home;
