import React, { useState } from 'react';

export default function BoardDetail({ tasks, getTasks, boards, getBoards }){
  const [taskStatus, setTaskStatus] = useState('');
  const [boardNumVar, setBoardNumVar] = useState('');

  const updateTask = async (id) => {
    const data = {};
    data.status = taskStatus;

    const taskUrl = `http://localhost:8080/tasks/${id}/`;
    const fetchConfig = {
        method: "patch",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };

  const response = await fetch(taskUrl, fetchConfig);
  if (response.ok) {
    const task = await response.json();
    setTaskStatus('');
    getTasks();
  }
  }
  if (tasks === undefined) {
     return null
  }


  const handleBoardNumVarChange = async (event) => {
    const value = event.target.value;
    setBoardNumVar(value);
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBoardNumVar('');
    getBoards();        
    
  }

  return (
    <>
          <div><br></br></div>
      <form onSubmit={handleSubmit} id="select-board-form">
              <div className="mb-3">
                <div className="form-floating mb-3">
                <select onChange={handleBoardNumVarChange} placeholder="Board" required type="text"  name="boardNumVar" id="boardNumVar" className="form-select" value={boardNumVar}>
                  <option>Board</option>
                  {boards.map(board => {
                    return (
                        <option key={board.id} value={board.id}>
                            {board.name}
                        </option>
                    );
                  })}
                </select>
                </div>
              </div>
      </form> 

      {/* Once the state of boardNumVar is selected, use it to filter tasks for the board display */}
      <table className="table table-striped align-middle mt-5">
        <thead>
          <tr>
            <th>Backlog</th>
            <th>To Do</th>
            <th>In Progress</th> 
            <th>In Review/QA</th> 
            <th>Complete</th>             
          </tr>
        </thead>
        <tbody>
            <td>Backlog
                <th>Title</th>
                <th>Description</th>
                <th>Assignee</th> 
                <th>Status</th>
                    <tbody>
                        {tasks.filter(task => task.status == 1 && task.board.id == boardNumVar).map(task => {
                            return (
                            <tr key={task.id}>
                                <td>{ task.title }</td>
                                <td>{ task.description }</td>
                                <td>{ task.assignee }</td>
                                <td>
                                    <select onChange={updateTask(task.id)} placeholder= { task.status } required type="text"  name="taskStatus" id="taskStatus" className="form-select" value={taskStatus}>
                                    <option>Status</option>
                                    {tasks.map(task => {
                                    return (
                                    <option key={task.id} value={task.status}>
                                        {task.status}
                                    </option>
                                    );
                                    })}
                                    </select>
                                </td>   
                            </tr>
                            );
                        })}
                    </tbody>
            </td>
            <td>To Do
                <th>Title</th>
                <th>Description</th>
                <th>Assignee</th> 
                <th>Status</th>
                    <tbody>
                        {tasks.filter(task => task.status == 2 && task.board.id == boardNumVar).map(task => {
                            return (
                            <tr key={task.id}>
                                <td>{ task.title }</td>
                                <td>{ task.description }</td>
                                <td>{ task.assignee }</td>
                                <td>
                                    <select onChange={updateTask(task.id)} placeholder= { task.status } required type="text"  name="taskStatus" id="taskStatus" className="form-select" value={taskStatus}>
                                    <option>Status</option>
                                    {tasks.map(task => {
                                    return (
                                    <option key={task.id} value={task.status}>
                                        {task.status}
                                    </option>
                                    );
                                    })}
                                    </select>
                                </td>  
                            </tr>
                            );
                        })}
                    </tbody>
            </td>
            <td>In Progress
                <th>Title</th>
                <th>Description</th>
                <th>Assignee</th> 
                <th>Status</th>
                    <tbody>
                        {tasks.filter(task => task.status == 3 && task.board.id == boardNumVar).map(task => {
                            return (
                            <tr key={task.id}>
                                <td>{ task.title }</td>
                                <td>{ task.description }</td>
                                <td>{ task.assignee }</td>
                                <td>
                                    <select onChange={updateTask(task.id)} placeholder= { task.status } required type="text"  name="taskStatus" id="taskStatus" className="form-select" value={taskStatus}>
                                    <option>Status</option>
                                    {tasks.map(task => {
                                    return (
                                    <option key={task.id} value={task.status}>
                                        {task.status}
                                    </option>
                                    );
                                    })}
                                    </select>
                                </td>  
                            </tr>
                            );
                        })}
                    </tbody>
            </td>
            <td>In Review/QA
                <th>Title</th>
                <th>Description</th>
                <th>Assignee</th> 
                <th>Status</th>
                    <tbody>
                        {tasks.filter(task => task.status == 4 && task.board.id == boardNumVar).map(task => {
                            return (
                            <tr key={task.id}>
                                <td>{ task.title }</td>
                                <td>{ task.description }</td>
                                <td>{ task.assignee }</td>
                                <td>
                                    <select onChange={updateTask(task.id)} placeholder= { task.status } required type="text"  name="taskStatus" id="taskStatus" className="form-select" value={taskStatus}>
                                    <option>Status</option>
                                    {tasks.map(task => {
                                    return (
                                    <option key={task.id} value={task.status}>
                                        {task.status}
                                    </option>
                                    );
                                    })}
                                    </select>
                                </td>  
                            </tr>
                            );
                        })}
                    </tbody>
            </td>
            <td>Complete!
                <th>Title</th>
                <th>Description</th>
                <th>Assignee</th> 
                <th>Status</th>
                    <tbody>
                        {tasks.filter(task => task.status == 5 && task.board.id == boardNumVar).map(task => {
                            return (
                            <tr key={task.id}>
                                <td>{ task.title }</td>
                                <td>{ task.description }</td>
                                <td>{ task.assignee }</td>
                                <td>
                                    <select onChange={updateTask(task.id)} placeholder= { task.status } required type="text"  name="taskStatus" id="taskStatus" className="form-select" value={taskStatus}>
                                    <option>Status</option>
                                    {tasks.map(task => {
                                    return (
                                    <option key={task.id} value={task.status}>
                                        {task.status}
                                    </option>
                                    );
                                    })}
                                    </select>
                                </td>   
                            </tr>
                            );
                        })}
                    </tbody>
            </td>
        </tbody>
      </table>      
    </>
    );
}