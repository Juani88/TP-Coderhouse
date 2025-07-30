import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const Productos = ({ filtro = () => true }) => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [productosDB, setProductosDB] = useState([]);

  useEffect(() => {
    const traerProductos = async () => {
      try {
        const productosCol = collection(db, "productos");
        const q = query(productosCol, orderBy("precio", "asc"));
        const querySnapshot = await getDocs(q);
        const productosObtenidos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductosDB(productosObtenidos);
      } catch (error) {
        console.error("Error al traer productos desde Firestore:", error);
      }
    };

    traerProductos();
  }, []);

  return (
    <div style={styles.contenedor}>
      {productosDB.filter(filtro).map(producto => (
        <div
          key={producto.id}
          style={{
            ...styles.card,
            ...(hoveredCard === producto.id ? styles.cardHover : {})
          }}
          onMouseEnter={() => setHoveredCard(producto.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img src={producto.imagen} alt={producto.nombre} style={styles.imagen} />
          <h3 style={styles.titulo}>{producto.nombre}</h3>
          <p style={styles.descripcion}>{producto.descripcion}</p>
          <p style={styles.precio}>${producto.precio}</p>
          <button
            style={styles.boton}
            onClick={() => navigate(`/producto/${producto.id}`, { state: producto })}
          >
            Ver más detalles
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '40px',
    padding: '40px',
  },
  card: {
    width: '260px',
    height: '420px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: '#fff',
    textAlign: 'left',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
  imagen: {
    width: '100%',
    height: '160px',
    objectFit: 'contain',
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: '20px',
    margin: '15px 15px 5px',
    color: '#cc0000',
    textAlign: 'center',
  },
  descripcion: {
    fontSize: '14px',
    padding: '0 15px',
    marginBottom: '10px',
    color: '#555',
  },
  precio: {
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '0 15px 15px',
    color: '#000',
  },
  boton: {
    width: '100%',
    padding: '12px 0',
    backgroundColor: '#cc0000',
    color: '#fff',
    border: 'none',
    borderTop: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    transition: 'background-color 0.3s ease',
  }
};

export default Productos;









