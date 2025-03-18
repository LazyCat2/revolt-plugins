# Sanitizer
Removes zalgo from user content (messages, usernames, etc) and replaces unicode letters with ascii

## Instalation

Paste this to console
```js
xhr = new XMLHttpRequest();
xhr.open("GET", "https://raw.githubusercontent.com/LazyCat2/revolt-plugins/main/sanitizer/script.js");
xhr.send("");
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "1",
      namespace: "LazyCat2",
      id: "sanitizer",
      entrypoint: xhr.response
  });
  window.location.reload();
};
