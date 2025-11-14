import { useState } from 'react';
import './App.css';

function Termometro() {
  const [count, setCount] = useState(20);

  const getCorTemperatura = (count) => {
    if (count < 19) return '#e4482e';
    if (count >= 20) return '#2e82f8';
  };

  return (
    <div>
      <h1 style={{
        color: getCorTemperatura(count),
        textAlign: 'center'
      }}>
        Termômetro Digital
      </h1>
      <div style={{ color: getCorTemperatura(count) }}>
        <h2>Temperatura: {count}°C</h2>
        <button className="aquecer-botao" onClick={() => setCount(count + 2)}>+2°C</button>
        <button className="esfriar-botao" onClick={() => setCount(count - 2)}>-2°C</button>
      </div>
    </div>
  );
}

export default Termometro;
