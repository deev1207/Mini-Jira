import { useState, useRef, useEffect } from 'react'

import './task.css'
import { Draggable } from 'react-beautiful-dnd';

export default function Task({ handleKeyPress, task, index, activeRef }) {
    const [activeInput, setActiveInput] = useState(activeRef.current)
    const [text, setText] = useState(task.text)
    const inputRef = useRef(null);
    const taskRef = useRef(null);
    
    useEffect(() => {
        if (!activeInput) {
            taskRef.current.style.border = 'none'
        }

        else {
            taskRef.current.style.border = '1px solid #a3a3a3'
            inputRef.current.focus()
        }

    }, [activeInput])

    const cardStyle = {
        backgroundColor: !activeInput ? '#393939' : 'rgb(28,27,27)'
    };

    function handleFocus() {
        setActiveInput(true)
    }

    function handleBlur() {
        setActiveInput(false)
    }

    function handleChange(e) {
        setText(e.target.value)
    }

    return (

        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <div className='Task' ref={(el) => {
                    provided.innerRef(el)
                    taskRef.current = el
                }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <input className='input' onChange={handleChange} value={text} style={cardStyle} onFocus={handleFocus} onBlur={handleBlur} onKeyDown={(e) => { handleKeyPress(e, inputRef, taskRef, setActiveInput, index) }} ref={inputRef}></input>
                </div>
            )}
        </Draggable>




    )

}