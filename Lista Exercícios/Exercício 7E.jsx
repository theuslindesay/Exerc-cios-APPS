import { useState } from 'react';
import './App.css';

import { useState } from 'react';
import './App.css';

function GeradorSenha() {
  const [texto, setTexto] = useState('');

  const textom = texto.length;
  const texto_anagrama = texto.split('').reverse().join('');
  const caracteres_esp = "@#%";

  return (
    <div>
      <h1>🔐 Gerador de Senha Mágica 🔐</h1>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite algo:"
      />
      <h2>Você digitou: {texto}</h2>
      {textom > 0 && (
        <h2>Senha Criptografada: {texto_anagrama}{texto}{caracteres_esp}</h2>
      )}
      {textom > 0 && textom < 6 && <p className="fraca">Senha: Fraca</p>}
      {textom >= 6 && textom <= 8 && <p className="media">Senha: Média</p>}
      {textom > 8 && <p className="forte">Senha: Forte</p>}
    </div>
  );
}

export default GeradorSenha;
