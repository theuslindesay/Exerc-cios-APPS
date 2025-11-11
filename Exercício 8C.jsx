function PlacarDeJogos() {
  const [time, setTime] = useState('');
  const [pontos, setPontos] = useState('');
  const [lista, setLista] = useState([]);

  const adicionarTime = () => {
    const nome = time.trim();
    const valor = parseInt(pontos, 10);
    if (!nome) return;
    if (Number.isNaN(valor)) return;

    const novo = { nome_time: nome, pontos: valor };
    const novaLista = [...lista, novo].sort((a, b) => b.pontos - a.pontos);

    setLista(novaLista);
    setTime('');
    setPontos('');
  };

  return (
    <div>
      <h2>Placar de Jogos</h2>
      <div>
        <input
          type="text"
          value={time}
          onChange={e => setTime(e.target.value)}
          placeholder="Digite um time"
        />
        <input
          type="number"
          value={pontos}
          onChange={e => setPontos(e.target.value)}
          placeholder="Pontos"
        />
        <button onClick={adicionarTime}>Novo Time</button>
      </div>
      <ul>
        {lista.map((t, index) => (
          <li key={`${t.nome_time}-${index}`}>{t.nome_time} - {t.pontos} pts</li>
        ))}
      </ul>
    </div>
  );
}
export default PlacarDeJogos
