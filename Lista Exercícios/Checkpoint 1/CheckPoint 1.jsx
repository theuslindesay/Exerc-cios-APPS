import './App.css'
function Saudacao({ nome }) {
  return(
  <div className = "saudacao">
    <h1>Olá, Comandante {nome}</h1>
  </div>
  );
}

function DataHoraGalactica(){
  const agora = new Date();
  const diasSemana = ['domingo','segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const diaSemana = diasSemana[agora.getDay()];
  const dia = agora.getDay();
  const mes = meses[agora.getMonth()];
  const ano = agora.getFullYear();
  return (
    <div className = "data-hora">
      <h3>Data e Hora da Missão</h3>
      <p>{diaSemana}, {dia} de {mes} de {ano}</p>
    </div>
  );
}
function StatusMissao({ distanciaPercorrida, distanciaTotal }) {
  const progresso = Math.min((distanciaPercorrida / distanciaTotal) * 100, 100);
  const corBarra =
    progresso < 25 ? "#ee3427ff" : progresso < 51 ? "#f0e21cff" : progresso < 75 ? "#23c4f5" : "#63e24a";

  return (
    <div>
      <h3>Status da Missão: {progresso.toFixed(1)}% completo</h3>
      <div className = "progresso">
        <div 
          className = "barra-progresso" 
          style = {{
            width: `${progresso}%`,
            backgroundColor: corBarra,
          }}
        >
        </div>
        <div className = "texto-progresso">
          {distanciaPercorrida} / {distanciaTotal} Anos-luz
        </div>
      </div>
    </div>
  );
}

function InfosPlaneta({ nome_planeta, temperatura, gravidade, descricao }) {
  const getIconeClima = (temperatura) => {
    if (temperatura < 0) return "❄️";
    if (temperatura < 20) return "☁️";
    if (temperatura < 35) return "☀️";
    return "🔥";
  };

  const getIconeGravidade = (gravidade) => {
    if (gravidade < 0.5) return "🪶";
    if (gravidade < 1) return "⚖️";
    if (gravidade < 2) return "🔽";
    return "🔼";
  };

  const getIconePlaneta = (temperatura) => {
    if (temperatura < -100) return "🪐";
    if (temperatura < 0) return "🌑";
    if (temperatura < 50) return "🌍";
    return "🌋";
  };

  return (
    <div className = "info-planeta">
      <h2>{getIconePlaneta(temperatura)} {nome_planeta}</h2>
      <p>
        <strong>Temperatura Média</strong>: {temperatura}°C {getIconeClima(temperatura)}
      </p>
      <p>
        <strong>Gravidade</strong>: {gravidade}g {getIconeGravidade(gravidade)}
      </p>
      <p>
        <strong>Descrição</strong>: {descricao}
      </p>
    </div>
  );
}
function PrevisaoTempo({ clima, umidade_solar, niv_rad_cosmica }) {
  const getIcone = (clima) => {
    const climas = {
      'Tempestade': "🌪️",
      'Ensolarado': "☀️",
      'Nebuloso': "☁️",
      'Chuva Ácida': "💧",
      'Frio': "❄️"
    };
    return climas[clima] || "❓";
  };

  return (
    <div className = "previsao-tempo">
      <h3>Previsão do Tempo Espacial</h3>
      <div>{getIcone(clima)}</div>
      <p>
        <strong>Clima</strong>: {clima}
      </p>
      <p>
        <strong>Umidade Solar</strong>: {umidade_solar}%
      </p>
      <p>
        <strong>Nível de Radiação</strong>: {niv_rad_cosmica} mSv
      </p>
    </div>
  );
}

function RelatorioDeBordo() {
  const eventos = [
    "Sonda Voyager 2 iniciou aproximação final ao sistema netuniano após 12 anos de viagem.",
    "Detectada a Grande Mancha Escura - tempestade do tamanho da Terra com ventos de 2.100 km/h.",
    "Sistemas de proteção térmica ativados devido às temperaturas extremas de -214°C.",
    "Confirmada descoberta dos anéis principais de Netuno através de imagens de alta resolução.",
    "Identificados 14 satélites naturais, incluindo Tritão com criovulcões ativos.",
    "Coletadas amostras atmosféricas mostrando alta concentração de metano e hidrogênio.",
    "Sonda realizou sobrevoo próximo a Tritão, capturando gêiseres de nitrogênio líquido.",
    "Sistemas de comunicação estabilizados após interferência do campo magnético netuniano.",
    "Análises confirmam núcleo rochoso envolto por mantos de água, amônia e metano gelados.",
    "Missão concluída com sucesso - todos os dados transmitidos para Terra."
  ];
  return (
    <div className = "relatorio-bordo">
      <h2>Relatório de Bordo</h2>
      <ol>
        {eventos.map((evento, index) => (
          <li key = {index}>{evento}</li>
        ))}
      </ol>
    </div>
  );
}
function DashboardEspacial() {
  return (
    <div className = "dashboard">
      <Saudacao nome = "Matheus" />
      <DataHoraGalactica diaSemana = 'segunda' dia = '29' mes = 'Setembro' ano = {2025} />
      <InfosPlaneta
        nome_planeta = "Netuno"
        temperatura = {-214}
        gravidade = {1.1}
        descricao = "Netuno é um planeta pertencente ao Sistema Solar. Trata-se do oitavo mais distante do Sol, o que confere a ele temperaturas muito baixas, em torno de -200 °C. O planeta Netuno é classificado como um gigante de gelo em função de sua composição, que é feita por gases como hélio, metano, hidrogênio e amônia, e da ausência de uma superfície sólida."
      />
      <PrevisaoTempo clima = "Tempestade" umidade_solar = {0} niv_rad_cosmica = {0.1}/>
      <StatusMissao distanciaPercorrida = {4500} distanciaTotal = {4500}/>
      <RelatorioDeBordo />
    </div>
  );
}

export default DashboardEspacial;
