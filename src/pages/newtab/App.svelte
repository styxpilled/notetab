<script lang="ts">
  // import '~/lib/remedy.css';
  import 'bytemd/dist/index.css';
  import { Editor, Viewer } from 'bytemd';
  import gfm from '@bytemd/plugin-gfm';
  import { tabs, currentTab } from '~/lib/helpers';

  const plugins = [gfm()];

  let renameTarget = '';
  let renamed = '';

  const handleChange = (e) => {
    $tabs[$currentTab].value = e.detail.value;
  };

  const addTab = () => {
    $tabs['New Tab ' + Object.keys($tabs).length.toString()] = {
      value: '',
    };
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
</script>

<main>
  <aside>
    <button class="plus" on:click={addTab}> + </button>
    <ul>
      {#each Object.keys($tabs).reverse() as tab}
        {#if renameTarget !== tab}
          <li>
            {#if $currentTab === tab}
              <button
                on:click={() => {
                  renameTarget = tab;
                  renamed = tab;
                }}>Rename</button
              >
              <button
                on:click={() => {
                  delete $tabs[tab];
                  $tabs = $tabs;
                }}>Delete</button
              >
            {/if}
            <button
              class:active={$currentTab === tab}
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
    <Editor
      value={$tabs[$currentTab].value}
      {plugins}
      mode="tab"
      on:change={handleChange}
    />
  </div>
</main>

<style>
  :global(html, body) {
    background-color: aliceblue;
    color: black;
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
    width: 50rem;
    height: 50rem;
  }

  .plus {
    background-color: red;
  }

  .active {
    background-color: lightskyblue;
  }

  :global(.bytemd) {
    height: 50rem;
    width: 50rem;
  }
</style>
