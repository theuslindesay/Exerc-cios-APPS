import { useState } from 'react';
import './App.css';

function AdicionarTarefas() {
  const [tarefa, setTarefa] = useState('');
  const [lista, setLista] = useState([]);

  const adicionarTarefa = () => {
    if (tarefa.trim() !== '') {
      setLista([...lista, tarefa]);
      setTarefa('');
    }
  };

  return (
    <div>
      <input type="text" value={tarefa} onChange={e => setTarefa(e.target.value)} placeholder="Digite um item"/>
      <button onClick={adicionarTarefa}>Mover Tarefa</button>
      <ul>
        {lista.map((tarefaLista, index) => (
          <li key={index}>{tarefaLista}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdicionarTarefas;
