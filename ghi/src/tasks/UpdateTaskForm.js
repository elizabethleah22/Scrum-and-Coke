import React, { useState, useEffect } from "react";
import { useToken } from "../Auth";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask({ getTasks, boards, users, statuses }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState([]);
  const [board, setBoard] = useState([]);
  const [status, setStatus] = useState([]);
  const [task, setTask] = useState("");
  const { id } = useParams();
  const [token] = useToken();
  const navigate = useNavigate();

  if (!token) {
    navigate("/users/login");
  }

  useEffect(() => {
    async function fetchTask() {
      const taskDetailUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/tasks/${id}`;
      const fetchDetailConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const detailResponse = await fetch(taskDetailUrl, fetchDetailConfig);
      if (detailResponse.ok) {
        const taskData = await detailResponse.json();
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
        setAssignee(taskData.assignee);
        setBoard(taskData.board);
        setStatus(taskData.status);
      }
    }
    fetchTask();
  }, [id]);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleAssigneeChange = (e) => {
    const value = parseInt(e.target.value);
    setAssignee(value);
  };

  const handleBoardChange = (e) => {
    const value = parseInt(e.target.value);
    setBoard(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    console.log("data", data);
    data.title = title;
    data.description = description;
    data.assignee = assignee;
    data.board = board;
    data.status = status;

    const tasklistUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/tasks/${id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(tasklistUrl, fetchConfig);
    if (response.ok) {
      const newTask = await response.json();
      console.log(newTask);
      setTitle("");
      setDescription("");
      setAssignee("");
      setBoard("");
      setStatus("");
      getTasks();
      navigate(`/boards/${board}`);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="FormLabel">Edit this Task</h1>
          <form onSubmit={handleSubmit} id="create-task-form">
            <div className="InputText">
              <input
                onChange={handleTitleChange}
                placeholder={task.title}
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={title}
              />
              <label htmlFor="title"></label>
            </div>
            <div className="InputText">
              <textarea
                onChange={handleDescriptionChange}
                placeholder={task.description}
                required
                value={description}
                id="description"
                name="description"
                className="form-control"
                rows="4"
              />
              <label htmlFor="description"></label>
            </div>
            <div className="mb-3">
              <select
                required
                onChange={handleAssigneeChange}
                name="assignee"
                id="assignee"
                className="form-select"
                value={assignee}
              >
                <option value="">Choose an Assignee</option>
                {users.map((user) => {
                  return (
                    <option key={user.id} value={user.employee_number}>
                      {user.full_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                required
                onChange={handleBoardChange}
                name="board"
                id="board"
                className="form-select"
                value={board}
              >
                <option value="">Choose a Board</option>
                {boards.map((board) => {
                  return (
                    <option key={board.id} value={board.id}>
                      {board.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                required
                onChange={handleStatusChange}
                name="status"
                id="status"
                className="form-select"
                value={status}
              >
                <option value="">Select Status</option>
                {statuses.map((status) => {
                  return (
                    <option key={status.status} value={status.status}>
                      {status.status}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { useToken } from "../Auth";
// import { useNavigate, useParams } from "react-router-dom";

// export default function EditTask({ getTasks, boards, users, statuses }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [assignee, setAssignee] = useState([]);
//   const [board, setBoard] = useState([]);
//   const [status, setStatus] = useState([]);
//   const { id } = useParams();
//   const [token] = useToken();
//   const navigate = useNavigate();

//   if (!token) {
//     console.log("token", token);
//     navigate("/users/login");
//   }

//   useEffect(() => {
//     async function fetchTask() {
//       const taskDetailUrl = `http://localhost:8080/tasks/${id}`;
//       const fetchDetailConfig = {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       };
//       const detailResponse = fetch(taskDetailUrl, fetchDetailConfig);
//       if (detailResponse.ok) {
//         const taskData = detailResponse.json();

//         setTitle(taskData.title);
//         setDescription(taskData.description);
//         setAssignee(taskData.assignee);
//         setBoard(taskData.board);
//         setStatus(taskData.status);
//       }
//     }
//     fetchTask();
//   }, [id]);

//   const handleStatusChange = (e) => {
//     const value = e.target.value;
//     setStatus(value);
//   };

//   const handleTitleChange = (e) => {
//     const value = e.target.value;
//     setTitle(value);
//   };

//   const handleDescriptionChange = (e) => {
//     const value = e.target.value;
//     setDescription(value);
//   };

//   const handleAssigneeChange = (e) => {
//     const value = parseInt(e.target.value);
//     setAssignee(value);
//   };

//   const handleBoardChange = (e) => {
//     const value = parseInt(e.target.value);
//     setBoard(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {};
//     console.log("data", data);
//     data.title = title;
//     data.description = description;
//     data.assignee = assignee;
//     data.board = board;
//     data.status = status;

//     const tasklistUrl = `http://localhost:8080/tasks/${id}`;
//     const fetchConfig = {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     };

//     const response = await fetch(tasklistUrl, fetchConfig);
//     if (response.ok) {
//       const newTask = await response.json();
//       console.log(newTask);

//       setTitle("");
//       setDescription("");
//       setAssignee("");
//       setBoard("");
//       setStatus("");
//       getTasks();
//       navigate(`/boards/${board}`);
//     }
//   };

//   return (
//     <div className="row">
//       <div className="offset-3 col-6">
//         <div className="shadow p-4 mt-4">
//           <h1 className="FormLabel">Edit this Task</h1>
//           <form onSubmit={handleSubmit} id="create-task-form">
//             <div className="InputText">
//               <input
//                 onChange={handleTitleChange}
//                 placeholder="Title"
//                 required
//                 type="text"
//                 name="title"
//                 id="title"
//                 className="form-control"
//                 defaultValue={title}
//               />
//               <label htmlFor="title"></label>
//             </div>
//             <div className="InputText">
//               <input
//                 onChange={handleDescriptionChange}
//                 placeholder="Description"
//                 required
//                 type="text"
//                 name="description"
//                 id="description"
//                 className="form-control"
//                 value={description}
//               />
//               <label htmlFor="description"></label>
//             </div>
//             <div className="mb-3">
//               <select
//                 required
//                 onChange={handleAssigneeChange}
//                 name="assignee"
//                 id="assignee"
//                 className="form-select"
//                 value={assignee}
//               >
//                 <option value="">Choose an Assignee</option>
//                 {users.map((user) => {
//                   return (
//                     <option key={user.id} value={user.employee_number}>
//                       {user.full_name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="mb-3">
//               <select
//                 required
//                 onChange={handleBoardChange}
//                 name="board"
//                 id="board"
//                 className="form-select"
//                 value={board}
//               >
//                 <option value="">Choose a Board</option>
//                 {boards.map((board) => {
//                   return (
//                     <option key={board.id} value={board.id}>
//                       {board.name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="mb-3">
//               <select
//                 required
//                 onChange={handleStatusChange}
//                 name="status"
//                 id="status"
//                 className="form-select"
//                 value={status}
//               >
//                 <option value="">Select Status</option>
//                 {statuses.map((status) => {
//                   return (
//                     <option key={status.status} value={status.status}>
//                       {status.status}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <button className="btn btn-primary">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
