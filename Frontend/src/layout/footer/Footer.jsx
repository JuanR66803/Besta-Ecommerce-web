import "./Footer.css";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { NavLink } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <div className="Footer_container">
                <div className="info_footer">
                    <img src="./logo_footer.png" alt="logo" />
                    <h2>Para jugar como los mejores, debes usar lo que usan los mejores. Fiera.</h2>
                    <div className="social networks">
                        <a target="blank" href="https://www.instagram.com/fieracali_?igsh=ZHA0dnN6MzJrNTNv"><FaInstagram className="ico_social"/></a>
                        <a target="blank" href="https://wa.me/573137935525"><FaWhatsapp className="ico_social"/></a>
                        <a target="blank" href="https://www.facebook.com/share/16ZFwDnqJ1/"><FaFacebook className="ico_social" /></a>
                    </div>
                </div>
                <div className="contact_footer">
                    <p> <FaLocationDot style={{ fontSize: "15px", color: "#fff9",marginRight: "20px"  }} /> Cra 11d #33f-20B/municipal cali</p>
                    <p><FaPhone style={{ fontSize: "15px", color: "#fff9",marginRight: "20px"  }} /> +57 313 793 5525 </p>
                    <a href="mailto:fiera.colombia2025@gmail.com"> <CiMail style={{ fontSize: "15px", color: "#fff", marginRight: "20px" }} /> fiera.colombia2025@gmail.com</a>
                </div>
                <div className="interests_footer">
                    <h2>Puntos de interés</h2>
                    <ul className="__list__footer">
                        <li className="list__item_f"><NavLink className={"item_footer"} to="/ofertas">Ofertas</NavLink></li>
                        <li className="list__item_f"><NavLink className={"item_footer"} to="/catalogo">Catálogo</NavLink></li>
                        <li className="list__item_f"><NavLink className={"item_footer"} to="/novedades">Novedades</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Footer;