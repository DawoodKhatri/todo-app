import { useEffect, useState } from "react";

export default function Modal({
  type,
  index,
  title,
  description,
  due,
  add,
  edit,
  remove,
  modify,
  modal,
}) {
  const [error, setError] = useState();

  const submit = () => {
    if (
      document.getElementById("title")?.value === "" ||
      document.getElementById("description")?.value === "" ||
      document.getElementById("due")?.value === ""
    ) {
      setError("All Fields are Mandatory");
    } else {
      if (
        document.getElementById("due")?.value <
        new Date().toISOString().substring(0, 10)
      ) {
        setError("Date is Incorrect");
      } else {
        if (type === "Add Task") {
          add(
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("due").value
          );
          document.getElementById("toggle").click();
        }
        if (type === "Edit Task") {
          edit(
            index,
            document.getElementById("title").value,
            document.getElementById("description").value,
            document.getElementById("due").value
          );
          document.getElementById("toggle").click();
        }
      }
    }
    if (type === "Remove Task") {
      remove(index);
      document.getElementById("toggle").click();
    }
    if (type === "Task Completed") {
      modify(index, "completed");
      document.getElementById("toggle").click();
    }
  };
  useEffect(() => {
    document.getElementById("toggle").click();
    document
      .getElementById("inputModal")
      .addEventListener("hide.bs.modal", () => {
        modal({});
      });
  }, []);

  return (
    <>
      <button
        id="toggle"
        data-bs-toggle="modal"
        data-bs-target="#inputModal"
        style={{ display: "none" }}
      ></button>
      <div className="modal fade" id="inputModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{type}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {(type === "Add Task" || type === "Edit Task") && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Task Title</label>
                    <input
                      className="form-control"
                      id="title"
                      type="text"
                      defaultValue={title}
                      onChange={() => {
                        setError();
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Task Description</label>
                    <input
                      className="form-control"
                      id="description"
                      type="text"
                      defaultValue={description}
                      onChange={() => {
                        setError();
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Task Due</label>
                    <input
                      className="form-control"
                      id="due"
                      type="date"
                      min={new Date().toISOString().substring(0, 10)}
                      defaultValue={due}
                      onChange={() => {
                        setError();
                      }}
                    />
                  </div>
                  {error && (
                    <div className="mb-3 text-center border border-2 rounded rounded-2 border-danger">
                      <label className="form-label mx-3 my-1 text-danger">
                        {error}
                      </label>
                    </div>
                  )}
                </>
              )}
              {type === "Remove Task" && (
                <div className="mb-3">
                  <label className="form-label">
                    Are you Sure you want to Remove this Task
                  </label>
                </div>
              )}
              {type === "Task Completed" && (
                <div className="mb-3">
                  <label className="form-label">
                    Are you Sure you have Completed this Task
                  </label>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                // data-bs-dismiss="modal"
                onClick={submit}
              >
                {(type === "Add Task" || type === "Edit Task") && "Save Task"}
                {type === "Remove Task" && "Remove Taks"}
                {type === "Task Completed" && "Yes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
