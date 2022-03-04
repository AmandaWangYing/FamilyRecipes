import React from "react";
import ListItem from './ListItem';

function CheckboxItems({options, onChange, selected}){
  return(
    <React.Fragment>
      {options && options.map((option) =>(
        <ListItem
          key={option} 
          text={option}
          handleOnChange={() => onChange(option)}
          selected={selected.includes(option)}
        />
      ))}
    </React.Fragment> 
  )
};

export default CheckboxItems;
