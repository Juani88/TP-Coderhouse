
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad) => {
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) {
      setCarrito((prev) =>
        prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

