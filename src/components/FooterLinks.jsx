import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import "../styles/footerLinks.css";
import { useNavigate } from "react-router-dom";
const FooterLinks = () => {
  const navigate = useNavigate();
  return (
    <div className="footer-links">
      <div className="socials">
        <FaFacebook className="icon" />
        <FiInstagram className="icon" />
        <MdOutlineEmail className="icon" />
        <FaTwitter className="icon" />
      </div>
      <h2>Let's Talk</h2>

      <button className="btn" onClick={() => navigate("/contact")}>
        Make an enquiry
      </button>
    </div>
  );
};

export default FooterLinks;
