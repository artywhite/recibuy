import React from 'react';

import Header from 'common/components/Header';
import Footer from 'common/components/Footer';
import Router from 'common/router';

function Layout() {
  return (
    <div>
      <Header />

      <main className="container main-content">
        <Router />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
