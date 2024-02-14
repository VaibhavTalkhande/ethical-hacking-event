import React, { useState } from 'react';
import './Welcome.css';
const Welcome = ({ onNameSubmit, onNext }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNameSubmit(name);
    onNext();
  };

  return (
    <div className='welcome'>
      <h2 className='title'>ETHICAL HACKING</h2>
      <form onSubmit={handleSubmit}>
         <label htmlFor="name">Enter your Name:<br/></label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}  placeholder='john doe' required />
        <br />
        <button type="submit" className='GameOn'>GAME ON</button>
      </form>
    </div>
  );
};

export default Welcome;
