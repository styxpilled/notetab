<script lang="ts">
  import { tabs, currentTab } from '~/lib/helpers';
  import MdiDelete from '~icons/mdi/delete';
  import MdiPlus from '~icons/mdi/plus';
  import MdiPencil from '~icons/mdi/pencil';

  import { Carta, CartaEditor } from 'carta-md';
  // Component default theme
  // import 'carta-md/default-theme.css';
  // Markdown input theme (PrismJS)
  import 'carta-md/dark.css';
  // Custom carta theme
  import '~/lib/carta.css';
  import { onMount } from 'svelte';

  const carta = new Carta({
    // Remember to use a sanitizer to prevent XSS attacks
    // sanitizer: mySanitizer
  });

  let fallback = '';
  let renameTarget = '';
  let renamed = '';

  const addTab = () => {
    const key = 'New Tab ' + Object.keys($tabs).length.toString();
    $tabs[key] = {
      value: '',
    };
    return key;
  };

  const renameTab = () => {
    if (renameTarget !== renamed || renamed === '') {
      $tabs[renamed] = $tabs[renameTarget];
      $tabs[renameTarget] = null;
      delete $tabs[renameTarget];
      $tabs = $tabs;
      $currentTab = renamed;
    }
    renameTarget = '';
    renamed = '';
  };

  const deleteTab = () => {
    const tabKeys = Object.keys($tabs).reverse();
    if (tabKeys.length === 1) {
      return;
    }
    const index = tabKeys.indexOf($currentTab);
    delete $tabs[$currentTab];
    if (index === 0) {
      $currentTab = tabKeys[1];
    } else {
      $currentTab = tabKeys[0];
    }
    $tabs = $tabs;
  };

  onMount(() => {
    console.log($tabs);

    if (Object.keys($tabs).length === 0) {
      $currentTab = addTab();
    }
  });
</script>

<main>
  <aside class="content">
    <button class="plus" on:click={addTab}><MdiPlus /></button>
    <ul>
      {#each Object.keys($tabs).reverse() as tab}
        {#if renameTarget !== tab}
          <li class:active={$currentTab === tab}>
            {#if $currentTab === tab}
              <button
                class="btn"
                on:click={() => {
                  renameTarget = tab;
                  renamed = tab;
                }}><MdiPencil /></button
              >
              <button class="btn error" on:click={deleteTab}
                ><MdiDelete /></button
              >
            {/if}
            <button
              class:active={$currentTab === tab}
              class="content"
              on:click={() => ($currentTab = tab)}
            >
              {tab}
            </button>
          </li>
        {:else}
          <form on:submit|preventDefault={renameTab}>
            <input bind:value={renamed} type="text" />
          </form>
        {/if}
      {/each}
    </ul>
  </aside>
  <div>
    <CartaEditor bind:value={$tabs[$currentTab].value} {carta} />
  </div>
</main>

<style>
  :global(html, body) {
    background-color: #181a1b;
    color: rgb(var(--color-surface-700));
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div {
    display: block;
    width: 90rem;
    /* height: 90rem; */
  }

  li .content {
    font-size: 1.6rem;
  }

  li:not(.active) {
    padding-left: 4rem;
  }

  button.active {
    background-color: rgb(var(--color-accent-400));
  }
</style>
