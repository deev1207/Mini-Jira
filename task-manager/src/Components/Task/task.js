import { useState, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid';
import './task.css'

export default function Task({handleKeyPress}) {
    const [activeInput, setActiveInput] = useState(true)
    const inputRef = useRef(null);
    const taskRef = useRef(null);
    const id = uuidv4(); 
    const cardStyle = {
        backgroundColor: !activeInput ?  '#393939': 'rgb(28,27,27)'
      };
    
    const borderStyle = {
    border: !activeInput ?  'none': '1px solid #a3a3a3'
    };

    // if(taskRef && activeInput){
    //     taskRef.current.style.border = '1px solid #a3a3a3';
    // }
    function handleFocus(){
        console.log('focus');
        setActiveInput(true)
    }

    function handleBlur(){
        console.log('unfocus');
        setActiveInput(false)
    }

    return (
        
           
                <div className='Task' style={borderStyle} ref={taskRef}> 
                
                    <input className='input' style={cardStyle} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={(e)=>{handleKeyPress(e,inputRef, taskRef, setActiveInput)}} ref={inputRef}></input>
                </div>
          

        

    )

}