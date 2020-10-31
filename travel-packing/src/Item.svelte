<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Item } from "./Types";
  import { blurOnKey } from "./util";

  const dispatch = createEventDispatcher();

  export let item: Item;
  let editing = false;
</script>

<style>
  button {
    background-color: transparent;
    border: none;
  }
  input[type="checkbox"] {
    --size: 1.5rem;
    height: var(--size);
    width: var(--size);
  }
  input[type="text"] {
    border: solid lightgray 1px;
  }
  li {
    display: flex;
    align-items: center;
  }
  .packed-true {
    color: gray;
    text-decoration: line-through;
  }
  span {
    margin: 0 0.5rem;
  }
</style>

<li>
  <input type="checkbox" bind:checked={item.packed} />
  {#if editing}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      autofocus
      bind:value={item.name}
      on:blur={() => (editing = false)}
      on:keydown={blurOnKey}
      type="text" />
  {:else}
    <span class="packed-{item.packed}" on:click={() => (editing = true)}>
      {item.name}
    </span>
  {/if}
  <button class="icon" on:click={() => dispatch('delete')}>&#x1F5D1;</button>
</li>
