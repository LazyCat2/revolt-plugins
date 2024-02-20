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
      version: "0.4.1 Beta",
      namespace: "LazyCat2",
      id: "masquerade",
      entrypoint: xhr.response
  })
  window.location.reload()
};
```
You can use [remote debugging](https://developer.chrome.com/docs/devtools/remote-debugging) to install plugin on Android


## Usage
### Create a mask

**Normal way**
1. Click on your avatar, it should be on the left side
2. Click **`+`** button
3. Fill inputs and click **`+`**

To steal user's avatar, type `@ID`, for example if user's ID is 123ABC, you need to type `@123ABC`

**Legacy way**
1. Type `@MSQ` into message input
2. Click **`Add`** button
3. Fill inputs and click **`+`**

To steal user's avatar, type `@ID`, for example if user's ID is 123ABC, you need to type `@123ABC`

![This GIF shows you how to create a mask](https://autumn.revolt.chat/attachments/SDDxYUuiQvL0BtR0qtMY7a9Ub2JgZhLHl8zb3x-c6c)

### Send masked message

**Using mask menu**
1. Click on your avatar, it should be on the left side
2. Select your mask
3. Send message by pressing Enter or by right-clicking send button

**Using prefix**
1. Type prefix of your mask
2. Type your message
   If you want to send `Hello` and prefix is `c:`, you need to type `c: Hello`
3. Send message by pressing Enter or by right-clicking send button

![This GIF shows you how to send a message with mask](https://autumn.revolt.chat/attachments/QCuLiNpqeXCLETmuf5ttPDpe17caGJl9XZqSDkDNAN/HowToSend.gif)
