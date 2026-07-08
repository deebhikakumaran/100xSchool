import React from 'react'
import "./PurchaseModal.css"
import { CheckCircle } from 'lucide-react';

const PurchaseModal = ({ totalPrice, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {totalPrice === 0 ? (
          <h2>Add something to cart.</h2>
        ) : (
          <>
            <CheckCircle onClick={onClose} size={48} color="#48bb78" data-testid="check-circle-icon" />
            <h2>Thank you for the purchase!</h2>
            <p>Your total amount paid was <strong>{totalPrice.toFixed(2)}</strong></p>
          </>
        )}

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>

  )
}

export default PurchaseModal