import React from 'react';

export default function Button({icon, styleName, onClickFun}) {
  return (
    <button className={`button-default ${ styleName }`} onClick = {onClickFun}>
        {icon}
    </button>
  );
};
