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


<div class="columns">

  <div class="col">

    <h2>Input</h2>
    <Textfield
      style="width: 100%;"
      helperLine$style="width: 100%;"
      textarea
      bind:value={inputEmbed}
      label="Paste the original embed code in here"
    >
    </Textfield>
    
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

  </div>

  <div class="col">
    <h2>Output</h2>
    <Paper color="outline">
      <code>{inputEmbed}</code>
    </Paper>
    <h2>Preview</h2>
    {@html outputEmbed}

  </div>

</div>

<script lang="ts">
  // import Card, { Content } from '@smui/card';
  import Paper, { Title, Content } from '@smui/paper';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import HelperText from '@smui/textfield/helper-text';

  let inputEmbed = '';
  let inputByline = '';
  let inputFileURL = '';

  function concatEmbeds(a, b) {
    return(a + b);
  }

  $: outputEmbed = concatEmbeds('IN: ', inputEmbed);

  function concatStrings(a, b) {
    a + b;
  }

  function renderOutputEmbed(inputEmbed, inputByline, inputFileURL) {

    

    // - original embed code
    // - <details class="mycaption">

    let outputEmbed = inputEmbed + '\n' +
      '<details>\n' +
      '  <summary>Use + remix this chart</summary>\n' +
      '  <div style="border: 1px solid #999; color: #999; border-radius: 4px; padding: 8px;">\n' +
      '    <h5>Embed this in your article</h5>\n' +
      '    <p>Copy the following code into your article:\n' +
      '    <code>' + inputEmbed + '</code>\n' 



//       <div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DlVOE1Ft3knk&key=87ca3314a9fa775b5c3a7726100694b0" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;"></iframe></div></div>
// <details class="mycaption">
//   <summary>Use + remix this chart</summary>
//   <div style="border: 1px solid #999; color: #999; border-radius: 4px; padding: 8px;">
//     <p style="margin: 0;">Copy this code into your article:</p>
//     <code style="font-size: 13px; margin: 0;">&lt;div&gt;&lt;div style=&quot;left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;&quot;&gt;&lt;iframe src=&quot;//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DlVOE1Ft3knk&amp;key=87ca3314a9fa775b5c3a7726100694b0&quot; style=&quot;top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;&quot; allowfullscreen scrolling=&quot;no&quot; allow=&quot;accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *;&quot;&gt;&lt;/iframe&gt;&lt;/div&gt;&lt;/div&gt;
//     </code>
//   </div>
// </details>


  }
</script>

<style>
  /* column layout */
  .columns {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    gap: 10px;
  }
  .col {
    flex-grow: 1;
  }
  .col + .col {
    flex-grow: 2;
  }
</style>
