import { useState, useRef } from 'react'
import './task.css'

export default function Task() {
    const [enter, setEnter] = useState(false)
    const inputRef = useRef(null);
    const taskRef = useRef(null);
    const cardStyle = {
        backgroundColor: enter ?  '#393939': 'none'
      };
    function handleKeyPress(e){
        if (e.key === 'Enter') {
            // Enter key was pressed, trigger your event here
            setEnter(true)
            inputRef.current.blur()
            taskRef.current.style.border = 'none';
            console.log('Enter key pressed');
          }
    }

    return (
        <div className='Task' ref={taskRef}>
            <input className='input' style={cardStyle} onKeyDown={handleKeyPress} ref={inputRef}></input>
        </div>
    )

}