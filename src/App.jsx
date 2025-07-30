import React, { useState, useContext, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Productos from './componentes/Productos';
import DetalleProducto from './componentes/DetalleProducto';
import { CartProvider } from "./componentes/CartContext";
import { CartContext } from "./componentes/CartContext";
import { db } from "./firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";

function App() {
  return (
    <CartProvider>
    <Router>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <NavBar />
          <div style={{ flex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
            <Routes>
              <Route path="/" element={<Contenedor seccion="inicio" />} />
              <Route path="/nosotros" element={<Nosotros />} />
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
    </CartProvider>
  );
}


const NavBar = () => {
  const location = useLocation();
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const [hoverCarrito, setHoverCarrito] = useState(false);
  const [hoverLink, setHoverLink] = useState(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const carritoRef = useRef(null);
  const iconoCarritoRef = useRef(null);
  const [ordenConfirmada, setOrdenConfirmada] = useState(null);
  const [mostrarTicket, setMostrarTicket] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        carritoAbierto &&
        carritoRef.current &&
        !carritoRef.current.contains(event.target) &&
        iconoCarritoRef.current &&
        !iconoCarritoRef.current.contains(event.target)
      ) {
        setCarritoAbierto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [carritoAbierto]);

  const linkStyle = (paths) => {
    if (!Array.isArray(paths)) {
      paths = [paths];
    }

    
    const esActivo = paths.some(path => 
      location.pathname === path || location.pathname.startsWith(path + "/")
    );

    return {
      color: esActivo || hoverLink === paths ? "#cc0000" : "white",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: esActivo || hoverLink === paths ? "bold" : "normal",
      borderBottom: esActivo || hoverLink === paths ? "2px solid #cc0000" : "2px solid transparent",
      paddingBottom: "2px",
      transition: "all 0.3s ease",
      cursor: "pointer",
    };
  };

  const confirmarCompra = async () => {
  if (carrito.length === 0) return;

  const confirmacion = window.confirm(
    "¿Estás seguro de que querés confirmar la compra? ¡Vamos a procesar tu pedido!"
  );

  if (!confirmacion) return;

  const orden = {
    productos: carrito.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precio: item.precio,
      total: item.precio * item.cantidad,
    })),
    total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    fecha: Timestamp.now(),
  };

  try {
    const docRef = await addDoc(collection(db, "orden_de_compra"), orden);
    // Guardar orden y mostrar ticket
    setOrdenConfirmada({
      id: docRef.id,
      ...orden,
      fecha: new Date().toLocaleString(), 
    });
    setMostrarTicket(true);
    setCarritoAbierto(false);
    vaciarCarrito();
  } catch (error) {
    console.error("Error al generar la orden:", error);
    alert("Hubo un error al generar la orden.");
  }
};

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <img
            src="/imagenes/dragonsinfondo.png"
            alt="Logo dragón"
            style={styles.logoImg}
          />
          <span
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "28px",
              cursor: "pointer",
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
            style={linkStyle("/")}
            onMouseEnter={() => setHoverLink("/")}
            onMouseLeave={() => setHoverLink(null)}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/nosotros"
            style={linkStyle("/nosotros")}
            onMouseEnter={() => setHoverLink("/nosotros")}
            onMouseLeave={() => setHoverLink(null)}
          >
            Nosotros
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            style={linkStyle(["/productos", "/catalogo", "/categorias", "/producto"])}
            onMouseEnter={() => setHoverLink("/productos")}
            onMouseLeave={() => setHoverLink(null)}
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            style={linkStyle("/contacto")}
            onMouseEnter={() => setHoverLink("/contacto")}
            onMouseLeave={() => setHoverLink(null)}
          >
            Contacto
          </Link>
        </li>
      </ul>

      <div
        ref={iconoCarritoRef}
        style={{
          ...styles.cartWidget,
          transform: carritoAbierto ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.3s ease",
          color: carritoAbierto ? "#cc0000" : "white",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={(e) => {
          if (!carritoAbierto) {
            setCarritoAbierto(true);
          }
        }}
      >
        🛒
        {carritoAbierto && (
          <div ref={carritoRef} style={styles.popoverCarrito}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, color: "#cc0000" }}>Carrito</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCarritoAbierto(false);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "#cc0000",
                }}
              >
                ✕
              </button>
            </div>

            {carrito.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <>
                <ul style={styles.listaCarrito}>
                  {carrito.map((item) => (
                    <li key={item.id} style={styles.itemCarrito}>
                      <strong>{item.nombre}</strong>
                      <br />
                      Cantidad: {item.cantidad}
                      <br />
                      Precio unitario: ${item.precio}
                      <br />
                      Total: ${item.precio * item.cantidad}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "15px", fontWeight: "bold", textAlign: "right" }}>
                  Total general: ${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)}
                </div>
                <button
                  onClick={confirmarCompra}
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#cc0000",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "transform 0.1s ease",
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.95)"}
                  onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Confirmar compra
                </button>
              </>
            )}
          </div>
        )}
        {mostrarTicket && ordenConfirmada && (
          <div style={styles.popoverTicket} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: "#cc0000", marginBottom: "10px" }}>Ticket de Compra</h3>
            <p><strong>ID de la Orden:</strong> {ordenConfirmada.id}</p>
            <p><strong>Fecha:</strong> {ordenConfirmada.fecha}</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {ordenConfirmada.productos.map((item) => (
                <li key={item.id} style={{ marginBottom: "12px" }}>
                  <div style={{ fontWeight: "bold", color: "black" }}>{item.nombre}</div>
                  <div>Cantidad: {item.cantidad}</div>
                  <div>Precio unitario: ${item.precio}</div>
                  <div>Total: ${item.total}</div>
                </li>
              ))}
            </ul>
            <p style={{ fontWeight: "bold", fontSize: "18px", textAlign: "right" }}>
              Total a pagar: ${ordenConfirmada.total}
            </p>
            <div style={{ marginTop: "20px", textAlign: "center", color: "#444", fontStyle: "italic", fontSize: "14px" }}>
              🎉 <strong>¡Gracias por tu compra!</strong><br />
              Apreciamos tu confianza en <strong>DRAGON360</strong>.<br />
              Si necesitás algo más, ¡estamos siempre a tu disposición!
            </div>
            <button
              onClick={() => setMostrarTicket(false)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                backgroundColor: "#cc0000",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        )}
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

const Nosotros = () => {
  return (
    <div style={styles.contenedor}>
      <h2 style={styles.bienvenida}>Nosotros</h2>
      <p style={styles.descripcion}>
        En DRAGON360 somos apasionados por las artes marciales y la cultura tradicional. 
        Fundada en 2010, nuestra empresa se dedica a ofrecer productos artesanales de alta calidad para
        coleccionistas y practicantes de artes marciales en todo el mundo.
      </p>
      <p style={styles.descripcion}>
        Nuestro equipo está formado por expertos artesanos y profesionales que se esfuerzan por preservar
        técnicas ancestrales y ofrecer piezas únicas con una atención al detalle insuperable.
      </p>
      <p style={styles.descripcion}>
        Valoramos la tradición, la calidad y la confianza de nuestros clientes. Estamos comprometidos
        a brindar la mejor experiencia y los productos más auténticos del mercado.
      </p>
    </div>
  );
};


const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerLogo}>
        <img
          src="/imagenes/dragonsinfondo.png"
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

  
  const filtro = (producto) => {
    if (
      !mostrarArmasTradicionales &&
      !mostrarEquipamientoGeneral &&
      !mostrarAccesorios
    ) {
      return true;
    }

    return (
      (mostrarArmasTradicionales && producto.categoria === "Armas Blancas Tradicionales") ||
      (mostrarEquipamientoGeneral && producto.categoria === "Equipamiento General") ||
      (mostrarAccesorios && producto.categoria === "Accesorios y Exhibición")
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
            backgroundColor: hoverLink === "catalogo" ? "#e0e0e0" : "#f0f0f0",
            transform: hoverLink === "catalogo" ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hoverLink === "catalogo" ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={() => setHoverLink("catalogo")}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo Principal
        </Link>
        <Link
          to="/categorias"
          style={{
            ...styles.catalogoButtonLink,
            backgroundColor: hoverLink === "categorias" ? "#e0e0e0" : "#f0f0f0",
            transform: hoverLink === "categorias" ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hoverLink === "categorias" ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={() => setHoverLink("categorias")}
          onMouseLeave={() => setHoverLink(null)}
        >
          Catálogo por Categoría
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "20px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <label style={{ fontSize: "16px" }}>
          <input
            type="checkbox"
            checked={mostrarArmasTradicionales}
            onChange={() => setMostrarArmasTradicionales(!mostrarArmasTradicionales)}
            style={{ marginRight: "8px", transform: "scale(1.3)" }}
          />
          Armas Blancas Tradicionales
        </label>

        <label style={{ fontSize: "16px" }}>
          <input
            type="checkbox"
            checked={mostrarEquipamientoGeneral}
            onChange={() => setMostrarEquipamientoGeneral(!mostrarEquipamientoGeneral)}
            style={{ marginRight: "8px", transform: "scale(1.3)" }}
          />
          Equipamiento General
        </label>

        <label style={{ fontSize: "16px" }}>
          <input
            type="checkbox"
            checked={mostrarAccesorios}
            onChange={() => setMostrarAccesorios(!mostrarAccesorios)}
            style={{ marginRight: "8px", transform: "scale(1.3)" }}
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
    height: '80px',
    overflow: 'visible',
  },
   popoverCarrito: {
    position: 'absolute',
    top: '80px',
    right: 0,
    backgroundColor: '#eeeeee',
    color: '#000',
    padding: '20px', 
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    width: '350px',       
    maxHeight: '400px',   
    overflowY: 'auto',
    zIndex: 1100,
    textAlign: 'left',
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
    gap: '40px',
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',  
    flexGrow: 1,  
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  cartWidget: {
    fontSize: '26px',
    cursor: 'pointer',
    marginLeft: '50px',  
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
},

popoverTicket: {
  position: "absolute",
  top: "80px",
  right: "350px",       
  backgroundColor: "#fff8e1",
  color: "#333",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
  width: "450px",       
  maxHeight: "500px",   
  overflowY: "auto",
  zIndex: 1200,
  fontFamily: "'Courier New', Courier, monospace",
  border: "2px dashed #cc0000",
  textAlign: "left",
  userSelect: "none",
  whiteSpace: "pre-wrap",
},
};

export default App;







