import "../styles/enquiryPage.css";

const EnquiryPage = () => {
  return (
    <div className="enquiryContainer">
      <h3>Enquiry</h3>
      <p>
        At Mickielct, we're here to help you with all your electrical component
        needs. Whether you have a question about our products, need assistance
        with your order, or require expert advice for your project, we’re always
        happy to hear from you
      </p>
      <h4>How Can We Help?</h4>
      <p>
        Fill out the form below, and one of our knowledgeable team members will
        get back to you as soon as possible. Please provide as much detail as
        possible so we can assist you efficiently.
      </p>
      <div className="box">
        <div className="enquiryForm">
          <form>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" placeholder="Enter your full name" />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Enter your email" />
            <label htmlFor="phone">Phone number (optional)</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
            />
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject of your enquiry"
            />
            <textarea
              name="message"
              id="enquirybox"
              placeholder="Tell us how we can help. Include any specific questions, product details, or other relevant information."
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="otherEnquiry">
          <h5>Other Ways to Contact Us</h5>
          <p>
            If you'd prefer to speak with us directly, you can reach us via the
            following:
          </p>
          <ul>
            <li>
              <span>Phone</span> +2348037906841
            </li>
            <li>
              <span>Email</span> elonwem@gmail.com
            </li>
            <li>
              <span>Visit Us</span>{" "}
              <p>4 Isuochi Street, Uwani Enugu, Enugu State, Nigeria.</p>
            </li>
          </ul>
          <p>
            Our customer support team is available Monday to Friday from 9:00 AM
            to 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPage;
