import React, {useState} from 'react'
import Header from "./Header"
import "./WishList.css"
import { useWishListStore } from '../store/wishItemsState'
import ProductModal from "./ProductModal"

const Card = ({product, onOpenModal}) => {
  const addToCart = useWishListStore((state) => state.addToCart)
  const removeFromWishList = useWishListStore((state) => state.removeFromWishList)

  return (
    <div className="card-item">
      <img onClick={onOpenModal} src={product.image} alt={product.name} />
      <h2 onClick={onOpenModal}>{product.name}</h2>
      <b>{product.price.toFixed(2)}</b>

      <button onClick={() => removeFromWishList(product.id)}>Remove</button>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

const WishList = () => {
  const wishList = useWishListStore((state) => state.wishList)
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className="wishlist-container">
      <Header />
      <div className="wishlist-content">
        <h2>My WishList</h2>
        {wishList.length === 0 ? (
          <div>WishList is empty</div>
        ) : (
          <div className="wishlist-grid">
            {wishList.map((product) => (
                <Card key={product.id} onOpenModal={() => setSelectedProduct(product)} product={product} />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}

export default WishList