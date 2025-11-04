import './App.css';

function CartaoLivro(titulo, autor, ano, genero) {
  return (
    <div className="cartao-livro">
      <h2>{titulo}</h2>
      <p><strong>Autor:</strong> {autor}</p>
      <p><strong>Ano:</strong> {ano}</p>
      <p><strong>Gênero:</strong> {genero}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <CartaoLivro titulo="Demon Slayer" autor="Matheus" ano={2017} genero="Ação" />
    </div>
  );
}

export default App;