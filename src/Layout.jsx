import { useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const Layout = ({ children, activePage, setActivePage , isLoggedIn}) => {
  const location = useLocation();

  // Приводим pathname к нижнему регистру
  const shouldShowHeaderFooter = !location.pathname.toLowerCase().startsWith('/auth');

  return (
    <>
      {shouldShowHeaderFooter && <Header activePage={activePage} changeActivePage={setActivePage} isLoggedIn={isLoggedIn} />}
      <main>{children}</main>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;