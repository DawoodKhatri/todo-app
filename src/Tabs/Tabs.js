import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Tabs({ curr, change }) {
  useEffect(() => {
    if (window.location.href.includes("/duetoday")) {
      change("duetoday");
    } else {
      if (window.location.href.includes("/overdue")) {
        change("overdue");
      } else {
        change("all");
      }
    }
  }, []);
  return (
    <div className=" container-fluid d-flex justify-content-center w-100">
      <nav className="nav nav-pills nav-justified col-11 col-sm-10 col-md-7">
        <Link
          className={
            "nav-link p-2 " +
            (curr === "all" ? "bg-success text-light active" : "text-dark")
          }
          to="/"
          onClick={() => {
            change("all");
          }}
        >
          All Tasks
        </Link>
        <Link
          className={
            "nav-link p-2 " +
            (curr === "duetoday" ? "bg-success text-light active" : "text-dark")
          }
          to="/duetoday"
          onClick={() => {
            change("duetoday");
          }}
        >
          Due Today
        </Link>
        <Link
          className={
            "nav-link p-2 " +
            (curr === "overdue" ? "bg-success text-light active" : "text-dark")
          }
          to="/overdue"
          onClick={() => {
            change("overdue");
          }}
        >
          Over Due
        </Link>
      </nav>
    </div>
  );
}
