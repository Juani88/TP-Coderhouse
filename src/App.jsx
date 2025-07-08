import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Productos from './componentes/Productos';
import DetalleProducto from './componentes/DetalleProducto';

function App() {
  return (
    <Router>
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <NavBar />
        <div style={{ flex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
          <Routes>
            <Route path="/" element={<Contenedor seccion="inicio" />} />
            <Route path="/productos" element={<Contenedor seccion="productos" />} />
            <Route path="/contacto" element={<Contenedor seccion="contacto" />} />
            <Route path="/catalogo" element={<CatalogoPrincipal />} />
            <Route path="/categorias" element={<CatalogoPorCategoria />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


const NavBar = () => {
  const location = useLocation();
  const [hoverCarrito, setHoverCarrito] = useState(false);
  const [hoverLink, setHoverLink] = useState(null);

  const linkStyle = (name) => ({
    color: hoverLink === name ? '#cc0000' : 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: hoverLink === name ? 'bold' : 'normal',
    borderBottom: hoverLink === name ? '2px solid #cc0000' : '2px solid transparent',
    paddingBottom: '2px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  });

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <img
            src="imagenes/dragonsinfondo.png"
            alt="Logo dragón"
            style={styles.logoImg}
          />
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '28px',
              cursor: 'pointer',
            }}
          >
            DRAGON360
          </span>
        </Link>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link
            to="/"
            style={linkStyle('inicio')}
            onMouseEnter={() => setHoverLink('inicio')}
            onMouseLeave={() => setHoverLink(null)}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            style={linkStyle('productos')}
            onMouseEnter={() => setHoverLink('productos')}
            onMouseLeave={() => setHoverLink(null)}
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            style={linkStyle('contacto')}
            onMouseEnter={() => setHoverLink('contacto')}
            onMouseLeave={() => setHoverLink(null)}
          >
            Contacto
          </Link>
        </li>
      </ul>
      <div
        style={{
          ...styles.cartWidget,
          transform: hoverCarrito ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          color: hoverCarrito ? '#cc0000' : 'white',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHoverCarrito(true)}
        onMouseLeave={() => setHoverCarrito(false)}
      >
        🛒
      </div>
    </nav>
  );
};



const Contenedor = ({ seccion }) => {
  const [hoverLink, setHoverLink] = useState(null);

  let titulo = '¡Bienvenido a DRAGON360!';
  let descripcion = 'Tu tienda de armas blancas, artes marciales y más.';
  let contenidoExtra = null;

  if (seccion === 'productos') {
    titulo = 'Productos';
    descripcion = 'Explorá nuestra selección de armas artesanales y artículos para artes marciales.';
    contenidoExtra = (
      <div style={styles.catalogoLinksContainer}>
        <Link
          to="/catalogo"
          style={{
            ...styles.catalogoButtonLink,
            backgroundColor: hoverLink === 'catalogo' ? '#e0e0e0' : '#f0f0f0',
            transform: hoverLink === 'catalogo' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoverLink === 'catalogo' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoverLink('catalogo')}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo Principal
        </Link>
        <Link
          to="/categorias"
          style={{
            ...styles.catalogoButtonLink,
            backgroundColor: hoverLink === 'categorias' ? '#e0e0e0' : '#f0f0f0',
            transform: hoverLink === 'categorias' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoverLink === 'categorias' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoverLink('categorias')}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo por Categoría
        </Link>
      </div>
    );
  } else if (seccion === 'contacto') {
    titulo = 'Contacto';
    descripcion = '¿Querés comunicarte con nosotros? Acá encontrás nuestras vías de contacto.';
    contenidoExtra = (
      <div style={styles.cardContacto}>
        <p style={{ marginBottom: '5px' }}>
          Para cualquier consulta o sugerencia, no dudes en escribirnos. ¡Estaremos encantados de ayudarte!
        </p>
        <p><strong style={{ color: '#cc0000' }}>ejemplo@gmail.com</strong></p>
      </div>
    );
  } else if (seccion === 'inicio') {
    contenidoExtra = (
      <div style={{ marginTop: '30px' }}>
        <img
          src="imagenes/dragonsinfondo.png"
          alt="Logo Dragón Inicio"
          style={{ width: '250px', height: 'auto' }}
        />
      </div>
    );
  }

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.bienvenida}>{titulo}</h2>
      <p style={styles.descripcion}>{descripcion}</p>
      {contenidoExtra}
    </div>
  );
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerLogo}>
        <img
          src="imagenes/dragonsinfondo.png"
          alt="Logo dragón"
          style={styles.logoImgFooter}
        />
        <span>DRAGON360</span>
      </div>
      <div style={styles.footerTextoDerecha}>
        Copyright © 2025 DRAGON360
      </div>
    </footer>
  );
};

const CatalogoPrincipal = () => {
  const [hoverLink, setHoverLink] = useState(null);

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.bienvenida}>Catálogo Principal</h2>
      <p style={styles.descripcion}>Aquí verás todo nuestro catálogo de productos sin filtros.</p>
      <div style={styles.catalogoLinksContainer}>
        <Link
          to="/catalogo"
          style={{
            ...styles.catalogoButtonLink,
            backgroundColor: hoverLink === 'catalogo' ? '#e0e0e0' : '#f0f0f0',
            transform: hoverLink === 'catalogo' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoverLink === 'catalogo' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoverLink('catalogo')}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo Principal
        </Link>
        <Link
          to="/categorias"
          style={{
            ...styles.catalogoButtonLink,
            backgroundColor: hoverLink === 'categorias' ? '#e0e0e0' : '#f0f0f0',
            transform: hoverLink === 'categorias' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoverLink === 'categorias' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoverLink('categorias')}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo por Categoría
        </Link>
      </div>
      <Productos />
    </div>
  );
};



const CatalogoPorCategoria = () => {
  const [mostrarArmasTradicionales, setMostrarArmasTradicionales] = useState(false);
  const [mostrarEquipamientoGeneral, setMostrarEquipamientoGeneral] = useState(false);
  const [mostrarAccesorios, setMostrarAccesorios] = useState(false);

  const [hoverLink, setHoverLink] = useState(null);

  const idsArmasBlancas = [1, 2, 3, 4];
  const idsEquipamientoGeneral = [5, 6, 7, 8];
  const idsAccesorios = [9, 10, 11, 12];

  const filtro = (producto) => {
    if (
      !mostrarArmasTradicionales &&
      !mostrarEquipamientoGeneral &&
      !mostrarAccesorios
    ) {
      return true; // si no hay ningún filtro activo, mostrar todos
    }
    return (
      (mostrarArmasTradicionales && idsArmasBlancas.includes(producto.id)) ||
      (mostrarEquipamientoGeneral && idsEquipamientoGeneral.includes(producto.id)) ||
      (mostrarAccesorios && idsAccesorios.includes(producto.id))
    );
  };

  return (
    <div style={styles.contenedor}>
      <h2 style={styles.bienvenida}>Catálogo por Categoría</h2>
      <p style={styles.descripcion}>Seleccioná una categoría para filtrar los productos.</p>

      <div style={styles.catalogoLinksContainer}>
        <Link
          to="/catalogo"
          style={{
            ...styles.catalogoButtonLink,
            backgroundColor: hoverLink === 'catalogo' ? '#e0e0e0' : '#f0f0f0',
            transform: hoverLink === 'catalogo' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoverLink === 'catalogo' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoverLink('catalogo')}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo Principal
        </Link>
        <Link
          to="/categorias"
          style={{
            ...styles.catalogoButtonLink,
            backgroundColor: hoverLink === 'categorias' ? '#e0e0e0' : '#f0f0f0',
            transform: hoverLink === 'categorias' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoverLink === 'categorias' ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoverLink('categorias')}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo por Categoría
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '30px',
          marginTop: '20px',
          marginBottom: '20px',
          justifyContent: 'center',
        }}
      >
        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={mostrarArmasTradicionales}
            onChange={() => setMostrarArmasTradicionales(!mostrarArmasTradicionales)}
            style={{ marginRight: '8px', transform: 'scale(1.3)' }}
          />
          Armas Blancas Tradicionales
        </label>

        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={mostrarEquipamientoGeneral}
            onChange={() => setMostrarEquipamientoGeneral(!mostrarEquipamientoGeneral)}
            style={{ marginRight: '8px', transform: 'scale(1.3)' }}
          />
          Equipamiento General
        </label>

        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={mostrarAccesorios}
            onChange={() => setMostrarAccesorios(!mostrarAccesorios)}
            style={{ marginRight: '8px', transform: 'scale(1.3)' }}
          />
          Accesorios y Exhibición
        </label>
      </div>
      <Productos filtro={filtro} />
    </div>
  );
};




const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'white',
    padding: '20px 30px',
    margin: 0,
    width: '100vw',
    boxSizing: 'border-box',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImg: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  cartWidget: {
    fontSize: '26px',
    cursor: 'pointer',
  },
  contenedor: {
    textAlign: 'center',
  },
  bienvenida: {
    marginTop: '40px',
    fontSize: '24px',
    color: '#cc0000',
  },
  descripcion: {
    fontSize: '18px',
    marginTop: '10px',
    color: '#333',
  },
  cardContacto: {
    marginTop: '30px',
    marginInline: 'auto',
    maxWidth: '500px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    height: '60px',
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '0 30px',
    boxSizing: 'border-box',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  logoImgFooter: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
  },
  footerTextoDerecha: {
    marginLeft: 'auto',
    fontSize: '14px',
    color: 'white',
  },
  catalogoLinksContainer: {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  marginTop: '30px',
},

catalogoLink: {
  color: 'black',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  borderBottom: '2px solid transparent',
  paddingBottom: '4px',
},

catalogoButtonLink: {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#f0f0f0',
  color: '#000',
  textDecoration: 'none',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
}


};

export default App;







