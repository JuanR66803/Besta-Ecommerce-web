import React from 'react';
import './Header.css';
import { CiSearch } from 'react-icons/ci';
import { IoIosMenu } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {
  
  const SearchSuggestionsPlaceholder = () => (
    <div className="search-suggestions">
      {/* Contenido de sugerencias eliminado para la versión limpia */}
    </div>
  );

  return (
    <header className="header">
        <div className="top__header">
            <NavLink to="/sign-up" className="register__link">Crear cuenta</NavLink>
            <NavLink to="/sign-in" className="login__link">Iniciar sesión</NavLink>
        </div>
        <div className="nav__bar">
        {/* Contenedor del Logo */}
        <div className="logo__container">
            <NavLink to="/">
            {/* Asegúrate de que esta ruta de imagen sea correcta */}
            <img src="./logo_fiera.png" alt="logo" />
            </NavLink>
        </div>

        {/* Barra de Búsqueda Estática (sin lógica de estado) */}
        <div className="search__bar">
            {/* El ícono es solo visual ahora */}
            <CiSearch /> 
            <input
            type="text"
            placeholder="Buscar..."
            // El valor y los manejadores de eventos han sido eliminados.
            />

            {/* Marcador de posición para sugerencias de búsqueda (puedes eliminar esta línea si no necesitas el CSS) */}
            {/* <SearchSuggestionsPlaceholder /> */}
        </div>
        <NavLink to="/cart" className="cart__link">
            <FaCartShopping style={{ fontSize: '25px', color: '#000' }} />
        </NavLink>
        

        {/* Botón de Menú (Solo visual, la funcionalidad debe re-implementarse) */}
        <button className="menu_button">
            <IoIosMenu style={{ fontSize: '34px', cursor: 'pointer' }} />
        </button>

        {/* Navegación de Escritorio Estática */}
        <nav className="nav_list">
            <ul className="__list">
            <li className="list__item">
                <NavLink className={'item'} to="/catalogo?category=Guayos">
                Fábrica
                </NavLink>
            </li>
            <li className="list__item">
                <NavLink className={'item'} to="/catalogo">
                Catálogo
                </NavLink>
            </li>
            <li className="list__item">
                <NavLink className={'item'} to="/novedades">
                Novedades
                </NavLink>
            </li>
            </ul>
        </nav>
        

        {/* Menú móvil (Estructura visual estática, 'show' eliminado) */}
        <div className={`mobile__menu`}>
            {/* Botón de cierre (Solo visual) */}
            <button className="close_button">
            <AiOutlineClose size={28} />
            </button>
            <ul>
            <li>
                <NavLink to="/novedades">
                Novedades
                </NavLink>
            </li>
            <li>
                <NavLink to="/catalogo">
                Catálogo
                </NavLink>
            </li>
            <li>
                <NavLink to="/catalogo?category=Guayos">
                Fábrica
                </NavLink>
            </li>
            </ul>
        </div>
        </div>
    </header>
  );
};

export default Header;