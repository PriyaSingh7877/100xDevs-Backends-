export default async function Todos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    next: { revalidate: 10 }
  })
  const todos = await res.json();

  return <div>
    {todos.map((todo: any) => <div key={todo.id}>
      {todo.title}
    </div>)}y
  </div>
}