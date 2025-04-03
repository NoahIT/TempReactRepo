import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h2>Pagrindinis puslapis</h2>
      <p>
        <Link to="/login">Prisijungti</Link> arba <Link to="/register">Registruotis</Link>
      </p>
    </div>
  );
};

export default Home;
