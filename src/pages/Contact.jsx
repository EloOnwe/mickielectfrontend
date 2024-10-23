import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <h3>Contact</h3>
      <p>
        We'd love to hear from you! Whether you have questions about our
        products, need help with your order, or want more information about
        Mickielct, we're here to assist
      </p>
      <h4>Reach Us via Email</h4>
      <p>
        For inquiries or support, feel free to send us an email. We aim to
        respond within 24 hours.
      </p>
      <p>
        <span>Email</span> elonwem@gmail.com
      </p>
      <h4>Call Us</h4>
      <p>
        Need to talk to us directly? Our customer support team is available to
        assist you with any questions or concerns
      </p>
      <p>
        <span>Phone: </span> +2348037906841
      </p>
      <p>
        <span>WhatsApp: </span>+2348037906841{" "}
      </p>
      <h4>Visit Our Office</h4>
      <p>
        If you're in Enugu, you can visit us at our physical location. We are
        always happy to assist you in person.
      </p>
      <div className="address">
        <h5>Address</h5>
        <h6>Mickielct</h6>
        <p>4, Isuochi Street, Uwani, Enugu, Enugu State, Nigeria</p>
        <h6>⏰ Office Hours:</h6>
        <p>
          Monday to Friday: 9 AM – 5 PM Saturday: 10 AM – 2 PM Sunday: Closed
        </p>
      </div>
      <div className="social">
        <h6>Follow Us on Social Media</h6>
        <p>
          Stay updated with the latest news, products, and promotions from
          Mickielct by following us on our social media channels
        </p>
        <ul>
          <li>
            Facebook <a href="#">Mickielect Facebook Page</a>
          </li>
          <li>
            Instagram <a href="#">@mickielect.</a>
          </li>
          <li>
            Twitter <a href="#">@mickielect.</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
