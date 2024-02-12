import { useState } from 'react';
import './App.css';
import Category from './Components/Category/category';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {

  const column_names =['Add', 'In Progress']
  const initial_columns = column_names.map((name,index)=>(
    {'id':`${index}`, 'name': `${name}`, 'list':[], 'index':index}
  )
  )

  const [column,setColumn] = useState(initial_columns)
 

  function onDragEnd(result){
    const src_droppable_id = result.source.droppableId
    const dest_droppable_id = result.destination.droppableId
    const draggableId = result.draggableId
    console.log(src_droppable_id, dest_droppable_id);
    let col_cpy = [...column]
    const src_cpy = [...column[src_droppable_id].list]
    const dest_cpy = [...column[dest_droppable_id].list]
    console.log(result);
    if (!result.destination) {
        return;
      }
  
      if ((result.destination.droppableId==result.source.droppableId) && (result.destination.index === result.source.index)) {
        return;
      }

      if(result.destination.droppableId==result.source.droppableId){
        const new_list = reorder(
          src_cpy,
          result.source.index,
          result.destination.index
        );
        col_cpy[src_droppable_id].list=new_list
        console.log(col_cpy);
        setColumn(col_cpy);
      }

      else{
        col_cpy = reorder_across_lists(col_cpy, src_cpy, dest_cpy, src_droppable_id,dest_droppable_id, result.source.index,result.destination.index,draggableId)
        setColumn(col_cpy);
      }
     
 
      // const new_tasks = reorder(
      //   src_cpy,
      //   destination_cpy,
      //   result.source.index,
      //   result.destination.index,

      // );
  
      // setTasks(new_tasks);
}
  

  return (

          <div className="App" >
         <DragDropContext onDragEnd={onDragEnd}>
         {column.map((col)=>(
            <Category name={col.name} key={col.id} id={col.id} column={column} setColumn={setColumn} index={col.index}/>
          ))
          }
         </DragDropContext>

      

          
          


          </div>



  );
}


function reorder(list, startIndex, endIndex){
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function reorder_across_lists(col_cpy, src_cpy, dest_cpy, src_droppable_id,dest_droppable_id, src_index,dest_index, draggableId){
  
  const [removed] = src_cpy.splice(src_index, 1);
  dest_cpy.splice(dest_index,0, removed)
  col_cpy[src_droppable_id].list = src_cpy
  col_cpy[dest_droppable_id].list = dest_cpy
  return col_cpy
}
export default App;
