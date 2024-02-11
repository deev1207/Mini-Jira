import './App.css';
import Category from './Components/Category/category';


function App() {

  const column_names =['Add', 'In Progress']
  const column = column_names.map((name,index)=>(
    {'id':`${index}`, 'name': `${name}`}
  )

  )
  

  return (

          <div className="App" >
          {column.map((col)=>(
            <Category name={col.name} key={col.id} id={col.id} />
          ))
          }
          
          


          </div>



  );
}

export default App;
