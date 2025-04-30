import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { items, addItem, removeItem, clearCart } = useContext(CartContext);

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    items,
    addItem,
    removeItem,
    clearCart,
    getTotalPrice,
  };
};

export default useCart;
