import { useState } from 'react';
import './App.css';

function SimuladorDeHumor() {
  const [humor, setHumor] = useState({emoji: '🙂', cor: '#FFD700', fala: 'Haha!'});
  const mudarHumor = (novoHumor) => {
    setHumor(novoHumor);
    document.body.style.backgroundColor = novoHumor.cor;
    alert(novoHumor.fala);
  };

  return (
    <div>
      <h2>Simulador de Humor</h2>
      <div style={{ fontSize: '100px', textAlign: 'center' }}>
        {humor.emoji}
      </div>
      <div>
        <button onClick={() => mudarHumor({emoji: '😀', cor: '#FFD700', fala: 'Haha!'})}>Feliz</button>
        <button onClick={() => mudarHumor({emoji: '😢', cor: '#1C1C1C', fala: 'Triste'})}>Triste</button>
        <button onClick={() => mudarHumor({emoji: '😡', cor: '#DC143C', fala: 'Grrr!!'})}>Raivoso</button>
        <button onClick={() => mudarHumor({emoji: '😌', cor: '#98FB98', fala: 'Ahhhh...'})}>Calmo</button>
      </div>
    </div>
  );
}

export default SimuladorDeHumor;