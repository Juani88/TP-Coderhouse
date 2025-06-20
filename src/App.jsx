import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [seccionActual, setSeccionActual] = useState('');
  const [esMovil, setEsMovil] = useState(window.innerWidth <= 600);
  const [alturaNav, setAlturaNav] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setEsMovil(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);

    // Medir altura navbar cada vez que cambia esMovil o se monta
    if (navRef.current) {
      setAlturaNav(navRef.current.offsetHeight);
    }

    // Re-medir también al cambiar tamaño (porque puede cambiar altura)
    const resizeObserver = () => {
      if (navRef.current) {
        setAlturaNav(navRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', resizeObserver);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', resizeObserver);
    };
  }, [esMovil]);

  // Estilos adaptados
  const navbarStyle = {
    ...styles.navbar,
    flexDirection: esMovil ? 'column' : 'row',
    padding: esMovil ? '10px 15px' : '20px 30px',
    alignItems: esMovil ? 'flex-start' : 'center',
  };

  // En el contenedor usamos alturaNav para poner paddingTop dinámico:
  const contenedorStyle = {
    ...styles.contenedor,
    paddingTop: alturaNav , // 20px extra para separar un poco
    paddingLeft: esMovil ? '10px' : '20px',
    paddingRight: esMovil ? '10px' : '20px',
  };

  // ... resto igual, NavBar recibe ref, etc.

  const NavBar = () => (
    <nav style={navbarStyle} ref={navRef}>
      <div style={{ ...styles.logo, fontSize: esMovil ? '22px' : '28px' }}>
        <img
          src="imagenes/dragonsinfondo.png"
          alt="Logo dragón"
          style={{
            ...styles.logoImg,
            width: esMovil ? '40px' : '50px',
            height: esMovil ? '40px' : '50px',
          }}
        />
        DRAGON360
      </div>
      <ul
        style={{
          ...styles.navLinks,
          flexDirection: esMovil ? 'column' : 'row',
          gap: esMovil ? '10px' : '20px',
          marginTop: esMovil ? '10px' : '0',
        }}
      >
        <li>
          <a
            href="#inicio"
            style={styles.link}
            onClick={() => setSeccionActual('')}
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="#productos"
            style={styles.link}
            onClick={() => setSeccionActual('Productos')}
          >
            Productos
          </a>
        </li>
        <li>
          <a
            href="#contacto"
            style={styles.link}
            onClick={() => setSeccionActual('Contacto')}
          >
            Contacto
          </a>
        </li>
      </ul>
      <div
        style={{
          ...styles.cartWidget,
          fontSize: esMovil ? '22px' : '26px',
          marginTop: esMovil ? '10px' : '0',
        }}
      >
        🛒
      </div>
    </nav>
  );

  const Contenedor = ({ seccion }) => {
    let titulo = '¡Bienvenido a DRAGON360!';
    let descripcion = 'Tu tienda de armas blancas, artes marciales y más.';

    if (seccion === 'Productos') {
      titulo = 'Productos';
      descripcion =
        'Explorá nuestra selección de armas artesanales y artículos para artes marciales.';
    } else if (seccion === 'Contacto') {
      titulo = 'Contacto';
      descripcion = '¿Querés comunicarte con nosotros? Acá encontrás nuestras vías de contacto.';
    }

    return (
      <div style={contenedorStyle}>
        <h2 style={{ ...styles.bienvenida, fontSize: esMovil ? '20px' : '24px' }}>{titulo}</h2>
        <p style={{ ...styles.descripcion, fontSize: esMovil ? '16px' : '18px' }}>{descripcion}</p>
      </div>
    );
  };

  const Footer = ({ esMovil }) => (
  <footer
    style={{
      ...styles.footer,
      padding: esMovil ? '10px 15px' : '0 30px',
      height: esMovil ? 'auto' : '60px',
      flexDirection: esMovil ? 'column' : 'row',
      justifyContent: esMovil ? 'center' : 'space-between',
      alignItems: 'center',
      gap: esMovil ? '8px' : '0',
    }}
  >
    <div
      style={{
        ...styles.footerLogo,
        fontSize: esMovil ? '18px' : '20px',
        gap: esMovil ? '8px' : '10px',
        justifyContent: 'center',
        width: esMovil ? '100%' : 'auto',
      }}
    >
      <img
        src="imagenes/dragonsinfondo.png"
        alt="Logo dragón"
        style={{
          ...styles.logoImgFooter,
          width: esMovil ? '35px' : '40px',
          height: esMovil ? '35px' : '40px',
        }}
      />
      <span>DRAGON360</span>
    </div>

    <div
      style={{
        color: 'white',
        fontSize: esMovil ? '14px' : '16px',
        fontWeight: 'normal',
        textAlign: 'center',
        marginTop: esMovil ? '8px' : '0',
        width: esMovil ? '100%' : 'auto',
      }}
    >
      Copyright © 2025 DRAGON360
    </div>
  </footer>
);


  return (
    <div>
      <NavBar />
      <Contenedor seccion={seccionActual} />
      <Footer />
    </div>
  );
}

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
    width: '100vw',
    boxSizing: 'border-box',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    gap: '10px',
  },
  logoImg: {
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
    cursor: 'pointer',
  },
  cartWidget: {
    cursor: 'pointer',
  },
  contenedor: {
    // paddingTop: '100px', // Lo removemos porque ahora es dinámico
    padding: '20px',
    textAlign: 'center',
    paddingBottom: '80px', // espacio para que no quede tapado por el footer
  },
  bienvenida: {
    marginTop: '40px',
    color: '#cc0000',
  },
  descripcion: {
    marginTop: '10px',
    color: '#333',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    zIndex: 1000,
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  logoImgFooter: {
    objectFit: 'contain',
  },
};

export default App;






