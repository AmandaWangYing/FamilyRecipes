import React from "react";

export default function InputText({value, onChange}){
    return(
      <React.Fragment>
        <label>
          Search for:
          <input 
            className="ex1" 
            type="text" 
            value={value} 
            onChange={onChange} />
        </label>
      </React.Fragment>
    )
  }