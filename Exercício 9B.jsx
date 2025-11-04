import { useState } from 'react';
import './App.css'

function AlterarFonte() {
  const [tamanho, setTamanho] = useState('16px');
  const mudarTamanho = (novoTamanho) => {
    setTamanho(novoTamanho);
    document.body.style.fontSize = novoTamanho;
  };

  return (
    <div>
      <h2>Alterar tamanho de fonte</h2>
      <button onClick={() => mudarTamanho('12px')}>Pequeno</button>
      <button onClick={() => mudarTamanho('16px')}>Médio</button>
      <button onClick={() => mudarTamanho('28px')}>Grande</button>
      <p style={{ fontSize: tamanho }}>
        Este texto muda de tamanho conforme você clica nos botões acima.
      </p>
    </div>
  );
}

export default AlterarFonte;