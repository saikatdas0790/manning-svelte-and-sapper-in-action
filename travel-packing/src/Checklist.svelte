<script>
  import Category from "./Category.svelte";
  import { getGuid, sortOnName } from "./util";

  let categoryArray = [];
  let categories = {};
  let categoryName;
  let message = "";
  let show = "all";

  $: categoryArray = sortOnName(Object.values(categories));

  const addCategory = () => {
    const duplicate = Object.values(categories).some(
      (cat) => cat.name === categoryName
    );
    if (duplicate) {
      message = `The category "${categoryName}" already exists.`;
      alert(message);
      return;
    }

    const id = getGuid();
    categories[id] = { id, name: categoryName, items: {} };
    categories = categories;
    categoryName = "";
  };

  const clearAllChecks = () => {
    for (const category of Object.values(categories))
      for (const item of Object.values(category.items)) item.packed = false;
    categories = categories;
  };
</script>

<style>
  .categories {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .clear {
    margin-left: 30px;
  }

  input[type="radio"] {
    --size: 24px;
    height: var(--size);
    width: var(--size);
    margin-left: 10px;
  }

  .logout-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .radios {
    display: flex;
    align-items: center;
  }

  .radios > label:not(:first-of-type) {
    display: inline-flex;
    align-items: center;
    margin-left: 1em;
  }

  .radios > label > input {
    margin-bottom: -3px;
    margin-right: 5px;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 24px;
    margin-top: 1em;
  }
</style>

<section>
  <header>
    <form on:submit|preventDefault={addCategory}>
      <label>
        New Category
        <input bind:value={categoryName} />
      </label>
      <button disabled={!categoryName}>Add category</button>
      <button class="logout-btn">Log Out</button>
    </form>
    <p>
      Suggested categories include Backpack, Clothes,
      <br />
      Last Minute, Medicines, Running Gear and Toiletries
    </p>

    <div class="radios">
      <label>Show</label>
      <label>
        <input type="radio" name="show" value="all" bind:group={show} />
        All
      </label>
      <label>
        <input type="radio" name="show" value="packed" bind:group={show} />
        Packed
      </label>
      <label>
        <input type="radio" name="show" value="unpacked" bind:group={show} />
        Unpacked
      </label>

      <button class="clear" on:click={clearAllChecks}>Clear all checks</button>
    </div>
  </header>

  <div class="categories">
    {#each categoryArray as category (category.id)}
      <Category bind:category {categories} {show} />
    {/each}
  </div>
</section>