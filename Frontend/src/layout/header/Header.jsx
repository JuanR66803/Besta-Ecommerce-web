import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { CiSearch } from "react-icons/ci";
import { FaHeart, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import WishlistSidebar from "../../components/WishListSidebar";
import { useWishlist } from "../../pages/wishlist/hooks/useWishList";
const popularSearches = [
  "Balón",
  "Guayos",
  "Camiseta",
  "Pantaloneta",
  "Medias",
];

const Header = () => {
const { wishlist, refetch } = useWishlist();

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef(null);
  const [isAdminServer, setIsAdminServer] = React.useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentSearch = params.get("search");

    if (!currentSearch) {
      setSearchTerm("");
    } else {
      setSearchTerm(currentSearch);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClearSearch = () => {
      setSearchTerm("");
    };

    window.addEventListener("clearSearch", handleClearSearch);
    return () => window.removeEventListener("clearSearch", handleClearSearch);
  }, []);

  const handleSearch = (query) => {
    const q = (query || "").trim();
    if (!q) return;

    navigate(`/catalogo?search=${encodeURIComponent(q)}`, { replace: false });

    setShowSuggestions(false);
  };
  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Verificar en el servidor si el usuario autenticado es el admin específico
  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAdminServer(false);
        return;
      }
      try {
        const baseURL = import.meta.env.VITE_API_URL || "";
        const url = baseURL
          ? `${baseURL}/api/auth/verify-admin`
          : "/api/auth/verify-admin";
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setIsAdminServer(false);
          return;
        }
        const data = await res.json();
        setIsAdminServer(Boolean(data.allowed));
      } catch (err) {
        console.error("Error verificando admin en header:", err);
        setIsAdminServer(false);
      }
    };
    checkAdmin();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <>
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
                    {popularSearches.map((item) => (
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

            <NavLink
              className="icon__link"
              onClick={() => setWishlistOpen(true)}
            >
              <FaHeart size={22} />
            </NavLink>

            <NavLink to="/cart" className="icon__link">
              <FaCartShopping size={22} />
            </NavLink>
            {!user ? (
              <NavLink to="/sign-in" className="icon__link">
                <FaUser size={22} />
              </NavLink>
            ) : (
              <div className="user__menu">
                <button onClick={handleLogout} className="logout__button">
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <WishlistSidebar
  isOpen={wishlistOpen}
  onClose={() => setWishlistOpen(false)}
  wishlistData={wishlist}  // datos actuales
  refetch={refetch}        // función de recarga
/>

    </>
  );
};

export default Header;
