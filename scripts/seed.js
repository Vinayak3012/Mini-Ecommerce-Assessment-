require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

console.log(process.env.MONGO_URI);

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and foldable design. Crystal-clear audio with deep bass.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    stock: 25,
    category: 'Electronics',
  },
  {
    name: 'Mechanical Keyboard - TKL',
    description:
      'Tenkeyless mechanical keyboard with Cherry MX Blue switches. RGB backlighting, PBT keycaps, and a durable aluminum frame.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    stock: 40,
    category: 'Electronics',
  },
  {
    name: 'Minimalist Leather Wallet',
    description:
      'Slim bifold wallet crafted from genuine full-grain leather. Holds up to 8 cards with an ID window and cash pocket.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
    stock: 60,
    category: 'Accessories',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description:
      'Double-wall insulated 32oz bottle that keeps drinks cold for 24 hours and hot for 12 hours. Leak-proof lid, BPA-free.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    stock: 80,
    category: 'Lifestyle',
  },
  {
    name: 'Portable Bluetooth Speaker',
    description:
      'Compact 360-degree speaker with 12-hour playtime, IPX7 waterproof rating, and a built-in microphone for calls.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    stock: 35,
    category: 'Electronics',
  },
  {
    name: 'Merino Wool Crew-Neck Sweater',
    description:
      'Lightweight 100% merino wool sweater. Naturally temperature-regulating, odour-resistant, and machine washable.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80',
    stock: 50,
    category: 'Clothing',
  },
  {
    name: 'Ceramic Pour-Over Coffee Set',
    description:
      'Handcrafted ceramic dripper and carafe set for specialty coffee brewing. Includes a stainless steel filter and wooden stand.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
    stock: 20,
    category: 'Kitchen',
  },
  {
    name: 'Running Shoes - Lightweight',
    description:
      'Engineered mesh upper with cushioned midsole for long-distance running. Breathable, durable, and available in multiple widths.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    stock: 45,
    category: 'Footwear',
  },
  {
    name: 'Hardcover Dot-Grid Notebook',
    description:
      'A5 dot-grid notebook with 240 pages of 100gsm acid-free paper. Lay-flat binding, ribbon bookmark, and elastic closure.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&q=80',
    stock: 100,
    category: 'Stationery',
  },
  {
    name: 'Wireless Charging Pad',
    description:
      'Qi-certified 15W fast wireless charger compatible with all Qi-enabled devices. Includes over-temperature protection and LED indicator.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=500&q=80',
    stock: 70,
    category: 'Electronics',
  },
  {
    name: 'Bamboo Desk Organiser',
    description:
      'Eco-friendly 5-compartment desk organiser made from sustainable bamboo. Holds pens, phones, cards, and small supplies.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=80',
    stock: 30,
    category: 'Office',
  },
  {
    name: 'Canvas Tote Bag',
    description:
      'Heavy-duty 12oz cotton canvas tote with reinforced handles and interior zip pocket. Machine washable and holds up to 25kg.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8b58?w=500&q=80',
    stock: 90,
    category: 'Accessories',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
