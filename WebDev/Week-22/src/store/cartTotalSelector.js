import {create} from "zustand"
import {useCartStore} from "./cartItemsState"

const useCartTotalSelector = () => {
    const cartItems =  useCartStore.getState().cartItems
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    return {
        totalPrice,
        totalQuantity
    }
}

export default useCartTotalSelector