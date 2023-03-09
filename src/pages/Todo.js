import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, where, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import TodoList from "../components/TodoList";

const Todo = ({ user }) => {
  const userId = user?.uid;
  const [works, setWorks] = useState([]);
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const worksRef = collection(db, "works")
    const sortQuery = query(worksRef, where("userId", "==", userId), where("type", "==", "Homework"), orderBy("dueDate"));
    const querySnapshot = await getDocs(sortQuery);
    let todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({id: doc.id, ...doc.data()});
    })
    setTodos(todos);
  }
  
  useEffect(() => {
  getTodos();
  const unsub = onSnapshot(
    collection(db, "works"),
    (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setWorks(list);
    },
    (error) => {
      console.log(error);
    }
  );

  return () => {
    unsub();
    getTodos();
  };
}, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that to-do?")) {
      try {
        await deleteDoc(doc(db, "classes", id));
        toast.success("To-Do deleted successfully!");
      } catch (err) {
        console.log(err);
      }
    }
    window.location.reload(false);
  };

  const completeTodo = async (id, status) => {
    if (status === 'To-Do') {
      try {
        await updateDoc(doc(db, "works", id), {
          status: "Done",
        });
      } catch (err) {
        console.log(err);
      }
    }
    else if (status === 'Done') {
      try {
        await updateDoc(doc(db, "works", id), {
          status: "To-Do",
        });
      } catch (err) {
        console.log(err);
      }
    }
    window.location.reload(false);
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
      <div className="col-md-12">
        <div className="blog-heading text-start py-2 mb-4">To-Do List</div>
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          handleDelete={handleDelete}
          user={user}
        />
      </div>
      </div>
    </div>
  )
}

export default Todo