import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/learn">Learn</Link> | 
      <Link to="/quiz">Quiz</Link> | 
      <Link to="/result">Result</Link>
    </nav>
  );
};

export default Navbar;
