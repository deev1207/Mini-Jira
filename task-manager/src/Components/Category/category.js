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
    const addIssueRef = useRef(null)

    useEffect(()=>{
        function handleClickOutside(e){
            if(addIssueRef.current && !addIssueRef.current.contains(e.target)){
                console.log('out');
                setTasks(tasks.slice(0,-1))
            }

        }
        document.body.addEventListener('click', handleClickOutside);
        return()=>{
            document.body.removeEventListener('click', handleClickOutside);
        }
           
    }, [tasks])

    function handleClick(){
        setTasks([...tasks, <Task />])
    }





    return(
        <div className='category' ref={addIssueRef}> 
            <CategoryLabel text={'Added'}/>
            {tasks}
            <a href='#' id='addIssue' className='addIssue' onClick={handleClick} > 
                <FontAwesomeIcon icon={faPlus} className='customIcon'/>
                <span className='childIssues'>Create Issue</span>
            </a>
            
        </div>
    )
}