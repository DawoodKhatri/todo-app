export default function Card({
  title,
  description,
  due,
  status,
  modify,
  index,
  modal,
}) {
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card p-0 mx-1 my-2 m-sm-3">
        <div className="card-header">
          <h4>{title}</h4>
        </div>
        <div className="card-body">
          <p className=" card-title">{description}</p>
          <p className=" card-text">Due By: {due.split("-").reverse().join("-")}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center p-2">
          <div>
            {status === "pending" && (
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={() => {
                  modal({
                    type: "Task Completed",
                    index: index,
                  });
                }}
              >
                Mask as Done
              </button>
            )}
            {status === "completed" && (
              <button
                className="btn btn-success btn-sm position-relative mx-2"
                onClick={() => {
                  modify(index, "pending");
                }}
              >
                Completed
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  <i className="bi bi-x"></i>
                </span>
              </button>
            )}
          </div>
          <div>
            <button
              className="btn btn-sm btn-secondary mx-2"
              onClick={() => {
                modal({
                  type: "Remove Task",
                  index: index,
                });
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-success mx-2"
              onClick={() => {
                modal({
                  type: "Edit Task",
                  index: index,
                  title: title,
                  description: description,
                  due: due,
                });
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
