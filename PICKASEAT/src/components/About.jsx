import { useState } from 'react';
import './../App.css';

function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('🎉 Thank you for contacting PickASeat! Our team will reach out shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
      <div className="about-page-dark">
        <div className="about-container-dark">
          <div className="about-left-dark">
            <h1>About <span className="highlight-red">PickASeat</span></h1>
            <p>
              Welcome to <strong>PickASeat</strong>, your premium partner for theater bookings.
              We help you discover the best seats in the house for your favorite shows and cinema experiences.
            </p>
            <p>
              Our platform is designed for convenience, speed, and a seamless experience — from booking your seat to watching the credits roll.
            </p>
            <div className="contact-details-dark">
              <p><strong>Email:</strong> support@pickaseat.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> Cinema Road, Mumbai, India</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form-dark">
            <h2>Get in Touch</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            ></textarea>
            <button type="submit" className="dark-btn">Send Message</button>
          </form>
        </div>
</div>
  );
}

export default About;
