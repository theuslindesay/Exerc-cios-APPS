import { useState } from 'react';
import './App.css'

function FormularioTempoReal(){
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    idade: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDados({
      ...dados,
      [name]: value
    });
  };
  
  const handleBlur = (e) => {
    const {name,value} = e.target;
    
    if (name === 'email'){
        if (!value.includes('@') && value !== '') {
            setErros(prevErrors => ({
                ...prevErrors,
                email: 'O e-mail deve conter um "@"'
            }));
        } else {
            setErrors(prevErrors => ({ ... prevErrors, email: ''}))
        }
    }
    if (name === 'idade') {
        const age = Number(value);
        if (age <=18 && value !== '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                idade: 'A idade deve ser maior que 18'
            }));
         } else {
                setErrors(prevErrors => ({ ...prevErrors, idade: ''}));

            }
        }
    }
  }

  return(
  <div>
    <h2>Formulário</h2>
    <form>
      <div>
        <label> Nome: </label>
        <input type="text" name ="nome" value={dados.nome} onChange = {handleChange}/>
      </div>
      <div>
        <label> E-mail: </label>
        <input type="email" name ="email" value={dados.email} onChange = {handleChange} onBlur = {handleBlur}/>
        {errors.email && <span style = {{ color: 'red', fontSize: '12px'}} > {errors.email}</span>}

      </div>
      <div>
        <label> Idade: </label>
        <input type="number" name='idade' value={dados.idade} onChange = {handleChange} onBLur = {handleBlur}/>
        {errors.idade && <span style = {{ color: 'red', fontSize: '12px'}} > {errors.idade}</span>}
      </div>
    </form>

    <div>
      <h3>Dados preenchidos:</h3>
      <h4>Seu nome é: {dados.nome}</h4>
      <h4>Seu e-mail é: {dados.email}</h4>
      <h4>Sua idade é: {dados.idade}</h4>
    </div>
  </div>
)

export default FormularioTempoReal;