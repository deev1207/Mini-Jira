import './category.css';
import Task from '../Task/task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';

function CategoryLabel({ text }) {
    return (
        <div className='CategoryLabel'>{text}</div>
    )
}


export default function Category({ name, id, column, setColumn, index }) {
    const tasks = column[index].list
    const [visible, setVisible] = useState(true)
    const addIssueRef = useRef(null)
    const activeRef = useRef(false)

    useEffect(() => {
        function handleClickOutside(e) {
            if (addIssueRef.current && !addIssueRef.current.contains(e.target) && e.target.parentElement && e.target.parentElement.id !== 'addIssue' && e.target.parentElement.id !== 'icon') {
                if (!visible) {
                    let new_column = [...column]
                    let new_list = [...column[index].list]
                    new_list = new_list.slice(0, -1)
                    new_column[index].list = new_list
                    activeRef.current = false
                    setColumn(new_column)
                    setVisible(true)
                }


            }

        }
        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        }

    }, [tasks, visible])

    function handleClick() {
        let new_column = [...column]
        let new_list = [...column[index].list, { 'id': `${id}${tasks.length}`, 'text': '' }]
        new_column[index].list = new_list
        activeRef.current = true
        setColumn(new_column)
        setVisible(false)
    }

    function handleKeyPress(e, inputRef, taskRef, setActiveInput, taskIndex) {
        if (e.key === 'Enter') {
            setActiveInput(false)
            inputRef.current.blur()
            let new_column = [...column]
            let new_list = [...column[index].list]
            new_list[taskIndex].text = inputRef.current.value
            new_column[index].list = new_list
            activeRef.current = false
            setColumn(new_column)
            setVisible(true)
        }
    }








    return (

        <Droppable droppableId={id}>
            {provided => (
                <div className='category' id='addIssueDiv' ref={(el) => {
                    provided.innerRef(el)
                    addIssueRef.current = el
                }} {...provided.droppableProps}>
                    <CategoryLabel text={name} />
                    {tasks.map((task, index) => (
                        <div className='taskDiv'>
                            <Task key={task.id} index={index} task={task} handleKeyPress={handleKeyPress} activeRef={activeRef} />
                        </div>
                    ))}
                    {provided.placeholder}
                    {visible && (
                        <a href='#' id='addIssue' className='addIssue' onClick={handleClick} >
                            <FontAwesomeIcon icon={faPlus} className='customIcon' id='icon' />
                            <span className='childIssues' >Create Issue</span>
                        </a>
                    )}


                </div>


            )}
        </Droppable>


    )
}

