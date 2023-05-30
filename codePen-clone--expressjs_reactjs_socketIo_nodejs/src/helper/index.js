export const generateSrcDoc = (editorState) => {
  return `
    <html>
      <head>
      <style>
        ${editorState.css}
      </style>
      </head>
      <body>
        ${editorState.html}
      <script>${editorState.js}</script>
      </body>
    </html>
  `;
};
