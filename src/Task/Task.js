import Card from "../Card/Card";
export default function Task({ tasks, edit, remove, modify, modal }) {
  return (
    <div className="container-fluid row p-2 p-sm-4 m-0 w-fit justify-content-start">
      {tasks?.map((task, i) => (
        <Card
          key={i}
          index={i}
          title={task.title}
          description={task.description}
          due={task.due}
          status={task.status}
          modify={modify}
          edit={edit}
          remove={remove}
          modal={modal}
        />
      ))}
      {!tasks?.length && (
        <div className="container-fluid text-center">
          <p>No Tasks Added</p>
        </div>
      )}
    </div>
  );
}
