export default function Navbar({modal}) {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-success">
    <div className="container-fluid">
      <p className="navbar-brand mx-3 my-2" >
        To Do App
      </p>
      <button
        className="btn btn-light mx-3 my-2"
        onClick={() => {
          modal({ type: "Add Task" });
        }}
      >
        Add New Task
      </button>
    </div>
  </nav>
  )
}
