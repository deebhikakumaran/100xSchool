import React from 'react'
import "./ProductModal.css"

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>Price: ${product.price.toFixed(2)}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal