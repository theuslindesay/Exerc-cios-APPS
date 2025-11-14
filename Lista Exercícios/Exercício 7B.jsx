import { useState } from 'react';
import './App.css';

function InputTempoReal() {
  const [texto, setTexto] = useState('');
  const texto_maiusculo = texto.toUpperCase();

  return (
    <div>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite algo: "
      />
      <h2>Você digitou: {texto_maiusculo}</h2>
    </div>
  );
}

export default InputTempoReal;
