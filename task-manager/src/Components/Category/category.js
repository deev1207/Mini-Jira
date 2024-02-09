import './category.css';
import Task from '../Task/task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef} from 'react';



function CategoryLabel({text}){
    return(
        <div className='CategoryLabel'>{text}</div>
    )
}


export default function Category(){
    const [tasks, setTasks] = useState([])
    const [visible, setVisible] = useState(true)
    const addIssueRef = useRef(null)

    useEffect(()=>{
        function handleClickOutside(e){
            console.log(e);
            if(addIssueRef.current && !addIssueRef.current.contains(e.target) &&   e.target.parentElement && e.target.parentElement.id !== 'addIssue' && e.target.parentElement.id !== 'icon'){
                if(!visible){
                    setTasks(tasks.slice(0,-1))
                    setVisible(true)
                }

                
            }

        }
        console.log('effect');
        document.body.addEventListener('click', handleClickOutside);
        return()=>{
            console.log('remove');
            document.body.removeEventListener('click', handleClickOutside);
        }
           
    }, [tasks, visible])

    function handleClick(){
        console.log('click');
        setTasks([...tasks, <Task handleKeyPress={handleKeyPress}/>])
        setVisible(false)
    }

    function handleKeyPress(e, inputRef, taskRef, setActiveInput){
        console.log(e);
        if (e.key === 'Enter') {
            // Enter key was pressed, trigger your event here
            setActiveInput(false)
            inputRef.current.blur()
            taskRef.current.style.border = 'none';
            console.log('Enter key pressed');
            setVisible(true)
          }
    }





    return(
        <div className='category' id='addIssueDiv' ref={addIssueRef}> 
            <CategoryLabel text={'Added'}/>
            {tasks}
            {visible && (
                <a href='#' id='addIssue' className='addIssue' onClick={handleClick} > 
                <FontAwesomeIcon icon={faPlus} className='customIcon' id='icon'/>
                <span className='childIssues' >Create Issue</span>
                </a>
            )}

            
        </div>
    )
}