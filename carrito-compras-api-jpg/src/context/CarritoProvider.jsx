import { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';

// Estado inicial del carrito
const initialState = [];

// Reductor que gestiona las acciones del carrito
const comprasReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // Caso para agregar una compra al carrito
    case '[CARRITO] Agregar Compra':
      return [...state, action.payload];

    // Caso para aumentar la cantidad de una compra en el carrito
    case '[CARRITO] Aumentar Cantidad Compra':
      return state.map(item => {
        const cant = item.cantidad + 1;
        if (item.id === action.payload) return { ...item, cantidad: cant };
        return item;
      });

    // Caso para disminuir la cantidad de una compra en el carrito
    case '[CARRITO] Disminuir Cantidad Compra':
      return state.map(item => {
        const cant = item.cantidad - 1;
        if (item.id === action.payload && item.cantidad > 1) return { ...item, cantidad: cant };
        return item;
      });

    // Caso para eliminar una compra del carrito
    case '[CARRITO] Eliminar Compra':
      return state.filter(compra => compra.id !== action.payload);

    // Caso por defecto, mantener el estado actual en caso de acción desconocida
    default:
      return state;
  }
};

// Proveedor del contexto del carrito
export const CarritoProvider = ({ children }) => {
  // Utilizar el reductor y el estado inicial
  const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

  // Función para agregar una compra al carrito
  const agregarCompra = compra => {
    compra.cantidad = 1;
    const action = {
      type: '[CARRITO] Agregar Compra',
      payload: compra,
    };
    dispatch(action);
  };

  // Función para aumentar la cantidad de una compra en el carrito
  const aumentarCantidad = id => {
    const action = {
      type: '[CARRITO] Aumentar Cantidad Compra',
      payload: id,
    };
    dispatch(action);
  };

  // Función para disminuir la cantidad de una compra en el carrito
  const disminuirCantidad = id => {
    const action = {
      type: '[CARRITO] Disminuir Cantidad Compra',
      payload: id,
    };
    dispatch(action);
  };

  // Función para eliminar una compra del carrito
  const eliminarCompra = id => {
    const action = {
      type: '[CARRITO] Eliminar Compra',
      payload: id,
    };
    dispatch(action);
  };

  // Proporcionar el contexto del carrito y las funciones a los componentes hijos
  return (
    <CarritoContext.Provider
      value={{ listaCompras, agregarCompra, aumentarCantidad, disminuirCantidad, eliminarCompra }}
    >
      {children}
    </CarritoContext.Provider>
  );
};