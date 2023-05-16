import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';

import './header.scss';

import ContentWrapper from '../conentWrapper/contentwrapper';
import logo from '../../asset/movix-logo.svg';

const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const OpenSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
          setShow('hide');
        } else {
          setShow('show');
        }
      } else {
        setShow('top');
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, mobileMenu]);

  const serchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie');
    } else {
      navigate('/explore/tv');
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler('movie')}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler('tv')}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={OpenSearch}></HiOutlineSearch>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={OpenSearch}></HiOutlineSearch>
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => setMobileMenu(false)}
            ></VscChromeClose>
          ) : (
            <SlMenu onClick={openMobileMenu}></SlMenu>
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={serchQueryHandler}
              />
              <VscChromeClose
                onClick={() => setShowSearch(false)}
              ></VscChromeClose>
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
