import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [description, setDescription] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:4444/todos", {
      description,
      isCompleted: false,
    });
    alert(data.description + "이 추가되었습니다.");
    setDescription("");
  };
  const readList = async () => {
    const { data } = await axios.get("http://localhost:4444/todos");
    setTodoList(data);
  };
  useEffect(() => {
    (async () => {
      await readList();
    })();
  }, []);
  const toggleCompleteBtn = async (id, isCompleted) => {
    await axios.patch(`http://localhost:4444/todos/${id}`, {
      isCompleted: !isCompleted,
    });
    await readList();
  };
  const deleteTodoBtn = async (id) => {
    await axios.delete(`http://localhost:4444/todos/${id}`);
    await readList();
  };
  return (
    <>
      <h1>1분만에 Rest api 만들기</h1>
      <div>
        <h2>추가하기</h2>
        <input
          placeholder="할 일"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleSubmit}>추가하기</button>
        <br />
        <h2>할 일 목록</h2>
        <ul>
          {todoList?.map((todo) => (
            <div key={todo.id}>
              <li key={todo.id}>{todo.description}</li>
              <button
                onClick={() => toggleCompleteBtn(todo.id, todo.isCompleted)}
              >
                {todo.isCompleted ? "완료" : "미완료"}
              </button>
              <button onClick={() => deleteTodoBtn(todo.id)}>삭제하기</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
