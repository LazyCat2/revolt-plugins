# masquerade-revolt-plugin
A revolt plugin that makes you able to use masquerade

## Instalation
Copy and paste following code to console
```json
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
  delete xhr
    window.location.reload()
};
```

## Usage
Type `@MSQ` to access the menu
Send message with persona's prefix at the start to use that persona

![Video](https://autumn.revolt.chat/attachments/download/pS_y1eniQndDTWzRhlc3g1KsNb1Hla9pA8k8-hmYq6)
