import { useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";

import './App.css';

function App() {

  const [input, setInput] = useState(" ");

  const [task, setTask] = useState([]);


  // const api = () => {
  //   fetch('https://assets.breatheco.de/apis/fake/todos/user/salatustra')

  
  //   .then(response => response.json())
  //   .then((data) => setTask(data))
  //   .catch(error => console.log(error))
  // }

  const api = () => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		  };
		  
		  fetch("https://assets.breatheco.de/apis/fake/todos/user/salatustra", requestOptions)
			.then(response => response.json())
			.then(data => setTask(data))
			.catch(error => console.log('error', error));
	}
 

  

 




  
    //   if (input === " ") {
    //     alert("Add task");
    //   } else {
    //     setTask([input, ...task]);
    //   }
    //   setInput(" ");


    const AddTask = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      let taskAdded = task.concat({
        "label": input,
        "done": false
      })

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(taskAdded),
        redirect: 'follow'
      };

      fetch('https://assets.breatheco.de/apis/fake/todos/user/salatustra', requestOptions)
        .then(resp => resp.json())
        .then(data =>{
          console.log(data)
          api()
        })
        .catch(error => console.log(error))
        
        setInput(" ")

    }

    // const handleAddAnimal = () => {
    //   fetch(process.env.BACKEND_URL + "/api/animals", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       "name": name,
    //       "description": description,
    //       "url": url
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setAnimal([...animal, data]);
    //     })
    //     .catch((error) => console.log("error", error));
    // };

    function DeleteTask(index) {


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      let taskAdded = task.filter((activity, i) => i !== index)

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(taskAdded),
        redirect: 'follow'
      };

      fetch('https://assets.breatheco.de/apis/fake/todos/user/salatustra', requestOptions)
        .then(resp => resp.json())
        .then(data =>{
          console.log(data)
          api()
        })
        .catch(error => console.log(error))
    }

    return (
      <div className="container">
        <h1>To Do List </h1>
        <div className="addBarPlusButton">
          <input
            placeholder=" What you think you have to do? "
            type="texto"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button onClick={AddTask}> Add task </button>
        </div>
        <ul>
          {task.map((activity, index) => (
            <li key={index}>
              {activity.label}
              <AiOutlineDelete onClick={() => DeleteTask(index)} />
            </li>
          ))}
        </ul>
        <div className="taskcounter"> {task.length} </div>
      </div>
    );
  };

  export default App;

