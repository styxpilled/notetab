<script lang="ts">
  import 'bytemd/dist/index.css';
  import { Editor, Viewer } from 'bytemd';
  import gfm from '@bytemd/plugin-gfm';
  import { onMount } from 'svelte';

  const plugins = [gfm()];

  let value = '';
  let timeout: number;

  const debounce = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      localStorage.setItem('note', value);
    }, 500);
  };

  const handleChange = (e) => {
    value = e.detail.value;
    debounce();
  };

  onMount(() => {
    value = localStorage.getItem('note') || '';
  });
</script>

<main>
  <div>
    <Editor {value} {plugins} mode="tab" on:change={handleChange} />
  </div>
</main>

<style>
  :global(html, body) {
    background-color: aliceblue;
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

  :global(.bytemd) {
    height: 50rem;
    width: 50rem;
  }
</style>
