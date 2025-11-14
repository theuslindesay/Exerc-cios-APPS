function PrevisaoTempo(temperatura, clima, umidade, cidade) {
  const climas = {
    'ensolarado': '☀️',
    'nublado': '🌥️',
    'chuvoso': '🌧️',
    'tempestuoso': '⛈️',
    'nevando': '❄️'
  };
  return climas[clima.toLowerCase()] || '☁️';
}

const getCorTemperatura = (temp) => {
  if (temp < 15) return "#4a90e2";
  if (temp < 25) return "#f5a623";
  return "#db021b";
};

return (
  <div style={{
    border: '2px solid #ddd',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #20623fff, #1e79beff)',
    color: 'white',
    maxWidth: '200px',
    minWidth: '200px'
  }}>
    <h2 style={{ margin: '0 0 15px 0' }}>{cidade}</h2>
    <div style={{ fontSize: '60px', margin: '100x 0' }}>
      {getIcone(clima)}
    </div>
    <p style={{
      fontSize: '18px',
      fontWeight: 'bold',
      color: getCorTemperatura(temperatura),
      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    }}>
      {temperatura}°C
    </p>
    <p style={{ fontSize: '18px', margin: '10px 0' }}>{clima}</p>
    <p style={{ fontSize: '14px', opacity: 0.9 }}>{umidade}%</p>
  </div>
);

function App() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '50px',
    flexWrap: 'wrap',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <PrevisaoTempo temperatura={31} clima="ensolarado" cidade="RJ" umidade={60} />
      <PrevisaoTempo temperatura={21} clima="nublado" cidade="SP" umidade={39} />
      <PrevisaoTempo temperatura={12} clima="nevando" cidade="Curitiba" umidade={60} />
    </div>
  );
}

export default App;