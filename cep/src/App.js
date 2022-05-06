import {FiSearch} from 'react-icons/fi';
import "./styles.css";
import {useState} from "react";
import api from "./services/api";

// 01310930/json

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  async function handleSearch(){
      if(input === ""){
          alert("Preencha algum cep!")
          return;
      }
      try{
        const response = await api.get(`${input}/json`)
        setCep(response.data)
        setInput("")
      }catch{
        alert("Ops erro ao buscar!")
        setInput("")
      }
  }
  return (
    <div className="container">
        <h1 className="title">Buscador CEP</h1>

        <div className="containerInput">
          <input
            type="text"
            placeholder="Digite seu CEP"
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyPress={e => {
              if(e.key === 'Enter') handleSearch()
            }} />

          <button  className="buttonSearch" onClick={handleSearch}>
              <FiSearch size={25} color="#000"/>
          </button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
            
            {/* só mostra de o cep retornar as seguintes informações */}
            {cep.logradouro !== '' ?
              <span>{cep.logradrouro}</span>
            : null}


            {cep.bairro !== '' ?
              <span>{cep.bairro}</span>
              :null}

            {cep.complemento !== '' ?
              <span>{cep.logradrouro}</span>
            : null}
            {cep.localidade !== '' ?
              <span>{cep.localidade} - {cep.uf}</span>
            : null}

        </main>
        )}
    </div>
  );
}
export default App;