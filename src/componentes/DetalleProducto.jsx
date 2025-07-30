import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id, ...docSnap.data() });
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.error("Error al traer producto:", error);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const handleAgregar = () => {
    const confirmacion = window.confirm("¿Estás seguro de que querés agregar este producto al carrito?");
    if (confirmacion) {
      agregarAlCarrito(producto, Number(cantidad));
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "20px" }}>
        ← Volver
      </button>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{
          width: "100%",
          borderRadius: "12px",
          border: "3px solid #cc0000",
          boxShadow: hover
            ? "0 8px 16px rgba(0,0,0,0.4)"
            : "0 4px 8px rgba(0,0,0,0.2)",
          transition: "box-shadow 0.3s ease",
          marginBottom: "20px",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <h2 style={{ color: "#cc0000", marginTop: "20px" }}>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}>${producto.precio}</p>
      <div style={{ marginTop: "30px", display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          style={{
            width: "150px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <button
        className="boton-click"
        onClick={handleAgregar}
        style={{
          backgroundColor: "#cc0000",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Añadir al carrito
      </button>
      </div>
    </div>
  );
};

export default DetalleProducto;


