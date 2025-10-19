import React, { useState } from 'react';
import { motion } from 'framer-motion';
import contact from '../assets/contact.webp';
import ContactDetails from '../components/ContactDetails';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    location: "",
    details: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData();
    formDataObj.append("access_key", "d514e488-61f4-4151-9f79-15095ecc891d");
    formDataObj.append("Fullname", formData.fullname);
    formDataObj.append("Mobile number", formData.mobile);
    formDataObj.append("Email", formData.email);
    formDataObj.append("Location", formData.location);
    formDataObj.append("Event Details", formData.details);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (data.success) {
        setResponseMessage("Message sent successfully!");
        setFormData({
          fullname: "",
          mobile: "",
          email: "",
          location: "",
          details: ""
        });
      } else {
        setResponseMessage(data.message || "Failed to send the message.");
      }
    } catch (error) {
      console.error("Error submitting the form: ", error);
      setResponseMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='font-alice'>
      <div style={{
        backgroundImage: `url(${contact})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }} className='flex flex-col lg:flex-row gap-10 relative items-center py-20 px-5 lg:px-20 text-white'>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <motion.div
          className='lg:w-1/2 z-10 flex flex-col gap-4'
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className='text-3xl font-semibold'>Let’s Connect!</h1>
          <p className='text-lg'>📷 <span className='font-medium'>Weddings | Engagements | Pre-Weddings | Events</span></p>
          <p className='text-lg'>💬 <span className='font-medium'>Customized Packages | Creative Concepts | Cinematic Films</span></p>

          <h2 className='text-2xl font-semibold mt-4'>Planning something special?</h2>
          <p className='text-lg'>
            We’d be honored to be part of your story. Whether you're tying the knot, celebrating a milestone, or dreaming up a unique shoot — 
            <span className='font-medium'> Studio AK </span> is here to capture it all with heart and artistry.
          </p>

          <p className='text-lg'>
            Share your vision, ask us anything, or simply say hello — we’re just a message away and ready to bring your moments to life.
          </p>
        </motion.div>

        <motion.div
          className='lg:w-1/2 z-10'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className='flex flex-col gap-5 text-center'>
            <h1 style={{ letterSpacing: "3px" }} className='text-3xl text-center font-semibold'>Get in Touch with Us.</h1>
            <h1 className='text-center font-semibold text-2xl'>+91 98437 43907</h1>
            <h1 className='text-xl'>💬 We’d Love to Hear From You!</h1>
            <p>
              Whether you're planning your big day, exploring our photography and cinematography services, or simply want to get in touch — we're all
              ears. At Studio AK, every conversation starts a new story, and we can’t wait to be a part of yours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
            {["fullname", "mobile", "email", "location", "details"].map((field, i) => (
              <motion.div
                key={field}
                className='flex flex-col gap-2'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <label className='text-xl'>{field === "details" ? "Event Details" : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}</label>
                {field === "details" ? (
                  <textarea
                    className='outline-none border border-gray-500 bg-transparent focus:shadow-gray-500 lg:w-[60%] px-4 py-2 rounded-xl focus:border-gray-700 transition-all ease-in-out duration-300 focus:shadow-xl'
                    onChange={handleInputChange}
                    value={formData.details}
                    name="details"
                    placeholder='Event Details'
                    required
                  />
                ) : (
                  <input
                    className='outline-none border border-gray-500 bg-transparent focus:shadow-gray-500 lg:w-[60%] px-4 py-2 rounded-xl focus:border-gray-700 transition-all ease-in-out duration-300 focus:shadow-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]'
                    onChange={handleInputChange}
                    value={formData[field]}
                    name={field}
                    type={field === "email" ? "email" : field === "mobile" ? "number" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              className="bg-gradient-to-r hover:bg-gradient-to-l  transition-all duration-700 ease-in-out from-gray-900 to-gray-500 w-fit px-8 py-2 rounded-full text-white font-semibold flex items-center justify-center"
              disabled={isSubmitting}
              type='submit'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
          {responseMessage && <p className="text-white lg:text-xl mt-4">{responseMessage}</p>}
        </motion.div>
      </div>
      <ContactDetails/>
    </section>
  );
}
