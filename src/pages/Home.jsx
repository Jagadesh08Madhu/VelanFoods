import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import heroImage from "../assets/heroImage.webp";

export default function Home() {
  const Content = [
    {
      color: "bg-purple-100/70",
      img: "✨",
      para: "Natural Ingredients",
    },
    {
      color: "bg-fuchsia-100/70",
      img: "🌾",
      para: "Rich in Nutrition",
    },
    {
      color: "bg-rose-100/70",
      img: "⏱️",
      para: "Easy to Prepare",
    },
    {
      color: "bg-violet-100/70",
      img: "❤️",
      para: "Loved by All Ages",
    },
  ];


  // Animation variants for grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="bg-gradient-to-tr from-primary/50 to-white px-5 lg:px-20 pt-16"
      id="home"
    >
      {/* --- SEO Meta Tags --- */}
      <Helmet>
        <title>Shri Velan Organic Foods | Wholesome Goodness in Every Bite</title>
        <meta
          name="description"
          content="Shri Velan Organic Foods offers healthy noodles, rice porridge mix, malt varieties, and muesli bites made from natural ingredients. Wholesome goodness in every bite!"
        />
        <meta
          name="keywords"
          content="organic foods, healthy noodles, malt drink, rice porridge, muesli, healthy snacks, Shri Velan Organic Foods"
        />
        <meta property="og:title" content="Shri Velan Organic Foods" />
        <meta
          property="og:description"
          content="Wholesome Goodness in Every Bite – Fresh, Fast & Flavorful! Explore our range of organic and healthy foods."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:image" content={heroImage} />
      </Helmet>

      {/* --- Hero Section --- */}
      <motion.div
        className="flex flex-col-reverse lg:flex-row items-center gap-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* --- Left Content --- */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="font-Italiana text-lg font-semibold tracking-widest uppercase text-primary">
            Shri Velan Organic Foods
          </h1>

          <h2
            style={{ lineHeight: "1.3" }}
            className="text-3xl lg:text-5xl leading-snug tracking-wide font-SpaceGrotesk text-gray-800"
          >
            Wholesome Goodness in Every Bite –{" "}
            <span className="text-primary">Fresh, Fast & Flavorful!</span>
          </h2>

          <p className="font-SpaceGrotesk tracking-wider text-gray-700 leading-relaxed">
            Bring home the perfect balance of{" "}
            <strong>taste, nutrition, and tradition.</strong> From quick-cook
            noodles to hearty rice porridge mixes, energizing malt drinks, and
            crunchy muesli bites — our products are crafted to keep you
            <strong> healthy, active, and satisfied</strong> every single day.
          </p>

          <a
            href="#shop"
            className="font-SpaceGrotesk flex bg-primary w-fit px-6 py-3 text-white tracking-widest rounded-2xl shadow-lg hover:bg-primary/90 transition duration-300"
          >
            Shop Now
          </a>
        </div>

        {/* --- Right Image --- */}
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={heroImage}
            alt="Healthy organic food - noodles, malt, porridge, and muesli"
            // className="rounded-3xl shadow-xl"
            loading="lazy"
          />
        </motion.div>
      </motion.div>

      {/* --- Features Grid --- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16"
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true }}
      >
        {Content.map((content, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className={`${content.color} flex flex-col items-center justify-center text-center p-8 shadow-md hover:shadow-xl transition duration-300`}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <motion.span
              className="text-5xl mb-3"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              {content.img}
            </motion.span>
            <p className="text-lg font-SpaceGrotesk tracking-wide text-gray-800">
              {content.para}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
