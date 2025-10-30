import React from 'react';
import './Header.css';
import { CiSearch } from 'react-icons/ci';
import { FaHeart, FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          <div className="search__bar">
            <CiSearch size={20} />
            <input type="text" placeholder="Buscar..." />
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
