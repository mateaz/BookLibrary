import React from 'react';

const Button = (props) => { 
  return (
    <button className={`button-default ${ props.styleName }`} onClick = {() => props.onClickFun(props.feature)}>
        {props.icon}
    </button>
  );
};

export default Button;