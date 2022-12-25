

export default function Controls({filter}) {
  return (
    <div className="container-fluid d-flex flex-column flex-md-row justify-content-center p-4">
        <div className="input-group m-2 w-auto">
          <input
            className="form-control success w-auto"
            id="search"
            type="test"
            placeholder="Search"
            onChange={filter}
          />
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-center">
          <select
            className=" form-select w-auto m-2"
            id="sort"
            onChange={filter}
          >
            <option>Sort By</option>
            <option>Due Date Ascending</option>
            <option>Due Date Descending</option>
          </select>
          <select
            className=" form-select w-auto m-2"
            id="filter"
            onChange={filter}
          >
            <option>Filter</option>
            <option>Task Pending</option>
            <option>Task Completed</option>
          </select>
        </div>
      </div>
  )
}
