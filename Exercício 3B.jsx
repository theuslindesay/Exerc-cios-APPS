function ListaFood() {
  const comidas = ["Risoto", "Macarronada", "Strongonoff", "Salmão"];

  return (
    <div>
      <h2>Minhas Comidas Preferidas</h2>
      <ul>
        {comidas.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaFood;