<script lang="ts">
  import Todo from "./Todo.svelte";
  import type { Todo as TodoType } from "./Todo";
  let lastId = 0;

  const createTodo = (text: string, done = false): TodoType => ({
    id: ++lastId,
    text,
    done,
  });

  let todoText = "";

  let todos: TodoType[] = [
    createTodo("learn Svelte", true),
    createTodo("build a Svelte app"),
  ];

  $: uncompletedCount = todos.filter((t) => !t.done).length;
  $: status = `${uncompletedCount} of ${todos.length} remaining`;

  const addTodo = (): void => {
    todos = todos.concat(createTodo(todoText));
    todoText = "";
  };

  const archiveCompleted = (): void => {
    todos = todos.filter((t) => !t.done);
  };

  const deleteTodo = (todoId: number): void => {
    todos = todos.filter((t) => t.id !== todoId);
  };

  const toggleDone = (todo: TodoType): void => {
    const { id } = todo;
    todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  };
</script>

<style>
  button {
    margin-left: 10px;
  }

  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
</style>

<div>
  <h1>To Do List</h1>
  <div>
    {status}
    <button on:click={archiveCompleted}>Archive Completed</button>
  </div>
  <form on:submit|preventDefault>
    <input size="30" placeholder="enter new todo here" bind:value={todoText} />
    <button disabled={!todoText} on:click={addTodo}>Add</button>
  </form>
  <ul>
    {#each todos as todo}
      <Todo
        {todo}
        on:delete={() => deleteTodo(todo.id)}
        on:toggleDone={() => toggleDone(todo)} />
    {/each}
  </ul>
</div>
