import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  {id: 1, text: "React Native y React.Js"},
  {id: 2, text: "Node.js y Vue.Js"},
  {id: 3, text: "JavaScript y Python"},
  {id: 4, text: "Html y Css, talwindCss, Bootstrap"},
]

const App = () => {

  const [todos, setTodos] = useState(initialTodos);

  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos));

  },[todos])

  const handleDragEnd = result => {
    if(!result.destination) return;
      const startIndex = result.source.index;
      const endIndex = result.destination.index;
      const copyArray = [...todos];
      const [reorderItem] = copyArray.splice(startIndex, 1);
      
      copyArray.splice(endIndex, 0, reorderItem);

      setTodos(copyArray);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} >
      <h1>Todo app</h1>
      <Droppable droppableId="todos">
        {
          (droppableProvider) => (
            <ul 
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {
                todos.map((item, index) => (
                  <Draggable index={index} key={item.id} draggableId={`${item.id}`}>
                    {
                      (dragableProvider) => (
                        <li 
                          ref={dragableProvider.innerRef}
                          {...dragableProvider.dragHandleProps}
                          {...dragableProvider.draggableProps}
                        >
                          {item.text}
                        </li>
                      )
                    }
                  </Draggable>
                ))
              }
              {droppableProvider.placeholder}
            </ul>
          )
        }
      </Droppable>
    </DragDropContext>
  )
}

export default App;