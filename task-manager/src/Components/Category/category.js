import './category.css';
import Task from '../Task/task';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function CategoryLabel({text}){
    return(
        <div className='CategoryLabel'>{text}</div>
    )
}


export default function Category({name, id}){
    const [tasks, setTasks] = useState([])
    const [visible, setVisible] = useState(true)
    const addIssueRef = useRef(null)
    console.log(tasks);
    
    useEffect(()=>{
        console.log(tasks);
        function handleClickOutside(e){
            console.log(addIssueRef.current, !addIssueRef.current.contains(e.target));
            
            if(addIssueRef.current && !addIssueRef.current.contains(e.target) &&   e.target.parentElement && e.target.parentElement.id !== 'addIssue' && e.target.parentElement.id !== 'icon'){
                console.log('out');
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
        // setTasks([...tasks, <Task handleKeyPress={handleKeyPress} id={tasks.length} uid={tasks.length} index={tasks.length}/>])
        setTasks([...tasks, {'id':`${tasks.length}`, 'text': ''}])
        setVisible(false)
    }

    function handleKeyPress(e, inputRef, taskRef, setActiveInput, index){
        console.log(e);
        if (e.key === 'Enter') {
            // Enter key was pressed, trigger your event here
            setActiveInput(false)
            inputRef.current.blur()
            const updated_array = [...tasks]
            updated_array[index].text = inputRef.current.value
            console.log('Enter key pressed');
            setVisible(true)
            setTasks(updated_array)
          }
    }


    function onDragEnd(result){
        if (!result.destination) {
            return;
          }
      
          if (result.destination.index === result.source.index) {
            return;
          }
      
          const new_tasks = reorder(
            tasks,
            result.source.index,
            result.destination.index
          );
      
          setTasks(new_tasks);
    }





    return(
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
        {provided => (
                    <div className='category' id='addIssueDiv' ref={(el)=>{
                        provided.innerRef(el)
                        addIssueRef.current = el
                    }} {...provided.droppableProps}> 
                    <CategoryLabel text={name}/>
                    {tasks.map((task,index)=>(
                        <Task key={task.id} index={index} task={task} handleKeyPress={handleKeyPress}/>
                    ))}
                    {provided.placeholder}
                    {visible && (
                        <a href='#' id='addIssue' className='addIssue' onClick={handleClick} > 
                        <FontAwesomeIcon icon={faPlus} className='customIcon' id='icon'/>
                        <span className='childIssues' >Create Issue</span>
                        </a>
                    )}
        
                    
                </div>
               
                
        )}
         </Droppable>
         </DragDropContext>

    )
}

function reorder(list, startIndex, endIndex){
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
}