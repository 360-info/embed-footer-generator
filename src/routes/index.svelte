<h1>360info embed code generator</h1>

<!--
  Left col:
  1. input text box
  2. input credit lone
  3. input licence box (or dopdown + text for other?)

  Right col:
  4. output code to copy
    - with clipboard copy button
-->


<p>To help our partners use + remix this content, either provide an <strong>embed code block</strong>, a <strong>link to any project files</strong>, or both.</p>

<LayoutGrid style="max-width: 1200px;">

  <Cell span={6}>

    <h2>Input</h2>

    <h3>Embed (for videos and interactives)</h3>

    <Paper color="outline" style="padding: 24px; outline: 3px dashed #eee; outline-offset: -12px; min-height: 200px;">
      <Textfield
        style="width: 100%; min-height: 200px;"
        helperLine$style="width: 100%;"
        textarea
        bind:value={inputEmbed}
        label="Paste the embed code from Superdesk in here"
      >
      </Textfield>
    </Paper>
    
    <Textfield
      style="width: 100%;"
      helperLine$style="width: 100%;"
      bind:value={inputByline}
      label="Byline"
    >
      <Icon class="material-icons" slot="leadingIcon">account_circle</Icon>
      <HelperText persistent slot="helper">
        eg. "Chart: Sam Fields, 360info. Data: Some Data Place"
      </HelperText>
    </Textfield>

    <Textfield
      style="width: 100%;"
      helperLine$style="width: 100%;"
      bind:value={inputFileURL}
      label="Link to download project files or code"
    >
      <Icon class="material-icons" slot="leadingIcon">download</Icon>
      <HelperText persistent slot="helper">
        eg. "https://github.com/360-info/example-project"
      </HelperText>
    </Textfield>
    
    <div>
      <Select bind:value={selectedContentOption}
        label="What describes the content?">
        {#each contentOptions as menuItem}
          <Option value={menuItem}>{menuItem}</Option>
        {/each}
      </Select>
      <!-- <pre class="status">Selected: {selectedContentOption}</pre> -->
    </div>


  </Cell>

  {#if (inputFileURL !== "") || (inputEmbed !== "")}

    <Cell span={6}>
      <h2 transition:fly={{ y: 20, duration: 500 }}>Output (paste this into Superdesk)</h2>
      <div transition:fly={{ y: 20, duration: 500 }}>
        <Paper color="outline" style="min-height: 200px;">
          <!-- what we actually need here is most stuff remdered, but the escapedInputEmbed inserted as is-->
          <!--<code>{escapedOutputEmbed}</code>-->
          <code>
            {inputEmbed}
            {renderUseRemixHeader()}
            {#if (inputEmbed !== "")}
            {renderEmbedBlockOpen()}{@html escapedInputEmbed}{renderEmbedBlockClose()}
            {/if}
            {#if (inputFileURL !== "")}
            {renderContentLinkBlock(selectedContentOption, inputFileURL)}
            {/if}
            {renderUseRemixFooter()}
          </code>
        </Paper>
      </div>
      <h2 transition:fly={{ y: 20, duration: 500 }}>Preview</h2>
      <div transition:fly={{ y: 20, duration: 500 }}>
        {@html inputEmbed}
        <div style="border: 1px solid #999; color: #999; border-radius: 4px; padding: 12px;">
          <details>
            <summary>Use + remix this chart</summary>
            <div style="padding: 16px 16px 0 16px; font-size: small;">
              {#if (inputEmbed !== "")}
              <details style="padding-bottom: 10px;">
                <summary>Embed in your article</summary>
                <p>Copy the following code into your article:
                <div><code>{inputEmbed}</code></div>
              </details>
              {/if}
              {#if (inputFileURL !== "")}
              <details>
                <summary>Get the {selectedContentOption}</summary>
                <p style="margin-bottom: 0;"><a href="{inputFileURL}">{inputFileURL}</a></p>
              </details>
              {/if}
            </div>
          </details>
        </div>  
      </div>
    </Cell>

  {/if}

</LayoutGrid>

<script lang="ts">
  // import Card, { Content } from '@smui/card';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Paper, { Title, Content } from '@smui/paper';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import HelperText from '@smui/textfield/helper-text';
  import Select, { Option } from '@smui/select';
  import { fly } from 'svelte/transition';
  // import * as sanitizeHtml from 'sanitize-html';
  import sanitizeHtml from 'sanitize-html';
  

  let inputEmbed = '';
  let inputByline = '';
  let inputFileURL = '';

  let contentOptions = ['project files', 'code', 'data', 'code and data',
    'Other formats'];
  let selectedContentOption = 'project files';

  // manually escape the embed first so that we can show its code in the
  // rendered preview
  $: escapedInputEmbed = sanitizeHtml(inputEmbed, {
      allowedTags: [],
      allowedAttributes: false,
      disallowedTagsMode: 'escape'
    }).replace('&', '&amp;');

  function renderUseRemixHeader() {
    return(
      '<div style="border: 1px solid #999; color: #999; border-radius: 4px; ' +
      '  padding: 12px;">\n' +
      '  <details>\n' +
      '    <summary>Use + remix this chart</summary>\n' +
      '    <div style="padding: 16px 16px 0 16px; font-size: small;">\n');
  }

  function renderEmbedBlockOpen() {
    return(
      '  <details style="padding-bottom: 10px;">\n' +
      '    <summary>Embed in your article</summary>\n' +
      '    <p>Copy the following code into your article:\n' +
      '    <div><code>');
  }

  function renderEmbedBlockClose() {
    return('</code>\n</div></details>');

  }

  function renderContentLinkBlock(selectedContentOption, inputFileURL) {
    return(
      '  <details>\n' +
      '    <summary>Get the ' + selectedContentOption + '</summary>\n' +
      '    <p style="margin-bottom: 0;"><a href="' + inputFileURL + '">' +
             inputFileURL + '</a></p>\n' +
      '  </details>\n');
  }

  function renderUseRemixFooter() {
    return('</div></details>');
  }

  function renderOutputEmbed(inputEmbed, inputFileURL, selectedContentOption) {
    
    // assemble the embed code block and the content link blocks
    // (conditional on there being content to add there)
    
    let embedBlock = (inputEmbed === "") ? "" :
      '  <details style="padding-bottom: 10px;">\n' +
      '    <summary>Embed in your article</summary>\n' +
      '    <p>Copy the following code into your article:\n' +
      '    <div><code>' + escapedInputEmbed + '</code></div>\n' +
      '  </details>\n';

    let contentLinkBlock = (inputFileURL === "") ? "" :
      '  <details>\n' +
        '    <summary>Get the ' + selectedContentOption + '</summary>\n' +
        '    <p style="margin-bottom: 0;"><a href="' + inputFileURL + '">' + inputFileURL + '</a></p>\n' +
        '  </details>\n';

    return(
      (inputEmbed === "") && (inputFileURL === "") ? "" :
        inputEmbed + '\n' +
        '<div style="border: 1px solid #999; color: #999; border-radius: 4px; padding: 12px;">\n' +
        '  <details>\n' +
        '    <summary>Use + remix this chart</summary>\n' +
        '    <div style="padding: 16px 16px 0 16px; font-size: small;">\n' +
              embedBlock +
              contentLinkBlock +
        '    </div>\n' +
        '  </details>' +
        '</div>');
  }

</script>

<style>
  /* column layout */
  .columns {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    gap: 50px;

    box-sizing: border-box;
    padding: 50px;
  }
  .col {
    flex: 1;
  }

</style>
