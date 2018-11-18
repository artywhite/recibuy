import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from 'common/constants/routes';

function Header() {
  return (
    <nav className="container header-wrapper">
      <ul>
        <li>
          <Link className="nav-logo" to={ROUTES.INDEX}>
            Recibuy
          </Link>
        </li>
        <li>
          <Link to={ROUTES.RECIPES}>Recipes</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
