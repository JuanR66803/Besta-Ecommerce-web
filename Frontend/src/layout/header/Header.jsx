import React from 'react';
import './Header.css';
import { CiSearch } from 'react-icons/ci';
import { IoIosMenu } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
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
      <div className="top__header">
        {!user ? (
          <>
            <NavLink to="/sign-up" className="register__link">
              Crear cuenta
            </NavLink>
            <NavLink to="/sign-in" className="login__link">
              Iniciar sesión
            </NavLink>
          </>
        ) : (
          <div className="user__info">
            <span className="user__name">Hola, {user.name || user.full_name}</span>

            {user.role === "admin" && (
              <NavLink to="/panel-admin" className="admin__link">
                Panel Admin
              </NavLink>
            )}

            <button onClick={handleLogout} className="logout__button">
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      <div className="nav__bar">
        {/* Logo */}
        <div className="logo__container">
          <NavLink to="/">
            <img src="./logo_fiera.png" alt="logo" />
          </NavLink>
        </div>

        {/* Barra de búsqueda */}
        <div className="search__bar">
          <CiSearch />
          <input type="text" placeholder="Buscar..." />
        </div>

        <NavLink to="/cart" className="cart__link">
          <FaCartShopping style={{ fontSize: '25px', color: '#000' }} />
        </NavLink>

        {/* Botón menú móvil */}
        <button className="menu_button">
          <IoIosMenu style={{ fontSize: '34px', cursor: 'pointer' }} />
        </button>

        {/* Navegación */}
        <nav className="nav_list">
          <ul className="__list">
            <li className="list__item">
              <NavLink className="item" to="/catalogo?category=Guayos">
                Fábrica
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className="item" to="/catalogo">
                Catálogo
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className="item" to="/novedades">
                Novedades
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Menú móvil */}
        <div className={`mobile__menu`}>
          <button className="close_button">
            <AiOutlineClose size={28} />
          </button>
          <ul>
            <li>
              <NavLink to="/novedades">Novedades</NavLink>
            </li>
            <li>
              <NavLink to="/catalogo">Catálogo</NavLink>
            </li>
            <li>
              <NavLink to="/catalogo?category=Guayos">Fábrica</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
