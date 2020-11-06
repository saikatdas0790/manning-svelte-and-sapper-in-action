<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Item from "./Item.svelte";
  import Dialog from "./Dialog.svelte";
  import { getGuid, blurOnKey, sortOnName } from "./util";
  import type {
    Category as CategoryType,
    DragAndDrop,
    Item as ItemType,
    ShowValues,
  } from "./Types";

  const dispatch = createEventDispatcher();

  export let categories: {
    [key: string]: CategoryType;
  };
  export let category: CategoryType;
  export let show: ShowValues;
  export let dnd: DragAndDrop;

  let editing = false;
  let itemName = "";
  let items: ItemType[] = [];
  let message = "";
  let dialog: HTMLDialogElement = null;
  let hovering = false;

  $: items = Object.values(category.items);
  $: remaining = items.filter((item) => !item.packed).length;
  $: total = items.length;
  $: status = `${remaining} of ${total} remaining`;
  $: itemsToShow = sortOnName(items.filter((i) => shouldShow(show, i)));

  function addItem(): void {
    const duplicate = Object.values(categories).some((cat) =>
      Object.values(cat.items).some((item) => item.name === itemName),
    );
    if (duplicate) {
      message = `The item "${itemName}" already exists.`;
      dialog.showModal();
      return;
    }
    const { items } = category;
    const id = getGuid();
    items[id] = { id, name: itemName, packed: false };
    category.items = items;
    itemName = "";
  }

  const deleteItem = (item: ItemType): void => {
    delete category.items[item.id];
    category = category;
  };

  dispatch("persist");

  function shouldShow(show: ShowValues, item: ItemType) {
    return (
      show === "all" ||
      (show === "packed" && item.packed) ||
      (show === "unpacked" && !item.packed)
    );
  }
</script>

<style>
  button,
  input {
    border: solid lightgray 1px;
  }
  button.icon {
    border: none;
  }
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }
  section {
    --padding: 0.5rem;
    background-color: white;
    border: solid transparent 3px;
    border-radius: var(--padding);
    color: black;
    display: inline-block;
    margin: var(--padding);
    padding: calc(var(--padding) * 2);
    padding-top: 0;
    vertical-align: top;
  }
  .status {
    font-size: 1.2rem;
    font-weight: normal;
    margin: 0 1rem;
  }
  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
  .hover {
    border-color: orange;
  }
</style>

<section
  class:hover={hovering}
  on:dragenter={() => (hovering = true)}
  on:dragleave={(event) => {
    const localName = event.target.localName;
    if (localName === 'section') hovering = false;
  }}
  on:drop|preventDefault={(event) => {
    dnd.drop(event, category.id);
    hovering = false;
  }}
  on:dragover|preventDefault>
  <h3>
    {#if editing}
      <input
        bind:value={category.name}
        on:blur={() => (editing = false)}
        on:keypress={blurOnKey} />
    {:else}<span on:click={() => (editing = true)}>{category.name}</span>{/if}
    <span class="status">{status}</span>
    <button class="icon">&#x1F5D1;</button>
  </h3>

  <form on:submit|preventDefault={addItem}>
    <label> New Item <input required bind:value={itemName} /> </label>
    <button>Add Item</button>
  </form>

  <ul>
    {#each itemsToShow as item (item.id)}
      <!-- This bind causes the category object to update
        when the item packed value is toggled. -->
      <Item
        bind:item
        on:delete={() => deleteItem(item)}
        categoryId={category.id}
        {dnd} />
    {:else}
      <div>This category does not contain any items yet.</div>
    {/each}
  </ul>
</section>

<Dialog title="Category" bind:dialog>
  <div>{message}</div>
</Dialog>
