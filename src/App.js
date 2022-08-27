import React from 'react'
import QrReaders from './components/QrReaders';
import { useDetectAdBlock } from "adblock-detect-react";
import AddBlocker from './components/error/AddBlocker';

const App = () => { 
  const adBlockDetected = useDetectAdBlock();

  React.useEffect(() => {
    if (adBlockDetected) {
      window.alert("ad block detected");
    }
  }, []); 

  return ( 

    <> 
    <div>{adBlockDetected ? (<AddBlocker/>):(<QrReaders/>)}</div>
    
    </>
  )
}

export default App