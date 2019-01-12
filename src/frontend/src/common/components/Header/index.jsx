import cn from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCurrentPathname } from 'common/selectors/router';
import { ROUTES } from 'common/constants/routes';

const HEADER_MENU_ITEMS = [
  // { path: ROUTES.INDEX, title: 'Recibuy' },
  { path: ROUTES.RECIPES, title: 'Recipes' },
  { path: ROUTES.BASKET, title: 'Basket' },
  { path: ROUTES.SHOPPING_LIST, title: 'Shopping list' },
];

const propTypes = {
  currentPathname: PropTypes.string.isRequired,
};

function Header(props) {
  const { currentPathname } = props;
  return (
    <nav className="container header-wrapper">
      <ul>
        {HEADER_MENU_ITEMS.map(item => (
          <li className={cn({ active: currentPathname === item.path })} key={item.path}>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Header.propTypes = propTypes;

const mapStateToProps = state => ({
  currentPathname: getCurrentPathname(state),
});

export default connect(mapStateToProps)(Header);
