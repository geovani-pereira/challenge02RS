import React,{useState,useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([])

  useEffect(()=> {
    api.get('repositories').then(response =>{
      setRepository(response.data);
    });
  },[]);


  async function handleAddRepository() {
     const response = await api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
     })

     const repositorie = response.data;
     
     setRepository([...repositories, repositorie]);

  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`);
   
    setRepository(repositories.filter((repository) => repository.id !== id));
    

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>
        <li key={repositorie.id}>{repositorie.title} 
          <button onClick={()=>handleRemoveRepository(repositorie.id)}>Remover</button> 
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
