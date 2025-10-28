import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { GiCheckMark } from "react-icons/gi";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // singular name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(''); // for main image
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, zoom: 1 });

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const url = `https://shri-velan-food.onrender.com/api/products/${id}`;
      const response = await fetch(url);

      if (!response.ok) {
        setError('Failed to fetch product');
        return;
      }

      const data = await response.json();
      setProduct(data.data);
      if (data.data.images?.[0]) {
        setSelectedImage(data.data.images[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Product not found</p>;

  // Zoom handlers
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, zoom: 2 });
  };

  const handleMouseLeave = () => {
    setZoomPos({ x: 0, y: 0, zoom: 1 });
  };

  return (
    <section className="py-10 px-5 lg:px-28">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image section */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {/* Main image with zoom */}
          <div
            className="overflow-hidden rounded-md w-full h-[400px] relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-100 ease-out"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: `scale(${zoomPos.zoom})`,
              }}
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className="w-20 h-20 border p-1 border-gray-300 rounded-md cursor-pointer hover:border-primary"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Content section */}
        <div className="md:w-1/2 flex flex-col gap-8">
          <h1 className="text-2xl md:text-4xl tracking-wider font-Italiana font-semibold">
            {product.name} - {product.weight}
          </h1>
          <hr />
          <div className="flex items-center gap-3 font-SpaceGrotesk text-2xl font-semibold">
            <p className="text-gray-500 line-through">₹{product.normalPrice}</p>
            <p className="text-primary">₹{product.offerPrice}</p>
          </div>
          <p className="font-SpaceGrotesk tracking-wider">
            <strong className="text-primary">Weight: </strong>
            {product.weight}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center bg-primary w-fit gap-2 mt-4">
            <button
              onClick={handleDecrement}
              className="px-3 py-1 text-white font-SpaceGrotesk rounded-md text-lg"
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="px-4 text-white">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 text-white font-SpaceGrotesk rounded-md text-lg"
              disabled={quantity === product.stock}
            >
              +
            </button>
          </div>
          <p className={`${product.stock >0? "text-green-600" :"text-red-600"} font-SpaceGrotesk text-lg`}>{product.stock > 0  ? "In stock" : "Out of stock"}</p>
          {/* Ingredients */}
          <div className="font-SpaceGrotesk">
            <p>
              <strong className="text-primary">Ingredients: </strong>
              {product.ingredients.join(', ')}
            </p>
          </div>

          {/* Add to Cart / Buy Now */}
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <button className="bg-primary w-full py-3 text-white font-SpaceGrotesk tracking-wider">
              Add to cart
            </button>
            <button className="bg-primary w-full py-3 text-white font-SpaceGrotesk tracking-wider">
              Buy now
            </button>
          </div>
        </div>
      </div>

      <div className='pt-10 flex flex-col gap-5'>
        {/* Description */}
        <div className='flex flex-col gap-3'>
            <h2 className='text-3xl font-semibold font-Italiana tracking-wider underline'>Description</h2>
            <h3 className='font-SpaceGrotesk font-semibold text-xl'>{product.name}</h3>
            <p className='font-SpaceGrotesk leading-loose'>{product.description}</p>
        </div>


        {/* INGREDIENTS */}
        <div className='flex flex-col gap-3'>
            <h2 className='text-3xl font-semibold font-Italiana tracking-wider underline'>Ingredients</h2>
            <p className='font-SpaceGrotesk leading-loose'>{product.ingredients}</p>
        </div>

        {/* Benefits */}
       
            <div className='flex flex-col gap-3'>
                <h2 className='text-3xl font-semibold font-Italiana tracking-wider underline'>Health Benefits</h2>
                 {product.benefits.map((benefit , i)=>(
                <ul key={i} className='flex items-center gap-3'>
                    <span><GiCheckMark /></span><li>{benefit}</li>
                </ul>
                ))}
            </div>
        
      </div>
    </section>
  );
}
