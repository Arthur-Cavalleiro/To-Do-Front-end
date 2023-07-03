import React from "react";
import './style.css'
import { BiArrowBack } from "react-icons/bi";
import { Link, To } from "react-router-dom";

const Voltar = (props:{link: To}) => {
  return(
    <Link className="voltar-button" to={props.link}>
      <BiArrowBack className="voltar-icon" />
      Back
    </Link>
  )
}

export default Voltar;