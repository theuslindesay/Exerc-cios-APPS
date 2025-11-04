import './App.css'

function MenuRestaurante() {
  const pratos = [
    {nome: "Lasanha", preco: 25.00, descricao: "Lasanha à Milanesa"},
    {nome: "Coxinha de Frango", preco: 5.00, descricao: "Coxinha de Frango com Catupiry"},
    {nome: "Mini Pizza de Calabresa", preco: 7.50, descricao: "Mini Pizza"},
    {nome: "Risoto de Camarão", preco: 30.00, descricao: "Risoto de Camarão"}
  ];

  return (
    <div>
      <h1>Cardápio do Restaurante</h1>
      <div className="menu-grid">
        {pratos.map((prato, index) => (
          <div key={index} className="prato-card">
            <h3>{prato.nome}</h3>
            <p className="preco">R$ {prato.preco.toFixed(2)}</p>
            <p className="descricao">{prato.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuRestaurante;