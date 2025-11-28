import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import { TbRadarOff } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useGetUsers } from "./hooks/useGetUsers";
import { useState, useEffect } from "react";
import "./panelUsers.css";
import ModalUser from "./components/modal-users/ModalUsers";

const PanelUsers = () => {
    const [openModalUser, setOpenModalUser] = useState(false);
    const [query, setQuery] = useState("");
    const { getUsers, users, loading, error } = useGetUsers();

    const toggleModal = () => {
        setOpenModalUser((prev) => !prev);
    };

    const filteredUsers = users.filter((user) => {
        const fullName = user.full_name ? user.full_name.toLowerCase() : '';
        const matchesQuery = fullName.includes(query.toLowerCase());
        return matchesQuery;
    });
    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (users && users.length > 0) {
            console.log("Usuarios cargados y listos:", users);
        }
    }, [users]);

    return (
        <div className="panel__users">
            <section className="header__panel">
                <div className="text__header">
                    <h2 className="title__panel">Usuarios</h2>
                    <p>Gestiona todos los usuarios</p>
                </div>
                <button className="btn__ __add-product" onClick={toggleModal}>
                    Agregar Usuario
                </button>
            </section>
            <section className="content__panel-users">
                <h3>Lista de Usuarios</h3>
                <div className="filters__users">
                    <div className="filters__options">
                        <div className="search__users">
                            <CiSearch style={{ fontSize: "24px" }} />
                            <input
                                type="text"
                                placeholder="Buscar usuario..."
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="table__users">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre completo</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Fecha de registro</th>
                            <th>Fecha de modificacion</th>
                            <th>Edad</th>
                            <th>Genero</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="10">Cargando Usuarios...</td>
                            </tr>
                        )}
                        {error && (
                            <tr>
                                <td colSpan="10">Error: {error}</td>
                            </tr>
                        )}
                        {!loading &&
                            !error &&
                            filteredUsers.map((user) => (
                                <tr key={user.id_users}>
                                    <td>{user.id_users}</td>
                                    <td>{user.full_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{new Date(user.register_date).toLocaleDateString()}</td>
                                    <td>{user.modification_date ? new Date(user.modification_date).toLocaleDateString() : 'N/A'}</td>
                                    <td>{calculateAge(user.birth_date)}</td>
                                    <td>{user.gender_name}</td>
                                    <td>{user.role_name}</td>
                                    <td>
                                        <button title="Editar usuario" className="btn__toggle-view"><FaEdit /></button>
                                        <button
                                            title="Eliminar usuario"
                                            className="btn__toggle-view"
                                            onClick={() => {/* manejar eliminación */}}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
            {openModalUser && <ModalUser onClose={toggleModal} />}
        </div>
    )
}

export default PanelUsers;