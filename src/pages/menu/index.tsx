import React, { useEffect, useState } from "react";
import './style.css'
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import BoxCHS from "../../components/boxCHS"

const Menu = () => {

  const [allTasks, setAllTasks]= useState<any[]>([]);

  const location = useLocation();
  useEffect(()=> {
    const getTasks = async () => {
      try{
        const response = await api.get("http://localhost:3001/list")
        setAllTasks(response.data);
      } catch (error) {
        alert(error);
      }
    }
    
    getTasks();
  }, [location.pathname])

  return(
    <div className="screen">
      <div className="title">
        <p>Tasks List</p>
      </div>
      <div className="boxBtn">
        <Link to='/newTask' className="add">Add Task</Link>
      </div>

      {allTasks.reverse().map((tasks) => 
        <BoxCHS
        link={`/chossenTask/${tasks._id}`}
        titulo={tasks.title}
        done={tasks.checked}
        key={tasks._id}
        />
      ).reverse()}
    </div>
  )
}

export default Menu;