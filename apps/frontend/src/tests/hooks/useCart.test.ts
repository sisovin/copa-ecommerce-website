import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart } from '../../context/CartContext';
import useCartHook from '../../hooks/useCart';

describe('useCart hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCartHook(), { wrapper: CartProvider });
    expect(result.current.items).toEqual([]);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartHook(), { wrapper: CartProvider });
    const newItem = { id: 1, name: 'Test Item', price: 10.5, quantity: 2 };

    act(() => {
      result.current.addItem(newItem);
    });

    expect(result.current.items).toEqual([newItem]);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartHook(), { wrapper: CartProvider });
    const newItem = { id: 1, name: 'Test Item', price: 10.5, quantity: 2 };

    act(() => {
      result.current.addItem(newItem);
      result.current.removeItem(newItem.id);
    });

    expect(result.current.items).toEqual([]);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartHook(), { wrapper: CartProvider });
    const newItem = { id: 1, name: 'Test Item', price: 10.5, quantity: 2 };

    act(() => {
      result.current.addItem(newItem);
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
  });

  it('should calculate total price', () => {
    const { result } = renderHook(() => useCartHook(), { wrapper: CartProvider });
    const newItem1 = { id: 1, name: 'Test Item 1', price: 10.5, quantity: 2 };
    const newItem2 = { id: 2, name: 'Test Item 2', price: 5.0, quantity: 1 };

    act(() => {
      result.current.addItem(newItem1);
      result.current.addItem(newItem2);
    });

    expect(result.current.getTotalPrice()).toBe(26.0);
  });
});
