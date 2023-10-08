# Masquerade plugin
A revolt plugin that makes you able to use masquerade

## Instalation
Copy and paste following code to console
```js
xhr = new XMLHttpRequest()
xhr.open("GET", "https://raw.githubusercontent.com/LazyCat2/masquerade-revolt-plugin/main/msq.js")
xhr.send("")
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "0.1 Beta",
      namespace: "LazyCat2",
      id: "masquerade",
      entrypoint: xhr.response
  })
  window.location.reload()
};
```

## Usage
Type `@MSQ` to access the menu

Send message with persona's prefix at the start to use that persona

![Usage (gif)](https://autumn.revolt.chat/attachments/XWZ75RW9RaVPMmkdyRXSDbvPZCX6rUYPXF4sZjLYQc)
