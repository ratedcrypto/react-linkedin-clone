import React from 'react';
import './InputOption.css';

function InputOption({ title, Icon, color, onClick }) {
  return (
    <div className="inputOption" onClick={onClick}>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default InputOption;
