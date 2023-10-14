# Masquerade plugin
A revolt plugin that makes you able to use masquerade.

## Instalation
Copy and paste following code to console.
```js
xhr = new XMLHttpRequest()
xhr.open("GET", "https://raw.githubusercontent.com/LazyCat2/revolt-plugins/main/masquerade/script.js")
xhr.send("")
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "0.3 Beta",
      namespace: "LazyCat2",
      id: "masquerade",
      entrypoint: xhr.response
  })
  window.location.reload()
};
```

## Usage
Type `@MSQ` to access the menu

Send message with mask's prefix at the start to use that mask

![Usage (gif)](https://autumn.revolt.chat/attachments/XWZ75RW9RaVPMmkdyRXSDbvPZCX6rUYPXF4sZjLYQc)
