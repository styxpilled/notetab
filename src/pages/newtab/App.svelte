<script lang="ts">
  import PageContent from '~/lib/PageContent.svelte';
  import browser from 'webextension-polyfill';
  import { strip, stripHTML } from '~/lib/render';
  import { CaretUtil } from '~/lib/selection';
  let timer: ReturnType<typeof setTimeout>;
  let editor: HTMLElement;
  let markdown;
  let savedpos;

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      browser.storage.local.set({
        md: markdown,
      });
    }, 500);
  };

  const updatePreview = (
    event?: Event & { currentTarget: EventTarget & HTMLDivElement },
    source?: HTMLElement | string
  ) => {
    let target = event.currentTarget;
    source = source ?? target;
    savedpos = CaretUtil.getCaretPosition(target);
    markdown = stripHTML(source);
    console.log(markdown);

    const content = markdown;
    console.log(content);

    target.innerHTML = content + '<br>';
    CaretUtil.setCaretPosition(target, savedpos);
    debounce();
  };
</script>

<main>
  <PageContent>New Tab</PageContent>
  <div
    id="editor"
    spellcheck="false"
    contenteditable="true"
    on:input={updatePreview}
  >
    <!-- <pre> -->
    # heading <br />
    ## heading2 <br /> <br />
    other text <br /> **bold**<br />
    *emphasis*
    <br />
    ***bold emphasis*** ~changed my mind~ <br />
    [ddg link for some reason](https://duckduckgo.com). <br />
    ![i lovem mywife](https://cdn.discordapp.com/attachments/845778663022395452/968344841140453416/unknown.png)
    ```js console.log('bals') ```
    <!-- </pre> -->
  </div>
</main>

<style>
  #editor {
    padding: 2em 40vh 50vh;
    background-color: var(--background-primary);
    font-size: 1.5em;
    /* background-color: blue; */
    min-height: 100vh;
    outline: none;
    font-family: 'Roboto Mono', sans-serif;
  }
  main {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
