import React from "react";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function ContactDetails() {
  const contactData = [
    {
      id: 1,
      icon: <FaWhatsapp size={36} />,
      title: "WhatsApp",
      info: "+91 8122747148",
      link: "https://wa.me/918122747148",
      color: "bg-green-500",
    },
    {
      id: 2,
      icon: <IoMailOpenOutline size={36} />,
      title: "Email",
      info: "shrivelanhealthmix23@gmail.com",
      link: "mailto:shrivelanhealthmix23@gmail.com",
      color: "bg-amber-500",
    },
    {
      id: 3,
      icon: <FaLocationDot size={36} />,
      title: "Factory",
      info: "Kasukadai street, Mettupalayam,Trichy-621210",
      // link: "https://maps.google.com?q=26+Shivan+street+Usupur+Chidambaram",
      color: "bg-emerald-500",
    },
  ];

  return (
    <section className="px-5 lg:px-20 py-10">
      <h1 className="text-xl lg:text-3xl pb-5 text-center font-Italiana font-semibold tracking-widest">Contact Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactData.map((item) => (
          <div
            key={item.id}
            className={`${item.color} text-white cursor-pointer p-6 rounded-3xl shadow-lg relative overflow-hidden hover:scale-[1.03] transition-transform duration-300`}
            style={{
              borderTopLeftRadius: "0",
            }}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <span className="text-white">{item.icon}</span>
              <h2 className="text-xl font-Italiana tracking-widest font-semibold">{item.title}</h2>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-SpaceGrotesk tracking-wider text-sm hover:underline break-words"
                >
                  {item.info}
                </a>
              ) : (
                <p className="text-white text-sm">{item.info}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
