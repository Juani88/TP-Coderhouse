import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DetalleProducto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state;

  if (!producto) {
    // Si no hay datos, podés mostrar un mensaje o redirigir
    return <p>Producto no encontrado</p>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        ← Volver
      </button>
      <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', borderRadius: '12px' }} />
      <h2 style={{ color: '#cc0000', marginTop: '20px' }}>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p style={{ fontWeight: 'bold', fontSize: '20px' }}>${producto.precio}</p>
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="number"
          min="1"
          defaultValue="1"
          style={{
            width: '150px',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px'
          }}
        />
        <button
          style={{
            backgroundColor: '#cc0000',
            color: 'white',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;
