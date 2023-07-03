import React from "react";
import './style.css'
import { Link, To } from "react-router-dom";

const BoxCHS = (props: { link: To, titulo: String, done: Boolean }) =>{
  return(
    <div className="boxBack">
      <Link to={props.link} className="box" style={{border:props.done !== true ?"#ff0000 solid":"#15ff00 solid"}}>
        {props.titulo}
      </Link>
    </div>
  )
}

export default BoxCHS;