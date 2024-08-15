// Created by Rhushabh Bontapalle
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import SizePopup from '../components/SizePopup';
import Pagination from '../components/Pagination';
import styles from '../styles/ViewProductsPage.module.css';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ViewProductsPage = () => {
  const { auth } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({ color: '', type: '', search: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const filterProducts = useCallback(() => {
    let filtered = products;
    if (filters.color) {
      filtered = filtered.filter((product) => product.color === filters.color);
    }
    if (filters.type) {
      filtered = filtered.filter((product) => product.type === filters.type);
    }
    if (filters.search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [filters, products]);

  useEffect(() => {
    filterProducts();
  }, [filters, filterProducts]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  const handleSearch = (search) => {
    setFilters({ ...filters, search });
    setCurrentPage(1);
  };

  const handleAddToCart = (product, size) => {
    addToCart({ ...product, size });
    alert('Added to cart');
  };

  const handleCardClick = (product) => {
    if (
      product.type === 'shirt' ||
      product.type === 'shorts' ||
      product.type === 'sweatshirt'
    ) {
      setSelectedProduct(product);
    } else {
      handleAddToCart(product);
    }
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles['view-products-page']}>
      <h1>View Products</h1>
      <div className={styles.filters}>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className={styles['search-bar']}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles['products-grid']}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      {selectedProduct && (
        <SizePopup
          product={selectedProduct}
          onClose={closePopup}
          onAddToCart={handleAddToCart}
        />
      )}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ViewProductsPage;
