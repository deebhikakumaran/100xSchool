import './App.css';
import { useState } from 'react';
import StateLifting from "./StateLifting"
import ContextAPIWrapper from "./ContextAPI"

function App() {
  const [mode, setMode] = useState("state-lifting")
  
  return (
    <div className='app'>
      <nav className='tabs'>
        <button className={mode === 'state-lifting' ? 'tabs__btn tabs__btn--active' : 'tabs__btn'}
                onClick={() => setMode('state-lifting')}>01 state lifting</button>
        <button className={mode === 'context-api' ? 'tabs__btn tabs__btn--active' : 'tabs__btn'} 
                onClick={() => setMode('context-api')}>02 context api</button>
      </nav>

      {mode === "state-lifting" ? (
        <StateLifting key="state-lifting" />
      ) : (
        <ContextAPIWrapper key="context-api" />
      )}
    </div>
  );
}

export default App;
