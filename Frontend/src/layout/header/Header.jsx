import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { CiSearch } from 'react-icons/ci';
import { FaHeart, FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

//Lista de búsquedas populares
const popularSearches = [
  'Guayos Profesionales',
  'Guayos Amateur',
  'Balones',
  'Ropa deportiva',
  'Niños',
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // Estados para la búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = query => {
    if (!query.trim()) return;
    setSearchTerm(query);
    setShowSuggestions(false);
    // Navegamos al catálogo con el parámetro de búsqueda
    navigate(`/catalogo?search=${encodeURIComponent(query)}`);
  };

  const handleInputChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  //Hook para cerrar las sugerencias si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* --- IZQUIERDA: Navegación --- */}
        <div className="header__left">
          <ul className="nav__links">
            <li>
              <NavLink to="/catalogo?category=Guayos">Fábrica</NavLink>
            </li>
            <li>
              <NavLink to="/catalogo">Catálogo</NavLink>
            </li>
            <li>
              <NavLink to="/novedades">Novedades</NavLink>
            </li>
          </ul>
        </div>

        {/* --- CENTRO: Logo --- */}
        <div className="header__center">
          <NavLink to="/" className="logo__link">
            <img src="./logo_fiera.png" alt="Logo" className="logo__img" />
          </NavLink>
        </div>

        {/* --- DERECHA: Búsqueda + Iconos --- */}
        <div className="header__right">
          {/* Barra de búsqueda funcional */}
          <div className="search__container" ref={searchRef}>
            <form className="search__bar" onSubmit={handleFormSubmit}>
              <CiSearch size={20} />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
              />
            </form>
            {showSuggestions && (
              <div className="search__suggestions">
                <h4 className="suggestions__title">Búsquedas Populares</h4>
                <ul className="suggestions__list">
                  {popularSearches.map(item => (
                    <li
                      key={item}
                      className="suggestion__item"
                      onClick={() => handleSearch(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <NavLink to="/wishlist" className="icon__link">
            <FaHeart size={22} />
          </NavLink>

          {!user ? (
            <NavLink to="/sign-in" className="icon__link">
              <FaUser size={22} />
            </NavLink>
          ) : (
            <div className="user__menu">
              <button onClick={handleLogout} className="logout__button">
                <FaUser size={22} />
              </button>
            </div>
          )}

          <NavLink to="/cart" className="icon__link">
            <FaCartShopping size={22} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
