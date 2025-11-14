function PlacarDeJogos() {
  const [time, setTime] = useState('');
  const [pontos, setPontos] = useState('');
  const [lista, setLista] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editPontos, setEditPontos] = useState('');

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

  const salvarEdicao = (index) => {
    const valor = parseInt(editPontos, 10);
    if (Number.isNaN(valor)) return;
    const novaLista = lista.map((item, idx) =>
      idx === index ? { ...item, pontos: valor } : item
    ).sort((a, b) => b.pontos - a.pontos);
    setLista(novaLista);
    setEditIndex(null);
    setEditPontos('');
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
          <li key={`${t.nome_time}-${index}`}>
            {t.nome_time}: 
            {editIndex === index ? (
              <>
                <input
                  type="number"
                  value={editPontos}
                  onChange={e => setEditPontos(e.target.value)}
                  placeholder="Nova pontuação"
                />
                <button onClick={() => salvarEdicao(index)}>Salvar</button>
                <button onClick={() => setEditIndex(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {t.pontos} pts
                <button onClick={() => { setEditIndex(index); setEditPontos(String(t.pontos)); }}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PlacarDeJogos