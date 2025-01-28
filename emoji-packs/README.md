# Emoji packs

Create and share emoji packs. Use emojis without joining server with them.
WIP. Need to somehow put emojis in dynamically shown emoji list.

## Instalation

Copy and paste following code to console.
```js
xhr = new XMLHttpRequest()
xhr.open("GET", "https://raw.githubusercontent.com/LazyCat2/revolt-plugins/main/emoji-packs/script.js")
xhr.send("")
xhr.onload = function() {
  state.plugins.add({
      format: 1,
      version: "0.1",
      namespace: "LazyCat2",
      id: "emoji-packs",
      entrypoint: xhr.response
  })
  window.location.reload()
};
```

## Cons
- Does not shows emojis from added emoji packs when you type :

## Usage
### Add emoji pack
1. Open emoji picker.
2. Click on plus at the right.
3. Select emoji pack.

### Create emoji pack
1. Fork repository.
2. Add json object with emoji pack data.
3. Create a pull request.
4. Read more about data structure bellow.

## Data structure
This plugin fetches `packs.json` to get list of emoji packs.
Object of emoji pack has following fields:
| Key       | Value                      | Example                                               |
|:----------|:---------------------------|:------------------------------------------------------|
| name      | Name of emoji pack         | `"Cats"`                                              |
| publisher | Username of pack publisher | `"LazyCat"`                                           |
| emojis    | Emoji object               | `{ "01HBR7KYF0BJ972N3EEK1PYMYP": { "name": "cat" } }` |

## Troubleshooting
See [Troubleshooting](https://github.com/LazyCat2/revolt-plugins/#troubleshooting) in repo's README.md
