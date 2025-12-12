import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome! I\'m here to help you find the perfect venue for your wedding celebration. How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const venues = [
    {
      id: 1,
      name: 'Royal Diamond Hall',
      image: '/images/RoyalDiamondHall.jpg',
      rating: 4.9,
      reviews: 156,
      location: 'Ramallah',
      price: 8500,
      capacity: 300,
      description: 'Luxurious hall with royal design, crystal lighting and golden decorations'
    },
    {
      id: 2,
      name: 'Golden Dreams Palace',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 203,
      location: 'Nablus',
      price: 7200,
      capacity: 250,
      description: 'Elegant palace with outdoor gardens and breathtaking panoramic views'
    },
    {
      id: 3,
      name: 'White Pearl Hall',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 178,
      location: 'Bethlehem',
      price: 9000,
      capacity: 350,
      description: 'Modern hall with contemporary design and advanced sound and lighting systems'
    },
    {
      id: 4,
      name: 'Blue Sapphire Hall',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 142,
      location: 'Hebron',
      price: 6500,
      capacity: 200,
      description: 'Elegant hall with classic decorations and warm romantic atmosphere'
    },
    {
      id: 5,
      name: 'Royal Emerald Palace',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviews: 189,
      location: 'Ramallah',
      price: 10500,
      capacity: 400,
      description: 'Most luxurious venue with VIP services and professional staff at the highest level'
    },
    {
      id: 6,
      name: 'Golden Stars Hall',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 167,
      location: 'Nablus',
      price: 7800,
      capacity: 280,
      description: 'Distinctive hall with star-studded ceiling and enchanting lighting'
    }
  ];

  const locations = ['all', 'Ramallah', 'Nablus', 'Bethlehem', 'Hebron'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'low', label: 'Under 7,000 ₪' },
    { value: 'medium', label: '7,000 - 9,000 ₪' },
    { value: 'high', label: 'Over 9,000 ₪' }
  ];
  const capacityRanges = [
    { value: 'all', label: 'All Capacities' },
    { value: 'small', label: 'Under 250 guests' },
    { value: 'medium', label: '250 - 350 guests' },
    { value: 'large', label: 'Over 350 guests' }
  ];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || venue.location === selectedLocation;
    
    const matchesPrice = selectedPrice === 'all' ||
                        (selectedPrice === 'low' && venue.price < 7000) ||
                        (selectedPrice === 'medium' && venue.price >= 7000 && venue.price <= 9000) ||
                        (selectedPrice === 'high' && venue.price > 9000);
    
    const matchesCapacity = selectedCapacity === 'all' ||
                           (selectedCapacity === 'small' && venue.capacity < 250) ||
                           (selectedCapacity === 'medium' && venue.capacity >= 250 && venue.capacity <= 350) ||
                           (selectedCapacity === 'large' && venue.capacity > 350);
    
    return matchesSearch && matchesLocation && matchesPrice && matchesCapacity;
  });

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { type: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our venue prices range from 6,500 ₪ to 10,500 ₪ depending on capacity and services offered. I can help you find a venue that fits your budget. What budget range are you considering?';
    } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return 'We have luxurious venues in Ramallah, Nablus, Bethlehem, and Hebron. Which location do you prefer for your wedding celebration?';
    } else if (lowerMessage.includes('capacity') || lowerMessage.includes('guests')) {
      return 'Our venues accommodate from 200 to 400 guests. How many guests are you expecting at your celebration?';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
      return 'Excellent! To book a venue visit appointment, please call us at 02-1234567 or you can leave your phone number and we will contact you within 24 hours.';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('feature')) {
      return 'All our venues are equipped with professional sound and lighting systems, luxurious decorations, premium hospitality service, and spacious parking. Would you like to know more about a specific venue?';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Happy to serve you. Don\'t hesitate to ask any other questions. We\'re here to make your wedding day perfect! 💍✨';
    } else {
      return 'Thank you for contacting us! I can help you with:\n• Information about prices and packages\n• Venue locations and capacities\n• Booking a visit appointment\n• Services and features\n\nWhat would you like to know?';
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const css = `
    :root{ 
      --primary: #8B7355;
      --secondary: #C9A882;
      --accent: #F5E6D3;
      --light: #FAF8F5;
      --white: #ffffff;
      --dark: #2C2416;
      --text: #3D3427;
      --text-light: #8B7E6F;
      --gold: #D4AF37;
      --gold-light: #F4E4C1;
    }
    
    body {
      background: var(--light);
      font-family: 'Playfair Display', 'Georgia', serif;
    }
    
    /* Navbar */
    .wps-navbar {
      background: rgba(255, 255, 255, 0.95) !important;
      backdrop-filter: blur(20px);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
      padding: 1.2rem 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border-bottom: 1px solid rgba(212, 175, 55, 0.1);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
    }
    
    .navbar-scrolled {
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
      padding: 0.8rem 0;
      background: rgba(255, 255, 255, 0.98) !important;
    }
    
    .brand-primary {
      color: var(--dark);
      font-weight: 700;
      font-size: 1.6rem;
      letter-spacing: 1px;
      font-family: 'Playfair Display', serif;
      text-transform: uppercase;
    }
    
    .nav-link {
      color: var(--text) !important;
      font-weight: 500;
      margin: 0 1rem;
      position: relative;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      font-family: 'Lato', sans-serif;
      letter-spacing: 0.5px;
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 50%;
      background: linear-gradient(90deg, var(--gold) 0%, var(--primary) 100%);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    .nav-link:hover::before,
    .nav-link.active::before {
      width: 100%;
    }
    
    .nav-link:hover {
      color: var(--primary) !important;
    }
    
    .nav-link.active {
      color: var(--primary) !important;
    }
    
    .btn-primary-custom {
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      border: none;
      color: var(--white);
      font-weight: 600;
      padding: 0.7rem 2rem;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
      font-family: 'Lato', sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 0.85rem;
    }
    
    .btn-primary-custom:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(212, 175, 55, 0.4);
      background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%);
      color: var(--white);
    }
    
    .venues-page {
      padding-top: 100px;
      min-height: 100vh;
    }
    
    /* Search & Filter Section */
    .search-filter-section {
      background: linear-gradient(135deg, var(--white) 0%, var(--light) 100%);
      padding: 3rem 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      margin-bottom: 3rem;
      border-radius: 20px;
    }
    
    .page-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--dark);
      text-align: center;
      margin-bottom: 1rem;
      font-family: 'Playfair Display', serif;
      position: relative;
      display: inline-block;
      width: 100%;
    }
    
    .page-title::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 4px;
      background: linear-gradient(90deg, var(--gold) 0%, var(--primary) 100%);
    }
    
    .page-subtitle {
      text-align: center;
      color: var(--text-light);
      font-size: 1.2rem;
      margin-bottom: 3rem;
      font-family: 'Lato', sans-serif;
    }
    
    .search-box {
      position: relative;
      margin-bottom: 2rem;
    }
    
    .search-input {
      width: 100%;
      padding: 1.2rem 3.5rem 1.2rem 1.5rem;
      border: 2px solid var(--gold);
      border-radius: 50px;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      background: var(--white);
      font-family: 'Lato', sans-serif;
    }
    
    .search-input:focus {
      outline: none;
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
      border-color: var(--primary);
    }
    
    .search-icon {
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gold);
      font-size: 1.3rem;
    }
    
    .filter-group {
      margin-bottom: 1.5rem;
    }
    
    .filter-label {
      display: block;
      font-weight: 600;
      color: var(--dark);
      margin-bottom: 0.5rem;
      font-family: 'Lato', sans-serif;
      font-size: 1rem;
    }
    
    .filter-select {
      width: 100%;
      padding: 0.9rem 1.2rem;
      border: 2px solid rgba(212, 175, 55, 0.3);
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: var(--white);
      font-family: 'Lato', sans-serif;
      cursor: pointer;
    }
    
    .filter-select:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
    }
    
    /* Venue Cards */
    .venues-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2.5rem;
      padding: 2rem 0;
    }
    
    .venue-card {
      background: var(--white);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      position: relative;
    }
    
    .venue-card::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: -1;
    }
    
    .venue-card:hover::before {
      opacity: 1;
    }
    
    .venue-card:hover {
      transform: translateY(-15px);
      box-shadow: 0 25px 60px rgba(212, 175, 55, 0.25);
    }
    
    .venue-image-wrapper {
      position: relative;
      height: 280px;
      overflow: hidden;
    }
    
    .venue-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    
    .venue-card:hover .venue-image {
      transform: scale(1.1);
    }
    
    .venue-badge {
      position: absolute;
      top: 20px;
      left: 20px;
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      color: var(--white);
      padding: 0.5rem 1.2rem;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.85rem;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
      font-family: 'Lato', sans-serif;
    }
    
    .venue-content {
      padding: 2rem;
    }
    
    .venue-name {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 1rem;
      font-family: 'Playfair Display', serif;
    }
    
    .venue-rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .rating-stars {
      color: var(--gold);
      font-size: 1.1rem;
    }
    
    .rating-number {
      font-weight: 600;
      color: var(--dark);
      font-family: 'Lato', sans-serif;
    }
    
    .rating-reviews {
      color: var(--text-light);
      font-size: 0.9rem;
      font-family: 'Lato', sans-serif;
    }
    
    .venue-description {
      color: var(--text);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      font-family: 'Lato', sans-serif;
    }
    
    .venue-details {
      display: flex;
      justify-content: space-between;
      padding-top: 1.5rem;
      border-top: 2px solid rgba(212, 175, 55, 0.1);
      margin-bottom: 1.5rem;
    }
    
    .venue-detail-item {
      text-align: center;
    }
    
    .detail-icon {
      font-size: 1.3rem;
      color: var(--gold);
      margin-bottom: 0.3rem;
    }
    
    .detail-label {
      font-size: 0.85rem;
      color: var(--text-light);
      font-family: 'Lato', sans-serif;
    }
    
    .detail-value {
      font-weight: 600;
      color: var(--dark);
      font-family: 'Lato', sans-serif;
    }
    
    .venue-price {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      font-family: 'Playfair Display', serif;
    }
    
    .btn-book {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      border: none;
      color: var(--white);
      font-weight: 600;
      border-radius: 50px;
      transition: all 0.4s ease;
      font-family: 'Lato', sans-serif;
      letter-spacing: 0.5px;
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
    }
    
    .btn-book:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
      background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%);
    }
    
    /* Chatbot */
    .chatbot-container {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
    }
    
    .chatbot-toggle {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      border: none;
      color: var(--white);
      font-size: 1.8rem;
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .chatbot-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 35px rgba(212, 175, 55, 0.5);
    }
    
    .chatbot-window {
      position: absolute;
      bottom: 90px;
      right: 0;
      width: 380px;
      height: 550px;
      background: var(--white);
      border-radius: 20px;
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 2px solid var(--gold);
    }
    
    .chatbot-header {
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      color: var(--white);
      padding: 1.5rem;
      font-weight: 600;
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .chatbot-close {
      background: none;
      border: none;
      color: var(--white);
      font-size: 1.5rem;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    
    .chatbot-close:hover {
      transform: scale(1.2);
    }
    
    .chatbot-messages {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
      background: var(--light);
    }
    
    .message {
      margin-bottom: 1rem;
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .message-bot {
      text-align: left;
    }
    
    .message-user {
      text-align: right;
    }
    
    .message-bubble {
      display: inline-block;
      padding: 1rem 1.3rem;
      border-radius: 18px;
      max-width: 80%;
      font-family: 'Lato', sans-serif;
      line-height: 1.5;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    
    .message-bot .message-bubble {
      background: linear-gradient(135deg, var(--gold-light) 0%, var(--accent) 100%);
      color: var(--dark);
      border-bottom-left-radius: 4px;
    }
    
    .message-user .message-bubble {
      background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%);
      color: var(--white);
      border-bottom-right-radius: 4px;
    }
    
    .chatbot-input-area {
      padding: 1rem;
      background: var(--white);
      border-top: 2px solid rgba(212, 175, 55, 0.2);
      display: flex;
      gap: 0.8rem;
    }
    
    .chatbot-input {
      flex: 1;
      padding: 0.8rem 1.2rem;
      border: 2px solid rgba(212, 175, 55, 0.3);
      border-radius: 25px;
      font-family: 'Lato', sans-serif;
      transition: all 0.3s ease;
    }
    
    .chatbot-input:focus {
      outline: none;
      border-color: var(--gold);
      box-shadow: 0 2px 10px rgba(212, 175, 55, 0.15);
    }
    
    .chatbot-send {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%);
      border: none;
      color: var(--white);
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .chatbot-send:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
    }
    
    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-light);
      font-family: 'Lato', sans-serif;
      font-size: 1.2rem;
    }
    
    /* Footer */
    footer {
      background: linear-gradient(135deg, var(--dark) 0%, #1a1410 100%);
      color: var(--white);
      padding: 5rem 0 2rem;
      position: relative;
      overflow: hidden;
      margin-top: 5rem;
    }
    
    footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
    }
    
    .footer-heading {
      color: var(--gold);
      font-weight: 600;
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      font-family: 'Playfair Display', serif;
      letter-spacing: 1px;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
    }
    
    .footer-links li {
      margin-bottom: 0.8rem;
    }
    
    .footer-links a {
      color: #c9c5c0;
      text-decoration: none;
      transition: all 0.3s ease;
      font-family: 'Lato', sans-serif;
      position: relative;
      display: inline-block;
    }
    
    .footer-links a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background: var(--gold);
      transition: width 0.3s ease;
    }
    
    .footer-links a:hover::after {
      width: 100%;
    }
    
    .footer-links a:hover {
      color: var(--gold);
      padding-left: 5px;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(212, 175, 55, 0.2);
      padding-top: 2rem;
      margin-top: 3rem;
      text-align: center;
      color: #c9c5c0;
      font-family: 'Lato', sans-serif;
    }
    
    @media (max-width: 768px) {
      .page-title {
        font-size: 2rem;
      }
      
      .venues-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .chatbot-window {
        width: calc(100vw - 40px);
        right: 50%;
        transform: translateX(50%);
      }
      
      .chatbot-container {
        right: 50%;
        transform: translateX(50%);
      }
    }
    
    /* Custom Scrollbar */
    .chatbot-messages::-webkit-scrollbar {
      width: 6px;
    }
    
    .chatbot-messages::-webkit-scrollbar-track {
      background: var(--light);
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, var(--gold) 0%, var(--primary) 100%);
      border-radius: 10px;
    }
    
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    `;

    const style = document.createElement('style');
    style.id = 'venues-page-styles';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    if (!document.querySelector('link[href*="Playfair+Display"]')) {
      document.head.appendChild(fontLink);
    }

    // Add scroll effect for navbar
    const handleScroll = () => {
      const navbar = document.querySelector('.wps-navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      const el = document.getElementById('venues-page-styles');
      if (el) el.remove();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light wps-navbar">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #8B7355 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: 'var(--white)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)'
              }}
            >
              WPS
            </motion.div>
            <span className="brand-primary">Wedding Planning System</span>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link active" href="/venues">Venues</a></li>
              <li className="nav-item"><a className="nav-link" href="/decoration">Decoration</a></li>
              <li className="nav-item"><a className="nav-link" href="/dj">DJ </a></li>
              <li className="nav-item"><a className="nav-link" href="/cakes">Cakes</a></li>
              <li className="nav-item"><a className="nav-link" href="/photography">Photography</a></li>
              <li className="nav-item ms-3"><a className="btn btn-primary-custom" href="/log in">Log in</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="venues-page">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title">Luxury Wedding Venues</h1>
            <p className="page-subtitle">Discover the most exquisite venues for your dream wedding</p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            className="search-filter-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="container">
              <div className="search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for your perfect venue..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="filter-group">
                    <label className="filter-label">Location</label>
                    <select
                      className="filter-select"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations.slice(1).map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="filter-group">
                    <label className="filter-label">Price Range</label>
                    <select
                      className="filter-select"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                    >
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="filter-group">
                    <label className="filter-label">Capacity</label>
                    <select
                      className="filter-select"
                      value={selectedCapacity}
                      onChange={(e) => setSelectedCapacity(e.target.value)}
                    >
                      {capacityRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Venues Grid */}
          {filteredVenues.length > 0 ? (
            <div className="venues-grid">
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="venue-card">
                    <div className="venue-image-wrapper">
                      <img src={venue.image} alt={venue.name} className="venue-image" />
                      {venue.rating >= 4.9 && (
                        <div className="venue-badge">Top Rated</div>
                      )}
                    </div>

                    <div className="venue-content">
                      <h3 className="venue-name">{venue.name}</h3>

                      <div className="venue-rating">
                        <span className="rating-stars">⭐</span>
                        <span className="rating-number">{venue.rating}</span>
                        <span className="rating-reviews">({venue.reviews} reviews)</span>
                      </div>

                      <p className="venue-description">{venue.description}</p>

                      <div className="venue-details">
                        <div className="venue-detail-item">
                          <div className="detail-icon">📍</div>
                          <div className="detail-label">Location</div>
                          <div className="detail-value">{venue.location}</div>
                        </div>
                        <div className="venue-detail-item">
                          <div className="detail-icon">👥</div>
                          <div className="detail-label">Capacity</div>
                          <div className="detail-value">{venue.capacity} guests</div>
                        </div>
                      </div>

                      <div className="venue-price">{venue.price.toLocaleString()} ₪</div>

                      <button className="btn-book">Book Now</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No venues found matching your search. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="brand-primary" style={{fontSize: '1.6rem', marginBottom: '1rem'}}>Wedding Planning System</div>
              <p style={{color: '#c9c5c0', fontFamily: 'Lato, sans-serif'}}>Your trusted partner in orchestrating extraordinary Palestinian wedding celebrations with unparalleled elegance and sophistication.</p>
            </div>
            <div className="col-lg-2 col-md-4 mb-4">
              <h5 className="footer-heading">Company</h5>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-4">
              <h5 className="footer-heading">Support</h5>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-4">
              <h5 className="footer-heading">Vendors</h5>
              <ul className="footer-links">
                <li><a href="#">List Your Venue</a></li>
                <li><a href="#">Join as Vendor</a></li>
                <li><a href="#">Vendor Resources</a></li>
              </ul>
            </div>
            <div className="col-lg-2 mb-4">
              <h5 className="footer-heading">Connect</h5>
              <ul className="footer-links">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Wedding Planning System. All rights reserved. Crafted with excellence.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="chatbot-container">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              className="chatbot-window"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="chatbot-header">
                <span>AI Booking Assistant</span>
                <button className="chatbot-close" onClick={() => setChatOpen(false)}>×</button>
              </div>

              <div className="chatbot-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message message-${msg.type}`}>
                    <div className="message-bubble">{msg.text}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chatbot-input-area">
                <input
                  type="text"
                  className="chatbot-input"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="chatbot-send" onClick={handleSendMessage}>
                  ➤
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="chatbot-toggle" onClick={() => setChatOpen(!chatOpen)}>
          {chatOpen ? '✕' : '💬'}
        </button>
      </div>
    </div>
  );
}