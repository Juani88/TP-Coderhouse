import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Productos = ({ filtro = () => true }) => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: "Katana tradicional",
      descripcion: "Forjada artesanalmente, ideal para exhibición o entrenamiento.",
      precio: 1000,
      imagen: "/imagenes/katana2.png"
    },
    {
      id: 2,
      nombre: "Sai tradicional",
      descripcion: "Par de sais tradicionales de acero, ideales para prácticas de kobudo.",
      precio: 2000,
      imagen: "/imagenes/sai.png"
    },
    {
      id: 3,
      nombre: "Nunchaku tradicional",
      descripcion: "Hecho de madera resistente con cadena metálica. Ideal para entrenamiento clásico.",
      precio: 3000,
      imagen: "/imagenes/nunchaku.jpg"
    },
    {
      id: 4,
      nombre: "Bo tradicional",
      descripcion: "Bastón largo de madera, perfecto para técnicas tradicionales de artes marciales.",
      precio: 4000,
      imagen: "/imagenes/bo.jpg"
    },
    {
      id: 5,
      nombre: "Karategi Blanco",
      descripcion: "Uniforme tradicional para karate, confeccionado en algodón resistente y cómodo.",
      precio: 5000,
      imagen: "/imagenes/karategi_blanco.png"
    },
    {
      id: 6,
      nombre: "Karategi Negro",
      descripcion: "Uniforme de karate color negro, ideal para entrenamientos avanzados y exhibiciones.",
      precio: 6000,
      imagen: "/imagenes/karategi_negro.jpg"
    },
    {
      id: 7,
      nombre: "Cinturones",
      descripcion: "Variedad de cinturones de diferentes colores para todos los niveles y estilos.",
      precio: 7000,
      imagen: "/imagenes/cinturones.jpg"
    },
    {
      id: 8,
      nombre: "Guantes de MMA",
      descripcion: "Guantes de entrenamiento para MMA, con protección y agarre óptimos.",
      precio: 8000,
      imagen: "/imagenes/guantes.jpg"
    },
    {
      id: 9,
      nombre: "Soporte para Katana",
      descripcion: "Elegante soporte de metal para exhibir tu katana con estilo y seguridad.",
      precio: 9000,
      imagen: "/imagenes/soporte_katana.png"
    },
    {
      id: 10,
      nombre: "Arte Samurai Legendario",
      descripcion: "Cuadro artístico que captura la esencia y fuerza del samurái en estilo tradicional.",
      precio: 10000,
      imagen: "/imagenes/cuadro_samurai.png"
    },
    {
      id: 11,
      nombre: "MiniKatana Keychain",
      descripcion: "Llavero exclusivo en miniatura de una katana, perfecto para fans y coleccionistas.",
      precio: 11000,
      imagen: "/imagenes/llavero_minikatana.jpg"
    },
    {
      id: 12,
      nombre: "Bruce Lee Legend Figure",
      descripcion: "Figura de acción detallada de Bruce Lee, un ícono eterno de las artes marciales.",
      precio: 12000,
      imagen: "/imagenes/juguete.jpg"
    }
  ];

  return (
    <div style={styles.contenedor}>
      {productos.filter(filtro).map(producto => (
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






