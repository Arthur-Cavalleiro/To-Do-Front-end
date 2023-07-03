import React, {useState, useEffect, HTMLInputTypeAttribute} from "react";
import api from "../../services/api";
import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useParams, useNavigate } from "react-router-dom";
import Voltar from "../../components/Voltar";
import './style.css';

const OneTask = () => {
  
  const [newTitle, setNewTitle] = useState<HTMLInputTypeAttribute>("");
  const [newDescription, setNewDescription] = useState<HTMLInputTypeAttribute>("");
  const [isChecked, setIsChecked] = useState(false);

  const [theTask, setTheTask]= useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const specificId = useParams<{id: string}>();

  useEffect(() => {
    const getOne = async () => {
      try{
        const response = await api.get(`http://localhost:3001/ListOne/${specificId.id}`)
        setTheTask(response.data);
        setIsChecked(response.data.checked);
        setNewTitle(response.data.title)
        setNewDescription(response.data.description)
      } catch (error) {
        console.log(error)
      }
    }
    getOne();

  }, [isEditing, specificId])

  const patchTask = async () => {

    const newTask = {
      "title": newTitle,
      "description":newDescription,
      "checked":isChecked
    }

    try{
      const response = await fetch(`http://localhost:3001/update/${specificId.id}`,{
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(newTask)
      })
      
      if (response.ok) {
        console.log('Item atualizado com sucesso!');
      } else {
        console.log('Ocorreu um erro ao atualizar a task');
      }

    }catch (error) {
      console.log(error)
    }
  }

  const delOne = async() => {
    try{
      const response = await fetch(`http://localhost:3001/task/${specificId.id}`,{
        method:'DELETE'
      })
      
      if (response.ok) {
        console.log('Item excluído com sucesso!');
      } else {
        console.log('Ocorreu um erro ao excluir o item.');
      }

    } catch (error){
      console.log(error)
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delIdPlate = async () => {
    await delOne()
    navigate(`/`)
  }

  const confirmEdit = async() => {
    await patchTask();
    setIsEditing(false)
  }

  return (
    <div className="screen">
      <div className="voltar">
        <Voltar link='/'/>
      </div>
      <div style={{display:"flex",width:'100vw', justifyContent:'center', marginTop:'12px',marginBottom:'12px'}}>
        {isEditing?
          <input
            className="newInput"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        :
          <h1 style={{color:'#CCDBDC'}}>{theTask.title}</h1>
        }

      </div>
      <div className="btnsDiv">

      
        <input
          className="checkBox" 
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          disabled={isEditing?false:true}
        />

        <div className="editANDdel">
          {isEditing? 
            <button onClick={() => confirmEdit()} className="btns">confirm</button>
          : 
            <button onClick={() => setIsEditing(true)} className="btns">edit</button>
          }
          {isEditing? 
            <button style={{marginLeft:'8px'}} className="btns" onClick={()=>setIsEditing(false)}>Cancel</button>
          : 
            (
              <>
                <button onClick={handleOpen} style={{marginLeft:'8px'}} className="btns">delete</button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle className="dialog-title">Você tem certeza que deseja excluir esta task?</DialogTitle>
                  <DialogActions className="dialog-actions">
                    <button onClick={delIdPlate} className="btns">sim</button>
                    <button onClick={handleClose} className="btns">não</button>
                  </DialogActions>
                </Dialog>
              
              </>

            )
          }
          
        </div>

      </div>

      <div className="card">
        {isEditing?
          <textarea
            className="textArea"
            rows={7}
            maxLength={1000}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        :
          <p>{theTask.description}</p>
        }
      </div>

    </div>
  )
}

export default OneTask;