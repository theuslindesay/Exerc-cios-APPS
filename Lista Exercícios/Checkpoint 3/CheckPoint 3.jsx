import { useState, useEffect, useRef } from 'react';
import './App.css';

function Header({ titulo }) {
  return (
    <div className="header">
      <div className="marca">
        {}
        <img 
          src="https://m.media-amazon.com/images/I/51rttY7a+9L.png" 
          alt="Spotify Logo" 
          className="spotify-logo" 
        />
        {titulo}
      </div>
      <div className="user-perfil">Usuario</div>
    </div>
  );
}

function Playlists({ playlists, setPlaylists, curtidas, setPaginaAtual }) {
  const [playlistNome, setPlaylistNome] = useState("");

  const criarPlaylist = () => {
    if (!playlistNome.trim()) return;
    const novaPlaylist = { id: Date.now(), nome: playlistNome, musicas: [] };
    setPlaylists([...playlists, novaPlaylist]);
    setPlaylistNome("");

    setPaginaAtual({ tipo: 'playlist', id: novaPlaylist.id });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        {}
        <div className="playlist-item" onClick={() => setPaginaAtual({ tipo: 'home' })}>
          <span style={{ fontWeight: 'bold' }}>🏠 Início</span>
        </div>

        <h3 className="sidebar-titulo" style={{ marginTop: '20px' }}>Biblioteca</h3>
        
        {}
        <div className="playlist-item destaque" onClick={() => setPaginaAtual({ tipo: 'curtidas' })}>
          <span>❤️ Músicas Curtidas ({curtidas.length})</span>
        </div>

        <ul className="sidebar-list">
          {playlists.map((p) => (
            <li 
              key={p.id} 
              className="playlist-item"
              onClick={() => setPaginaAtual({ tipo: 'playlist', id: p.id })}
            >
              🎵 {p.nome}
            </li>
          ))}
        </ul>
      </div>

      <div className="playlist-form">
        <input
          type="text"
          placeholder="Nova Playlist..."
          value={playlistNome}
          onChange={e => setPlaylistNome(e.target.value)}
          className="playlist-input"
        />
        <button onClick={criarPlaylist} className="playlist-btn">
          + Criar
        </button>
      </div>
    </div>
  );
}

function ListaMusicas({ 
  musicas, 
  busca, 
  setBusca, 
  aoTocar, 
  musicaAtual, 
  tocando, 
  curtidas, 
  toggleCurtida, 
  paginaAtual, 
  playlists,
  adicionarAPlaylist 
}) {
  const [menuAbertoId, setMenuAbertoId] = useState(null);

  let musicasParaMostrar = musicas;

  if (paginaAtual.tipo === 'curtidas') {
    musicasParaMostrar = musicas.filter(m => curtidas.includes(m.id));
  } else if (paginaAtual.tipo === 'playlist') {
    const playlistAtual = playlists.find(p => p.id === paginaAtual.id);
    if (playlistAtual) {
      musicasParaMostrar = musicas.filter(m => playlistAtual.musicas.includes(m.id));
    } else {
      musicasParaMostrar = [];
    }
  }

  const musicasFiltradas = musicasParaMostrar.filter(m =>
    m.nome.toLowerCase().includes(busca.toLowerCase()) ||
    m.artista.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="main-content">
      <div className="barra-pesquisa">
        <input
          type="text"
          placeholder="O que você quer ouvir?"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="musica-busca"
        />
      </div>

      <div className="musicas-grid">
        {musicasFiltradas.length === 0 && <p className="empty-msg">Nenhuma música encontrada aqui.</p>}
        
        {musicasFiltradas.map(m => {
          const isPlaying = musicaAtual && musicaAtual.id === m.id && tocando;
          const isLiked = curtidas.includes(m.id);

          return (
            <div key={m.id} className={`musica-card ${isPlaying ? 'active-card' : ''}`}>
              <img src={m.imagem} alt="Capa" className="card-img" />
              <div className="card-info">
                <div className="musica-nome">{m.nome}</div>
                <div className="musica-artista">{m.artista}</div>
              </div>
              
              <div className="card-actions">
                <button 
                  onClick={() => aoTocar(m)} 
                  className={`btn-play ${isPlaying ? 'playing' : ''}`}
                  title="Tocar"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>
                
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button 
                    onClick={() => toggleCurtida(m.id)} 
                    className="btn-icon"
                    title="Curtir"
                  >
                    {isLiked ? "❤️" : "🤍"}
                  </button>
                  
                  {}
                  <div style={{ position: 'relative' }}>
                    <button 
                      className="btn-icon" 
                      onClick={() => setMenuAbertoId(menuAbertoId === m.id ? null : m.id)}
                      title="Adicionar à Playlist"
                    >
                      ➕
                    </button>
                    
                    {}
                    {menuAbertoId === m.id && (
                      <div className="playlist-dropdown">
                        <div className="dropdown-header">Adicionar em:</div>
                        {playlists.length === 0 && <div className="dropdown-item">Sem playlists</div>}
                        {playlists.map(p => (
                          <div 
                            key={p.id} 
                            className="dropdown-item"
                            onClick={() => {
                              adicionarAPlaylist(p.id, m.id);
                              setMenuAbertoId(null);
                            }}
                          >
                            {p.nome}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Player({ musicaAtual, tocando, setTocando, avancar, retroceder, progresso, setProgresso, volume, setVolume, curtidas, toggleCurtida }) {
  
  const formatarTempo = (segundos) => {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!musicaAtual) return <div className="player-bar empty">Selecione uma música para tocar</div>;

  return (
    <div className="player-bar">
      <div className="player-left">
        <img src={musicaAtual.imagem} alt="Capa" className="player-thumb" />
        <div className="player-info">
          <div className="player-title">{musicaAtual.nome}</div>
          <div className="player-artist">{musicaAtual.artista}</div>
        </div>
        <button onClick={() => toggleCurtida(musicaAtual.id)} className="player-fav-btn">
          {curtidas.includes(musicaAtual.id) ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button onClick={retroceder} className="control-btn">⏮</button>
          <button onClick={() => setTocando(!tocando)} className="control-btn play-pause">
            {tocando ? "⏸" : "▶"}
          </button>
          <button onClick={avancar} className="control-btn">⏭</button>
        </div>
        <div className="progress-container">
          <span className="time">{formatarTempo(progresso)}</span>
          <input
            type="range"
            min={0}
            max={musicaAtual.duracao}
            value={progresso}
            onChange={e => setProgresso(Number(e.target.value))}
            className="progress-bar"
          />
          <span className="time">{formatarTempo(musicaAtual.duracao)}</span>
        </div>
      </div>

      <div className="player-right">
        <span>🔊</span>
        <input
          type="range"
          min={0} max={1} step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="volume-bar"
        />
      </div>
    </div>
  );
}

function SpotifyClone() {
  const [musicas] = useState([
    { id: 1, nome: "Só os Loucos Sabem", artista: "Charlie Brown Jr", imagem: "https://i.scdn.co/image/ab67616d0000b273f066003f5c78d52a42bb25b1", duracao: 210 },
    { id: 2, nome: "Meddle About", artista: "Chase Atlantic", imagem: "https://i.scdn.co/image/ab67616d0000b273c8a2b0b665bd9cb8da378234", duracao: 203 },
    { id: 3, nome: "Hey Brother", artista: "Avicii", imagem: "https://i.scdn.co/image/ab67616d0000b273fd74683e852b400190e38874", duracao: 255 },
    { id: 4, nome: "God's Plan", artista: "Drake", imagem: "https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5", duracao: 199 }
  ]);

  const [curtidas, setCurtidas] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  
  const [paginaAtual, setPaginaAtual] = useState({ tipo: 'home' });

  const [busca, setBusca] = useState("");
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [tocando, setTocando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [volume, setVolume] = useState(0.5);
  
  const intervalRef = useRef();

  useEffect(() => {
    if (tocando && musicaAtual) {
      intervalRef.current = setInterval(() => {
        setProgresso((prev) => {
          if (prev >= musicaAtual.duracao) {
            setTocando(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [tocando, musicaAtual]);

  const handleTocar = (musica) => {
    if (musicaAtual && musicaAtual.id === musica.id) {
      setTocando(!tocando);
    } else {
      setMusicaAtual(musica);
      setTocando(true);
      setProgresso(0);
    }
  };

  const avancar = () => {
    if (!musicaAtual) return;
    const index = musicas.findIndex(m => m.id === musicaAtual.id);
    if (index < musicas.length - 1) {
      setMusicaAtual(musicas[index + 1]);
      setProgresso(0);
    }
  };

  const retroceder = () => {
    if (!musicaAtual) return;
    const index = musicas.findIndex(m => m.id === musicaAtual.id);
    if (index > 0) {
      setMusicaAtual(musicas[index - 1]);
      setProgresso(0);
    }
  };

  const toggleCurtida = (id) => {
    setCurtidas(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const adicionarAPlaylist = (playlistId, musicaId) => {
    const novasPlaylists = playlists.map(p => {
      if (p.id === playlistId) {
        if (p.musicas.includes(musicaId)) return p;
        return { ...p, musicas: [...p.musicas, musicaId] };
      }
      return p;
    });
    setPlaylists(novasPlaylists);
    alert("Música adicionada à playlist!");
  };

  const getTituloPagina = () => {
    if (paginaAtual.tipo === 'home') return 'SpotifyClone';
    if (paginaAtual.tipo === 'curtidas') return 'Músicas Curtidas';
    if (paginaAtual.tipo === 'playlist') {
      const p = playlists.find(pl => pl.id === paginaAtual.id);
      return p ? p.nome : 'Playlist';
    }
    return 'SpotifyClone';
  };

  return (
    <div className="app-container">
      <div className="app-body">
        <Playlists 
          playlists={playlists} 
          setPlaylists={setPlaylists} 
          curtidas={curtidas} 
          setPaginaAtual={setPaginaAtual}
          musicas={musicas} 
        />
        <div className="content-area">
          <Header titulo={getTituloPagina()} />
          <ListaMusicas 
            musicas={musicas}
            busca={busca}
            setBusca={setBusca}
            aoTocar={handleTocar}
            musicaAtual={musicaAtual}
            tocando={tocando}
            curtidas={curtidas}
            toggleCurtida={toggleCurtida}
            paginaAtual={paginaAtual}
            playlists={playlists}
            adicionarAPlaylist={adicionarAPlaylist}
          />
        </div>
      </div>
      <Player 
        musicaAtual={musicaAtual}
        tocando={tocando}
        setTocando={setTocando}
        avancar={avancar}
        retroceder={retroceder}
        progresso={progresso}
        setProgresso={setProgresso}
        volume={volume}
        setVolume={setVolume}
        curtidas={curtidas}
        toggleCurtida={toggleCurtida}
      />
    </div>
  );
}

export default SpotifyClone;