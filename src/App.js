import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./Navbar/Navbar";
import Controls from "./Controls/Controls";
import Modal from "./Modal/Modal";
import Tabs from "./Tabs/Tabs";
import Task from "./Task/Task";

function App() {
  const [tasks, setTasks] = useState(
    window.localStorage.getItem("tasks") &&
      window.localStorage.getItem("tasks") !== "null"
      ? JSON.parse(window.localStorage.getItem("tasks"))
      : []
  );
  const [filtered, setFiltered] = useState();
  const [modal, setModal] = useState({});
  const [tab, setTab] = useState("all");

  const addTask = (title, description, due) => {
    if (filtered) {
      setFiltered(
        filtered.concat({
          title: title,
          description: description,
          due: due,
          status: "pending",
        })
      );
    }
    setTasks(
      tasks.concat({
        title: title,
        description: description,
        due: due,
        status: "pending",
      })
    );
  };

  const removeTask = (i) => {
    if (filtered) {
      setFiltered(
        filtered.slice(0, i).concat(filtered.slice(i + 1, filtered.length))
      );
      i = tasks.indexOf(filtered[i]);
    }
    setTasks(tasks.slice(0, i).concat(tasks.slice(i + 1, tasks.length)));
  };

  const editTask = (i, title, description, due) => {
    if (filtered) {
      setFiltered(
        filtered.slice(0, i).concat(
          [
            {
              title: title,
              description: description,
              due: due,
              status: filtered[i].status,
            },
          ].concat(filtered.slice(i + 1, filtered.length))
        )
      );
      i = tasks.indexOf(filtered[i]);
    }
    setTasks(
      tasks.slice(0, i).concat(
        [
          {
            title: title,
            description: description,
            due: due,
            status: tasks[i].status,
          },
        ].concat(tasks.slice(i + 1, tasks.length))
      )
    );
  };

  const modifyStatus = (i, status) => {
    if (filtered) {
      setFiltered(
        filtered.slice(0, i).concat(
          [
            {
              title: filtered[i].title,
              description: filtered[i].description,
              due: filtered[i].due,
              status: status,
            },
          ].concat(filtered.slice(i + 1, filtered.length))
        )
      );
      i = tasks.indexOf(filtered[i]);
    }
    setTasks(
      tasks.slice(0, i).concat(
        [
          {
            title: tasks[i].title,
            description: tasks[i].description,
            due: tasks[i].due,
            status: status,
          },
        ].concat(tasks.slice(i + 1, tasks.length))
      )
    );
  };

  const filterTasks = () => {
    if (
      document.getElementById("search").value.toLowerCase() === "" &&
      document.getElementById("sort").value === "Sort By" &&
      document.getElementById("filter").value === "Filter"
    ) {
      setFiltered();
    } else {
      let query = document.getElementById("search").value.toLowerCase();
      let searched = tasks.filter((t) => t.title.toLowerCase().includes(query));
      let sort = document.getElementById("sort").value;
      if (sort === "Sort By") {
        sort = [].concat(searched);
      }
      if (sort === "Due Date Ascending") {
        sort = searched.sort((a, b) =>
          a.due - b.due ? 1 : a.due < b.due ? -1 : 0
        );
      }
      if (sort === "Due Date Descending") {
        sort = searched.sort((a, b) =>
          a.due > b.due ? -1 : a.due < b.due ? 1 : 0
        );
      }
      let filter = document.getElementById("filter").value;
      if (filter === "Filter") {
        filter = [].concat(sort);
      }
      if (filter === "Task Pending") {
        filter = sort.filter((task) => task.status === "pending");
      }
      if (filter === "Task Completed") {
        filter = sort.filter((task) => task.status === "completed");
      }
      setFiltered(filter);
    }
  };

  const getDueToday = (list) => {
    return list?.filter(
      (item) => new Date(item.due).toDateString() === new Date().toDateString()
    );
  };

  const getOverDue = (list) => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return list?.filter((item) => new Date(item.due) < date);
  };

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    window.localStorage.getItem("tasks") === "null" &&
      window.localStorage.removeItem("tasks");
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar modal={setModal} />
        <Controls filter={filterTasks} />
        {modal.type && (
          <Modal
            type={modal.type}
            index={modal.index}
            title={modal.title}
            description={modal.description}
            due={modal.due}
            add={addTask}
            edit={editTask}
            remove={removeTask}
            modify={modifyStatus}
            modal={setModal}
          />
        )}
        <Tabs curr={tab} change={setTab} />
        <hr />
        <Routes>
          <Route
            path="/"
            element={
              <Task
                tasks={filtered ? filtered : tasks}
                edit={editTask}
                remove={removeTask}
                modify={modifyStatus}
                modal={setModal}
              />
            }
          />
          <Route
            path="/duetoday"
            element={
              <Task
                tasks={filtered ? getDueToday(filtered) : getDueToday(tasks)}
                edit={editTask}
                remove={removeTask}
                modify={modifyStatus}
                modal={setModal}
              />
            }
          />
          <Route
            path="/overdue"
            element={
              <Task
                tasks={filtered ? getOverDue(filtered) : getOverDue(tasks)}
                edit={editTask}
                remove={removeTask}
                modify={modifyStatus}
                modal={setModal}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
