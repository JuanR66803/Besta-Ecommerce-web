import { useEffect } from "react";
import { useGetUsers } from "../../hooks/useGetUsers";

const ModalUser = ({ onClose }) => {
    const {getUsers, users, loading, error} = useGetUsers();

    return (
        <div className="modal__user">
            <div className="modal__content">
                <h2>modal usuario</h2>
            </div>
        </div>
    );
};

export default ModalUser;
