import { useState, useRef } from 'react'

import './task.css'
import { Draggable } from 'react-beautiful-dnd';

export default function Task({handleKeyPress, task, index}) {
    const [activeInput, setActiveInput] = useState(true)
    const [text, setText] = useState(task.text)
    const inputRef = useRef(null);
    const taskRef = useRef(null);
  
    const cardStyle = {
        backgroundColor: !activeInput ?  '#393939': 'rgb(28,27,27)'
      };
    
    
    // taskRef.current.style.border = activeInput?'1px solid #a3a3a3':'none'
 

    // if(taskRef && activeInput){
    
    // }
    function handleFocus(){
        console.log('focus');
        setActiveInput(true)
        taskRef.current.style.border ='1px solid #a3a3a3'
    }

    function handleBlur(){
        console.log('unfocus');
        setActiveInput(false)
        taskRef.current.style.border ='none'
    }

    function handleChange(e){
        setText(e.target.value)
    }

    return (
        
        <Draggable draggableId={task.id} index={index}>
        {provided => (
                <div className='Task'  ref={(el)=>{
                    provided.innerRef(el)
                    taskRef.current = el
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}> 
                    <input className='input'  onChange={handleChange} value={text} style={cardStyle} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={(e)=>{handleKeyPress(e,inputRef, taskRef, setActiveInput, index)}} ref={inputRef}></input>
                </div>
        )}
        </Draggable>
          

        

    )

}