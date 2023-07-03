import React, {useState, HTMLInputTypeAttribute} from "react";
import { useNavigate } from "react-router-dom";
import Voltar from "../../components/Voltar";
import './style.css'

const NewTask = () => {

  const [newTitle, setNewTitle] = useState<HTMLInputTypeAttribute>("");
  const [newDescription, setNewDescription] = useState<HTMLInputTypeAttribute>("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const newTask = async() => {

    const newTask = {
      "title": newTitle,
      "description":newDescription,
      "checked":isChecked
    }

    try{
      const response = await fetch(`http://localhost:3001/newTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
      if (response.ok) {
        console.log('Item adicionado com sucesso!');
      } else {
        console.log('Ocorreu um erro ao adicionar a task.');
      }
    }catch (error){
      console.log(error)
    }
  }
  
  const addTask = async() => {
    
    if(newTitle !== "" && newDescription !== ""){
      await newTask();
      navigate('/')
    }else if(newTitle === "" && newDescription === ""){
      alert("Tem que preencher os campos de Titulo e Descrição ")
    }else if(newTitle === "" && newDescription !== ""){
      alert("Tem que preencher o campo de Titulo ")  
    }else if(newTitle !== "" && newDescription === ""){
      alert("Tem que preencher o campo de Descrição ")
    }else{
      alert("parabéns não sei como chegou aqui. :)")
    }

  }

  return(
    <div className="screen">
      <div className="voltar">
        <Voltar link='/'/>
      </div>
      <div style={{display:"flex",width:'100vw', justifyContent:'center', marginTop:'12px',marginBottom:'12px'}}>
        <input
          className="newInput"
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className="btnsDiv">
      
        <input
          className="checkBox" 
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />

        <button className="add2" onClick={addTask}>Confirm</button>

      </div>

      <div className="card">
        <textarea
          className="textArea"
          rows={7}
          maxLength={1000}
          placeholder="Description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
    </div>
  )
}

export default NewTask;