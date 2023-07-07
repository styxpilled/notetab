<script lang="ts">
  import '~/lib/app.css';
  // import '~/lib/remedy.css';

  import Notepad from './Notepad.svelte';
  import MdiCalendar from '~icons/mdi/calendar';
  import MdiNotebook from '~icons/mdi/notebook';
  import MdiMenu from '~icons/mdi/menu';

  let mode: 'calendar' | 'notepad' | 'tasks' = 'notepad';
</script>

<nav>
  <ul>
    <li>
      <label class:checked={mode === 'calendar'}>
        <input type="radio" bind:group={mode} name="scoops" value="calendar" />
        <MdiCalendar /> Calendar
      </label>
    </li>
    <li>
      <label class:checked={mode === 'notepad'}>
        <input type="radio" bind:group={mode} name="scoops" value="notepad" />
        <MdiNotebook /> Notepad
      </label>
    </li>
    <li>
      <label class:checked={mode === 'tasks'}>
        <input type="radio" bind:group={mode} name="scoops" value="tasks" />
        <MdiMenu /> Tasks
      </label>
    </li>
  </ul>
</nav>

{#if mode === 'notepad'}
  <Notepad />
{:else if mode === 'calendar'}
  calendar here
{:else}
  tasks here
{/if}

<style>
  label {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  input[type='radio'] {
    display: none;
  }

  .checked {
    background-color: red;
  }
</style>
