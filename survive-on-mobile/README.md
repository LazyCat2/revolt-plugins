# Survive on mobile
A revolt plugin that makes you able to use console in mobile and get notified about any error/warning.

## Instalation
You need PC to install this plugin.
[Learn more](https://developer.chrome.com/docs/devtools/remote-debugging/) about Chrome USB debugging

1. In developer settings turn on USB debugging
2. Connect your phone to PC
3. Go to chrome://inspect#devices
4. Open Revolt client in browser
5. Find Revolt tab in inspect page
6. Click `inspect`
7. Copy and paste following code to console.
```js
xhr = new XMLHttpRequest()
xhr.open("GET", "https://raw.githubusercontent.com/LazyCat2/revolt-plugins/main/survive-on-mobile/script.js")
xhr.send("")
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "0.1 Beta",
      namespace: "LazyCat2",
      id: "Survive on mobile",
      entrypoint: xhr.response
  })
  window.location.reload()
};
```

## Usage
1. Go to settings
2. Click `console` tab. It will be in `Survive on mobile` category
	1. If there is no that tab, click something else than button (for example the title) and it should appear

## TODOS
- `231` `261` `286`: Put here image and not get terminated for copyrights
