import React, { useState } from 'react';

function ContactUS() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    reason: ''  // New field for the dropdown
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = '03151253159'; // Replace with your phone number
    const message = `Name: ${formData.name}\nReason: ${formData.reason}\nMessage: ${formData.message}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="container mt-5 ">
      <div className="row  bg-dark text-white shadow-lg w-100 h-100 p-5">
        <div className="col-md-8">
          <div className=" w-100 h-100">
            <div className="card-header text-center">
              <h3>Contact Us</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reason for Contact:</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="form-control bg-dark text-white border-secondary"
                    required
                  >
                    <option value="" disabled>Select a reason</option>
                    <option value="Support">Support</option>
                    <option value="Sales">Sales</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Message:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Enter your message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div  style={{ backgroundColor: 'red' }}>
          <img className="opacity-0.5" src="https://images.pexels.com/photos/4224304/pexels-photo-4224304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" height={"500px"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUS;
