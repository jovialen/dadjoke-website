<script>
  import { onMount } from 'svelte';

  import { dadjoke, dadjokeStatus, dadjokeResponse } from '../jokeapi.js';

  onMount(() => {
    dadjoke.fetch();
  })
</script>

<svelte:head>
  <title>Dadjokes</title>
</svelte:head>

<section>
  <div class="container">
    <h1>
      Dad says:
    </h1>
    <div id="joke">
      {#if ($dadjoke.status >= 200 && $dadjoke.status < 300)}
        {$dadjoke.joke}
      {:else}
        Sorry! No dad joke this time. {$dadjokeStatus}
      {/if}
    </div>
    <button on:click={dadjoke.fetch}>
      {$dadjokeResponse}
    </button>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

  * {
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
  }

  section {
    width: 100%;
    height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border: black 1px solid;
    border-radius: 0.5rem;
    margin: auto;
    padding: 2rem;

    width: 300px;
    min-height: 400px;
  }

  @media (max-width: 640px) {
    section {
      padding: 0.5rem;
    }

    .container {
      width: 100%;
    }
  }

  .container > * {
    margin: 0.5rem;
  }

  h1 {
    font-size: 1em;
    font-weight: 500;
  }

  #joke {
    display: flex;
    flex-direction: column;
    justify-content: center;

    flex-grow: 1;
    max-width: 60ch;

    font-size: 1.5em;
    font-weight: 500;
  }

  button {
    font-size: 1em;
    font-weight: 500;

    padding: 0.25em;
  }
</style>
