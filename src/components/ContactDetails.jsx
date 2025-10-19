import React from 'react';
import { IoHome } from "react-icons/io5";
import { MdPhoneCallback, MdAttachEmail } from "react-icons/md";
import { motion } from 'framer-motion';

export default function ContactDetails() {
  return (
    <section className='font-alice mx-5 lg:mx-20 py-20'>
      <div className='flex flex-col items-center gap-10 lg:flex-row'>
        
        <motion.div
          className='flex flex-col gap-5 lg:w-1/2'
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{once:true , amount: 0.4}}
        >
          <motion.h1
            className='text-3xl font-semibold'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{once:true , amount: 0.4}}
          >
            Contact Us
          </motion.h1>

          {/* Address */}
          <motion.div 
            className='flex items-center gap-3'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{once:true , amount: 0.4}}
          >
            <div className='p-5 bg-gray-900 text-white rounded-xl shadow-gray-700 shadow-lg'>
              <IoHome />
            </div>
            <div className='flex flex-col'>
              <h1>Address :</h1>
              <p>Salem Main Rd, near Lena Theatre, Raja Nagar, Kallakurichi, Tamil Nadu 606202</p>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div 
            className='flex items-center gap-3'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{once:true , amount: 0.4}}
          >
            <div className='p-5 bg-gray-900 text-white rounded-xl shadow-gray-700 shadow-lg'>
              <MdPhoneCallback />
            </div>
            <div>
              <h1>Phone :</h1>
              <p>+91 98437 43907</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div 
            className='flex items-center gap-3'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{once:true , amount: 0.4}}
          >
            <div className='p-5 bg-gray-900 text-white rounded-xl shadow-gray-700 shadow-lg'>
              <MdAttachEmail />
            </div>
            <div>
              <h1>Email :</h1>
              <p>studioakofficial@gmail.com</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Google Map iframe */}
        <motion.div 
          className='lg:w-1/2'
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{once:true , amount: 0.4}}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.120538241444!2d78.9626668!3d11.7343491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab67271360259d%3A0xa6c7c6d348ae4f07!2sSTUDIO%20AK%20-%20WEDDING%20PHOTOGRAPHY!5e1!3m2!1sen!2sin!4v1743943224839!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}
