import { ChangeEvent, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';

function App()
{
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [insideOutMessage, setInsideOutMessage] = useState('');
    const [outsideInMessage, setOutsideInMessage] = useState('');

    const outsideIn = () => {

  
    }

    function onMessageChange(e: any) {
        setOutsideInMessage(e.target.value);
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {}

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div>
                {/* <div>
                    <input className='outside-in-message' type='text' placeholder='Message' onChange={onMessageChange}/>
                </div>

                <div>
                    <button className="button" onClick={outsideIn}>Outside In</button>
                </div>
                <div className="inside-out-message">Inside out: {insideOutMessage}
                </div> */}
            </div>
        </div>
    )
}

export default App
