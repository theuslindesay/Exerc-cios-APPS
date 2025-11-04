import { useState } from 'react';
import './App.css';

function Mostrar_Esconder() {
  const [mostrar, setMostrar] = useState(true);
  return (
    <div>
      <button onClick={() => setMostrar(!mostrar)}>
        {mostrar ? 'Esconder' : 'Mostrar'}
      </button>
      {mostrar && <p>Hello</p>}
    </div>
  );
}

export default Mostrar_Esconder;
