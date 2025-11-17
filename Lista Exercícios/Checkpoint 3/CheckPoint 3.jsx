import { useState, useEffect, useRef } from 'react';
import './App.css';

function SpotifyClone() {
  const [curtidas, setCurtidas] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistNome, setPlaylistNome] = useState("");
  const [musicas] = useState([
    {
      id: 1,
      nome: "Pure",
      artista: "The Last 100",
      imagem: "https://i.imgur.com/TxpQqA3.jpg",
      duracao: 200 // segundos
    },
    {
      id: 2,
      nome: "Mix Relax",
      artista: "Alex Warren",
      imagem: "https://i.imgur.com/TxpQqA3.jpg",
      duracao: 185
    },
    {
      id: 3,
      nome: "Mix Rock",
      artista: "Twenty One Pilots",
      imagem: "https://i.imgur.com/TxpQqA3.jpg",
      duracao: 210
    },
    {
      id: 4,
      nome: "Mix de Chase Atlantic",
      artista: "Chase Atlantic",
      imagem: "https://i.imgur.com/TxpQqA3.jpg",
      duracao: 190
    }
  ]);
  const [busca, setBusca] = useState("");
  const [musicaAtual, setMusicaAtual] = useState(null);
  const [tocando, setTocando] = useState(false);
  const [progresso, setProgresso] = useState(0); // segundos
  const [volume, setVolume] = useState(0.5);

  const intervalRef = useRef();

  useEffect(() => {
    if (tocando && musicaAtual) {
      intervalRef.current = setInterval(() => {
        setProgresso(prog =>
          prog < musicaAtual.duracao ? prog + 1 : musicaAtual.duracao
        );
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [tocando, musicaAtual]);

  useEffect(() => {
    if (musicaAtual) setProgresso(0);
  }, [musicaAtual]);

  function CurtidasSection() {
    return (
      <div className="sidebar-section">
        <div className="sidebar-title">Músicas Curtidas</div>
        <ul className="sidebar-list">
          {curtidas.length === 0 && <li className="sidebar-empty">Nenhuma curtida</li>}
          {curtidas.map(id => {
            const musica = musicas.find(m => m.id === id);
            return <li key={id}>{musica ? `${musica.nome} - ${musica.artista}` : ""}</li>
          })}
        </ul>
      </div>
    );
  }

  function PlaylistsSection() {
    return (
      <div className="sidebar-section">
        <div className="sidebar-title">Playlists</div>
        <ul className="sidebar-list">
          {playlists.length === 0 && <li className="sidebar-empty">Nenhuma playlist</li>}
          {playlists.map((p, i) => (
            <li key={i}>
              <div className="playlist-nome">{p.nome}</div>
              <ul className="playlist-musicas">
                {p.musicas.map(id => {
                  const musica = musicas.find(m => m.id === id);
                  return <li key={id}>{musica ? musica.nome : ""}</li>
                })}
              </ul>
            </li>
          ))}
        </ul>
        <PlaylistForm />
      </div>
    );
  }

  function PlaylistForm() {
    return (
      <div>
        <input
          type="text"
          placeholder="Nome da playlist"
          value={playlistNome}
          onChange={e => setPlaylistNome(e.target.value)}
          className="playlist-input"
        />
        <button
          onClick={() => {
            if (!playlistNome.trim()) return;
            setPlaylists([...playlists, { nome: playlistNome, musicas: curtidas }]);
            setPlaylistNome("");
          }}
          className="playlist-btn"
        >
          Criar Playlist
        </button>
      </div>
    );
  }

  function MusicasSection() {
    const musicasFiltradas = musicas.filter(m =>
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.artista.toLowerCase().includes(busca.toLowerCase())
    );
    return (
      <div>
        <input
          type="text"
          placeholder="Buscar músicas ou artistas"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="musica-busca"
        />
        <div>
          {musicasFiltradas.map(m => (
            <div key={m.id} className="musica-card">
              <div className="musica-nome">{m.nome}</div>
              <div className="musica-artista">{m.artista}</div>
              <div>
                <button
                  onClick={() => {
                    setMusicaAtual(m);
                    setTocando(true);
                  }}
                  className={
                    musicaAtual && musicaAtual.id === m.id && tocando
                      ? "card-btn card-btn-play tocando"
                      : "card-btn card-btn-play"
                  }
                >
                  {musicaAtual && musicaAtual.id === m.id && tocando ? "Pausar" : "Play"}
                </button>
                <button
                  onClick={() => {
                    setCurtidas(
                      curtidas.includes(m.id)
                        ? curtidas.filter(idC => idC !== m.id)
                        : [...curtidas, m.id]
                    );
                  }}
                  className="card-btn card-btn-fav"
                >
                  {curtidas.includes(m.id) ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          ))}
          {musicasFiltradas.length === 0 &&
            <div className="musica-empty">Nenhuma música encontrada.</div>
          }
        </div>
      </div>
    );
  }

  function PlayerSection() {
    function avancar() {
      if (!musicaAtual) return;
      const idx = musicas.findIndex(m => m.id === musicaAtual.id);
      if (idx < musicas.length - 1) setMusicaAtual(musicas[idx + 1]);
    }
    function retroceder() {
      if (!musicaAtual) return;
      const idx = musicas.findIndex(m => m.id === musicaAtual.id);
      if (idx > 0) setMusicaAtual(musicas[idx - 1]);
    }
    function toggleCurtida() {
      if (!musicaAtual) return;
      if (curtidas.includes(musicaAtual.id)) {
        setCurtidas(curtidas.filter(id => id !== musicaAtual.id));
      } else {
        setCurtidas([...curtidas, musicaAtual.id]);
      }
    }
    function tempoFormatado(segundos) {
      const m = Math.floor(segundos / 60);
      const s = segundos % 60;
      return `${m}:${s.toString().padStart(2,"0")}`;
    }

    return (
      <div className="player-bar">
        <div className="player-info">
          {musicaAtual ? (
            <>
              <img
                src={musicaAtual.imagem}
                alt={musicaAtual.nome}
                className="player-img"
              />
              <div className="player-txt">
                <div className="player-musica">{musicaAtual.nome}</div>
                <div className="player-artista">{musicaAtual.artista}</div>
              </div>
              <button
                onClick={toggleCurtida}
                className="player-fav"
                title="Favoritar"
              >
                {curtidas.includes(musicaAtual.id) ? "❤️" : "🤍"}
              </button>
            </>
          ) : <div className="player-empty">Nenhuma música tocando</div>}
        </div>
        <div className="player-controls">
          <button onClick={retroceder} className="player-btn">&#9664;</button>
          <button
            onClick={() => setTocando(!tocando)}
            className="player-btn"
          >{tocando ? "⏸" : "▶"}</button>
          <button onClick={avancar} className="player-btn">&#9654;</button>
          <div className="player-time">{tempoFormatado(progresso)}</div>
          <input
            type="range"
            min={0}
            max={musicaAtual ? musicaAtual.duracao : 100}
            value={progresso}
            onChange={e => setProgresso(Number(e.target.value))}
            className="player-range"
          />
          <div className="player-time">{musicaAtual ? tempoFormatado(musicaAtual.duracao) : "0:00"}</div>
        </div>
        <div className="player-vol">
          <input
            type="range"
            min={0} max={1} step={0.01}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="player-vol-range"
          />
          <div style={{marginLeft:5}}>{Math.round(volume * 100)}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        SpotifyClone
      </div>
      <div className="main">
        <div className="sidebar">
          <CurtidasSection />
          <PlaylistsSection />
        </div>
        <div className="musicas">
          <MusicasSection />
        </div>
      </div>
      <PlayerSection />
    </div>
  );
}

export default SpotifyClone;