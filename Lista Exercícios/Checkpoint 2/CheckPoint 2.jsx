import { useState } from 'react';
import './App.css';

function BarraVida() {
  const [count, setCount] = useState(100);
  const corVida = (count) => {
    if (count > 70) return "#00ff2aff";
    if (count <= 70 && count > 30) return "#fffc69ff";
    else return "#ff0000f5";
  };
  return (
    <div>
      <h2 style={{ color: corVida(count) }}>
        HP: {count}
        {count < 30 && <span style={{ color: "#ff0000ff", marginLeft: "10px" }}>Vida Baixa</span>}
      </h2>
      <button onClick={() => setCount(count + 10)}>CURA (+10HP)</button>
      <button onClick={() => setCount(count - 15)}>DANO (-15HP)</button>
    </div>
  );
}

function SistemaXP() {
  const [nivel, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const xpProximoLevel = 300;

  const adicionarXp = (quantidade) => {
    const xpTotal = xp + quantidade;
    if (xpTotal >= xpProximoLevel) {
      const niveisGanhos = Math.floor(xpTotal / xpProximoLevel);
      const xpRestante = xpTotal % xpProximoLevel;
      setLevel(nivel + niveisGanhos);
      setXp(xpRestante);
    } else {
      setXp(xpTotal);
    }
  };

  const progresso = (xp / xpProximoLevel) * 100;

  return (
    <div>
      <h2>Nível: {nivel}</h2>
      <p>Experiência: {xp} / {xpProximoLevel} XP</p>
      <progress value={progresso} max = {100}/>
      <span>{progresso.toFixed(0)} %</span>
      <button onClick={() => adicionarXp(100)}>Completar missão (+100 XP)</button>
      <button onClick={() => adicionarXp(50)}>Derrotar inimigo (+50 XP)</button>
    </div>
  );
}

function Inventario() {
  const [aberto, setAberto] = useState(false);

  const itens = [
    '🗡️ Espada',
    '🧪 Poção',
    '🗺️ Mapa',
    '🔦 Lanterna'
  ];

  const alterarInventario = () => {
    setAberto(!aberto);
  };

  return (
    <div>
      <h2>Inventário do Aventureiro</h2>
      <button onClick={alterarInventario}>
        {aberto ? 'Fechar Inventário' : 'Abrir Inventário'}
      </button>
      {aberto ? (
        <div className="lista-itens">
          <p>Itens no Inventário:</p>
          <ul>
            {itens.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mochila-fechada">
          <p>Inventário Fechado 🎒</p>
        </div>
      )}
    </div>
  );
}

function DiarioMissoes() {
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('Principal');
  const [lista, setLista] = useState([]);

  const adicionarMissao = () => {
    if (texto.trim() !== '') {
      setLista([...lista,{ texto, categoria, concluida: false }
      ]);
      setTexto('');
      setCategoria('Principal');
    }
  };

  const alternarConclusao = (index) => {
    setLista(lista.map((m, i) =>
      i === index ? { ...m, concluida: !m.concluida } : m
    ));
  };

  const completas = lista.filter(m => m.concluida).length;

  return (
    <div>
      <h2>Diário de Missões</h2>
      <input
        type="text"
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Digite uma missão"
        style={{ width: "108px" }}
      />
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="Principal">Principal</option>
        <option value="Secundária">Secundária</option>
        <option value="Urgente">Urgente</option>
      </select>
      <button onClick={adicionarMissao}>Adicionar</button>
      <ul>
        {lista.map((missao, idx) => (
          <li key={idx}>
            <input
              type="checkbox"
              checked={missao.concluida}
              onChange={() => alternarConclusao(idx)}
            />
            {missao.texto} ({missao.categoria})
          </li>
        ))}
      </ul>
      <p>Missões em andamento: {lista.length - completas}</p>
      <p>Missões completas: {completas}</p>
    </div>
  );
}

function GeradorEncantamentos() {
  const [palavraBase, setPalavraBase] = useState('');
  const [encantamento, setEncantamento] = useState('');

  const PalavraMagica = ['Soledade', 'Souza', 'Lindesay', 'Tannus', 'Mendes', 'Brito', 'Mendonça', 
  'Seergey', 'Beethoven', 'Carmo', 'João', 'Batalha', 'Michellini', 
  'Batista', 'De Sá'];

  const gerarEncantamento = () => {
    if (palavraBase.trim() === '') {
      setEncantamento('');
      return;
    }
    const baseInvertida = palavraBase.split('').reverse().join('');
    const p_m = PalavraMagica[Math.floor(Math.random() * PalavraMagica.length)];
    setEncantamento(`${baseInvertida.toUpperCase()} ${p_m}!`);
  };

  return (
    <div>
      <h2>Gerador de Encantamentos</h2>
      <input
        type="text"
        value={palavraBase}
        onChange={e => setPalavraBase(e.target.value)}
        placeholder="Digite palavra mágica base"
        style={{ width: "158px" }}
      />
      <button onClick={gerarEncantamento}>Gerar Encantamento</button>
      {encantamento && (
        <div>
          <h3>Encantamento Gerado:</h3>
          <p>{encantamento}</p>
        </div>
      )}
    </div>
  );
}

function RankingHerois() {
  const classes = ['Guerreiro', 'Mago', 'Arqueiro'];
  const Emojis = {
    Guerreiro: '🗡️',
    Mago: '🧙‍♂️',
    Arqueiro: '🏹'
  };
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState(1);
  const [classe, setClasse] = useState(classes[0]);
  const [herois, setHerois] = useState([]);

  function adicionarHeroi() {
    if (nome.trim() === '' || nivel < 1) return;
    setHerois([
      ...herois,
      { nome, nivel: Number(nivel), classe }
    ]);
    setNome('');
    setNivel(1);
    setClasse(classes[0]);
  }

  function editarNivel(index, novoNivel) {
    setHerois(herois => herois.map((h, i) =>
      i === index ? { ...h, nivel: Number(novoNivel) } : h
    ));
  }

  const heroisOrdenados = [...herois].sort((a, b) => b.nivel - a.nivel);

  return (
    <div>
      <h2>Ranking dos Heróis</h2>
      <input
        type="text"
        placeholder="Nome do companheiro"
        style={{ width: "132px" }}
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        type="number"
        min={1}
        value={nivel}
        style={{ width: "50px" }}
        onChange={e => setNivel(e.target.value)}
      />
      <select
        value={classe}
        onChange={e => setClasse(e.target.value)}
      >
        {classes.map((c, i) => (
          <option value={c} key={i}>{c}</option>
        ))}
      </select>
      <button onClick={adicionarHeroi}>Adicionar ao Ranking</button>

      <ul>
        {heroisOrdenados.map((h, idx) => (
          <li key={idx}>
            {Emojis[h.classe]} <b>{h.nome}</b> -
            <input
              type="number"
              min={1}
              value={h.nivel}
              onChange={e => editarNivel(herois.indexOf(h), e.target.value)}
              style={{ width: "45px", margin: "0 7px" }}
            /> 
            {h.classe}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SistemaAtributos() {
  const [pontos, setPontos] = useState(10);
  const [atributos, setAtributos] = useState({
    Forca: 0,
    Resistencia: 0,
    Inteligencia: 0,
    Sorte: 0
  });

  function incrementar(atrb) {
    if (pontos > 0) {
      setAtributos(atrbs => ({
        ...atrbs,
        [atrb]: atrbs[atrb] + 1
      }));
      setPontos(p => p - 1);
    }
  }

  function decrementar(atrb) {
    if (atributos[atrb] > 0) {
      setAtributos(atrbs => ({
        ...atrbs,
        [atrb]: atrbs[atrb] - 1
      }));
      setPontos(p => p + 1);
    }
  }

  return (
    <div>
      <h2>Sistema de Atributos</h2>
      <p>Pontos restantes: {pontos}</p>
      <ul>
        <li>
          Força ({atributos.Forca}) 
          <button onClick={() => incrementar('Forca')}>+</button>
          <button onClick={() => decrementar('Forca')}>-</button>
        </li>
        <li>
          Resistência ({atributos.Resistencia}) 
          <button onClick={() => incrementar('Resistencia')}>+</button>
          <button onClick={() => decrementar('Resistencia')}>-</button>
        </li>
        <li>
          Inteligência ({atributos.Inteligencia}) 
          <button onClick={() => incrementar('Inteligencia')}>+</button>
          <button onClick={() => decrementar('Inteligencia')}>-</button>
        </li>
        <li>
          Sorte ({atributos.Sorte}) 
          <button onClick={() => incrementar('Sorte')}>+</button>
          <button onClick={() => decrementar('Sorte')}>-</button>
        </li>
      </ul>
    </div>
  );
}

function PainelPersonagem() {
  const statusEffect = ['Fraqueza', 'Lentidão', 'Regeneração', 'Cegueira', 'Velocidade', 'Força'];
  const classes = ['Guerreiro', 'Mago', 'Arqueiro'];
  const racas = ['Humano', 'Fada', 'Dragão', 'Elfo'];
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState(racas[0]);
  const [classe, setClasse] = useState(classes[0]);
  const [mostrarEfeitos, setMostrarEfeitos] = useState(false);

  return (
    <div>
      <h1>{nome ? nome : 'Personagem sem nome'}</h1>
      <div>
        <label>
          Nome do Personagem:
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Digite o nome"
            style={{ width: "80px" }}
          />
        </label>
      </div>
      <div>
        <label>
          Raça:
          <select value={raca} onChange={e => setRaca(e.target.value)}>
            {racas.map((r, idx) => (
              <option value={r} key={idx}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          Classe:
          <select value={classe} onChange={e => setClasse(e.target.value)}>
            {classes.map((c, idx) => (
              <option value={c} key={idx}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <button onClick={() => setMostrarEfeitos(e => !e)}>
          {mostrarEfeitos ? 'Ocultar Status Effects' : 'Mostrar Status Effects'}
        </button>
        {mostrarEfeitos && (
          <ul>
            {statusEffect.map((e, idx) => (
              <li key={idx}>{e}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
function SistemaEconomico() {
  const [ouro, setOuro] = useState(50);
  const [mostrarLoja, setMostrarLoja] = useState(false);
  const itensLoja = [
    { nome: 'Poção de Vida', preco: 15 },
    { nome: 'Espada Curta', preco: 25 },
    { nome: 'Mapa Misterioso', preco: 20 }
  ];

  function ganharOuro() {
    setOuro(ouro + 25);
  }

  function gastarOuro(valor) {
    if (ouro >= valor) setOuro(ouro - valor);
  }

  return (
    <div>
      <h2>Sistema Econômico</h2>
      <p>Ouro: {ouro} 🪙</p>
      <button onClick={ganharOuro}>Ganhar Ouro (+25 por missão)</button>
      <button onClick={() => gastarOuro(15)}>Gastar Ouro (-15 por item)</button>
      <br />
      <button onClick={() => setMostrarLoja(s => !s)}>
        {mostrarLoja ? "Ocultar Loja" : "Mostrar Loja"}
      </button>
      {mostrarLoja && (
        <div>
          <h4>Loja de Itens</h4>
          <ul>
            {itensLoja.map((item, idx) => (
              <li key={idx}>
                {item.nome} - {item.preco} ouro
                <button
                  onClick={() => gastarOuro(item.preco)}
                  disabled={ouro < item.preco}
                >
                  Comprar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <PainelPersonagem/>
      <BarraVida vida={100} />
      <SistemaXP />
      <Inventario />
      <DiarioMissoes />
      <GeradorEncantamentos />
      <RankingHerois />
      <SistemaAtributos />
      <SistemaEconomico />
    </div>
  );
}

export default App
