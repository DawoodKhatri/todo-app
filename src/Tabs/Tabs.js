import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Tabs({ change }) {
  const handleActive = (i) => {
    const active = document.getElementsByClassName("active")[0];
    active.classList.remove("active");
    active.classList.remove("bg-success");
    active.classList.remove("text-light");
    active.classList.add("text-dark");
    const curr = document.getElementsByClassName("nav-link")[i];
    curr.classList.remove("text-dark");
    curr.classList.add("bg-success");
    active.classList.add("text-light");
    curr.classList.add("active");
  };

  useEffect(() => {
    if (window.location.href.includes("/duetoday")) {
      handleActive(1);
      change("duetoday");
    } else {
      if (window.location.href.includes("/overdue")) {
        handleActive(2);
        change("overdue");
      } else {
        handleActive(0);
        change("all");
      }
    }
  });
  return (
    <div className=" container-fluid d-flex justify-content-center w-100">
      <nav className="nav nav-pills nav-justified col-11 col-sm-10 col-md-7">
        <Link
          className="nav-link bg-success text-light active p-2"
          to="/"
          onClick={() => {
            handleActive(0);
            change("all");
          }}
        >
          All Tasks
        </Link>
        <Link
          className="nav-link text-dark  p-2"
          to="/duetoday"
          onClick={() => {
            handleActive(1);
            change("duetoday");
          }}
        >
          Due Today
        </Link>
        <Link
          className="nav-link text-dark  p-2"
          to="/overdue"
          onClick={() => {
            handleActive(2);
            change("overdue");
          }}
        >
          Over Due
        </Link>
      </nav>
    </div>
  );
}
