const client = ()=>{return controllers.client.getReadyClient()};

()=>{

if (!localStorage.MSQ)
        localStorage.MSQ = JSON.stringify({
                personas: []
        })

const sendPluginMessage = text=>{
        var message = document.createElement("DIV")
        var usernameContainer = document.createElement("DIV")
        var username = document.createElement("P")
        var badge = document.createElement("DIV") // UserShort__BotBadge-sc-1sbe9n1-0 cYjFcE
        var del = document.createElement("BUTTON")
        var textElem = document.createElement("P")

        username.innerText = "LazyCat2/masquerade"
        username.style.fontWeight = "bold"
        username.style.margin = "0px"

        badge.innerText = "PLUGIN"
        badge.classList.add("UserShort__BotBadge-sc-1sbe9n1-0")
        badge.classList.add("cYjFcE")

        del.innerText = "Hide error"
        del.style.marginLeft = '10px'
        del.addEventListener("click", ()=>{
                message.remove()
        })

        usernameContainer.style.display = 'flex'
        usernameContainer.style.alignItems = 'center'

        textElem.innerText = text
        textElem.style.margin = "10px 0px"

        usernameContainer.append(username)
        usernameContainer.append(badge)
        usernameContainer.append(del)

        message.style.paddingLeft = '65px'
        message.style.backgroundColor = "var(--mention)"

        message.append(usernameContainer)
        message.append(textElem)

        document.querySelector(".MessageArea__Area-sc-1q4cka6-0.kpVPRw > div").append(message)
}

const hell = ()=>{
        c = client()
        if (c) {
                console.log(c)
                c.on("message", msg=>{
                        var cancel = false
                        var persona = JSON.parse(localStorage.MSQ).personas.find(p=>msg.content.startsWith(p.prefix))
                                                                        
                        Array.from([
                                [msg.author._id != c.user._id, "Message send not by you"],
                                [!persona, "`persona` is null (probably there is no prefix)"],
                                [!window.location.href.includes(msg.channel_id), "You are selected other channel than message's"], // not sure if I spelled it correctly
                                [msg.masquerade, "Message already has masquerade"]
                        ]).forEach(cond=>{
                                if (cancel) return
                                if (cond[0]) {
                                        MSQ.log("Message ignored: " + cond[1])
                                        cancel = true
                                }
                        })
                        if (cancel) return
                        c.channels.get(msg.channel_id).sendMessage({
                                masquerade: {
                                        // colour: persona.color,
                                        name: persona.name,
                                        avatar: persona.avatar
                                },
                                content: msg.content.substring(persona.prefix.length), 
                                replies: Array.from(msg.reply_ids || []).map(
                                        reply=>({id: reply, mention: false})
                                )
                        })
                        .then(_=>msg.delete())
                        .catch(error=>{
                        try{
                        sendPluginMessage(`Following error occured when attempted to send masqueraded message. Original message will not be deleted
\`\`\`
${error.message}

${error.stack}
\`\`\``)}catch(e){console.error(e)}
                       })
                        sendAs.remove()
                        sendAs = null
                })
        } else {
                var alrt = standartDiv()
                var t = document.createElement("P")

                t.innerText = "WARNING: Masquerade plugin won't work because it can't get client object, click here when client fully loads"

                alrt.addEventListener("click", ()=>{
                        alrt.remove()
                        hell()
                })

                alrt.append(t)
                document.body.append(alrt)
        }
}

setTimeout(hell, 5000)
var menu = null
var currentPersona = null
var sendAs = null

const onMessageTextareaInput = function(){

        if (!this.value.startsWith("@MSQ")) {
                if (menu) menu.remove()
                MSQ.isShowed = false

                var pers = JSON.parse(localStorage.MSQ).personas.find(p=>this.value.startsWith(p.prefix))

                if (pers && pers != currentPersona) {
                        if (sendAs) {
                                sendAs.remove()
                                sendAs = null
                        }
                        currentPersona = pers
                        sendAs = MSQ.elements.sendAs(pers)
                        document.querySelector('.AutoComplete__Base-sc-dtvq9c-0.hkukmG > div').append(sendAs)
                } else {
                        if (sendAs) {
                                sendAs.remove()
                                sendAs = null
                        }
                        currentPersona = null
                }

                return
        }

        if (this.value.startsWith("@MSQ") && !MSQ.isShowed) {
                MSQ.isShowed = true
                menu = MSQ.elements.pluginMenu()
                document.querySelector('.AutoComplete__Base-sc-dtvq9c-0.hkukmG > div').append(menu)
        }
}

const onClick = function(){
        if (!window.location.href.includes("channel"))
                return
        try{
                updateTextareaEvents()
        } catch(a){console.error(a)}
}

const MSQVersion = Array.from(state.plugins.plugins).find(plugin=>plugin[0]=="LazyCat2/masquerade")[1].version

const standartDiv = ()=>{
        let div = document.createElement("DIV")

        div.style.backgroundColor = 'var(--primary-background)'
        div.style.height = '50px'
        div.style.width = '100%'
        div.style.minHeight = 'fit-content'
        div.style.padding = '0px 15px'
        div.style.alignItems = "center"
        div.style.backdropFilter = 'blur(20px)'
        div.style.display = 'flex'
        div.style.justifyContent = "space-between"

        return div
}

var PersonaList = ()=>{
                        const list = document.createElement("DIV")
                        const personas = JSON.parse(localStorage.MSQ).personas

                        if (personas.length == 0) {
                                let msg = standartDiv()
                                let text = document.createElement("P")

                                text.innerText = "You have no any personas for masquerade, create first one by clicking \"New\" button"

                                msg.append(text)
                                list.append(msg)

                                return list
                        }

                        personas.forEach(pers=>{
                                let persInfo = standartDiv()
                                let avatarAndUsername = document.createElement("DIV")
                                let right = document.createElement("DIV")
                                
                                let avatar = document.createElement("IMG")
                                let username = document.createElement("P")

                                let prefix = document.createElement("P")
                                let delPersona = document.createElement("BUTTON")

                                avatar.src = pers.avatar || client().user.generateAvatarURL()
                                avatar.style.borderRadius = '100%'
                                avatar.style.maxWidth = '30px'
                                avatar.style.maxHeight = '30px'
                                avatar.style.marginRight = '10px'

                                username.innerText = pers.name || client().user.username
                                //username.style.color = pers.color

                                prefix.innerText = pers.prefix

                                avatarAndUsername.style.display = 'flex'
                                avatarAndUsername.style.alignItems = "center"

                                                                delPersona.innerText = "DEL"
                                delPersona.addEventListener("click", ()=>{
                                        persInfo.remove()
                                        var savedData = JSON.parse(localStorage.MSQ)
                                        savedData.personas.splice(savedData.personas.findIndex(a=>a==pers), 1)
                                        localStorage.MSQ = JSON.stringify(savedData)
                                })

                                right.style.display = 'flex'

                                avatarAndUsername.append(avatar)
                                avatarAndUsername.append(username)

                                                                right.append(prefix)
                                                                right.append(delPersona)

                                persInfo.append(avatarAndUsername)
                                persInfo.append(right)

                                list.append(persInfo)
                        })

                        return list
                }

var MSQ = {
        log: text=>console.log('[MSQ]', text),
        isShowed: false,
        elements: {
                pluginMenu: ()=>{
                        let menu = document.createElement("DIV")
                        let infoBox = standartDiv()
                        let infoText = document.createElement("P")
                        let githubLink = document.createElement("A")
                        let addPersonaButton = document.createElement("BUTTON")
                        let personaList = PersonaList()

                        infoText.innerText = `Masquerade plugin v${MSQVersion}`
                        infoText.style.margin = '0px'

                        githubLink.innerText = 'Source code'
                        githubLink.href = "https://github.com/LazyCat2/masquerade-revolt-plugin"
                        githubLink.style.textDecoration = 'underline'
                        githubLink.setAttribute("target", "_blank")

                        addPersonaButton.innerText = "New"
                        addPersonaButton.style.width = 'fit-content'
                        addPersonaButton.addEventListener("click", ()=>{
                                let prefix = document.createElement("INPUT")
                                let avatar = document.createElement("INPUT")
                                let name   = document.createElement("INPUT")
                             // let color  = document.createElement("INPUT")

                                let submit = document.createElement("BUTTON")
                                let container = standartDiv()

                                avatar.addEventListener("input", ()=>{
                                        if (avatar.value.startsWith('@')) {
                                                let user = client().users.get(avatar.value.replace("@", ''))

                                                if (user)
                                                        avatar.value = user.generateAvatarURL()
                                        }
                                })

                                submit.addEventListener("click", ()=>{
                                        if (!prefix.value)
                                                return prefix.focus()
                                        addPersonaButton.removeAttribute("disabled")
                                        container.remove()

                                        var savedState = JSON.parse(localStorage.MSQ)
                                        savedState.personas.push({
                                                prefix: prefix.value,
                                                avatar: avatar.value,
                                                name: name.value,
                                             // color: color.value
                                        })
                                        localStorage.MSQ = JSON.stringify(savedState)
                                })

                                addPersonaButton.setAttribute("disabled", true)

                             // color.setAttribute("type", "color")

                                prefix.placeholder = "Prefix"
                                avatar.placeholder = "Avatar URL"
                                name.placeholder = "Name"
                             // color.placeholder = "Color of username"

                                prefix.setAttribute("description", "You will need to put this at start of message, so make it short and don't make it same as bot's prefix")
                                avatar.setAttribute("description", "URL of persona's avatar. You can put @[ID of user] to copy someone's avatar")
                                name.setAttribute("description", "Username of persona")
                             // color.setAttribute("description", "Color of username")

                                var inputHint = standartDiv()
                                var inputHintText = document.createElement("P")

                                Array.from([
                                        prefix,
                                        avatar,
                                        name,
                                     // color
                                ]).forEach(elem=>{
                                        inputHint.append(inputHintText)

                                        elem.style.width = 'inherit'
                                        elem.style.margin = '0px 5px'

                                        elem.classList.add("InputBox-sc-13s1218-0")
                                        elem.classList.add("bEeAEn")

                                        elem.addEventListener("focus", function(){
                                                inputHintText.innerText = this.attributes.description.value
                                                menu.prepend(inputHint)
                                        })

                                        elem.addEventListener("blur", function(){
                                                inputHint.remove()
                                        })

                                        container.append(elem)
                                })

                                submit.innerText = 'Done'
                                submit.style.width = 'fit-content'
                                submit.style.height = '100%'

                                container.append(submit)
                                menu.prepend(container)
                        })

                        infoBox.appendChild(infoText)
                        infoBox.appendChild(addPersonaButton)
                        infoBox.appendChild(githubLink)

                        menu.appendChild(PersonaList())
                        menu.appendChild(infoBox)

                        return menu
                },
                sendAs: pers=>{
                        let tip = standartDiv()
                        let tipText = document.createElement("P")
                        let avatar = document.createElement("IMG")
                        let username = document.createElement("P")

                        tipText.innerText = "This message will be sent as"

                        avatar.src = pers.avatar || client().user.generateAvatarURL()
                        avatar.style.borderRadius = '100%'
                        avatar.style.maxWidth = '30px'
                        avatar.style.maxHeight = '30px'
                        avatar.style.margin = '0px 10px'

                        username.innerText = pers.name || client().user.username
                        username.style.color = pers.color

                        tip.style.justifyContent = "left"

                        tip.append(tipText)
                        tip.append(avatar)
                        tip.append(username)

                        return tip
                }
        }
}

const updateTextareaEvents =()=>{
        const textArea = document.getElementById("message")
        if (textArea.classList.contains("MSQ-Modified")) return

        Array.from([
                "change",
                "keypress",
                "paste",
                "input"
        ]).forEach(event=>textArea.addEventListener(event, onMessageTextareaInput))

        textArea.classList.add("MSQ-Modified")
}

window.addEventListener("click", onClick)
MSQ.log("Plugin loaded, type @MSQ into message input")


return {
        onClient: c => {
                MSQ.log("onClient has been triggered, wow")
        },
    onUnload: () => {
        try {
                window.removeEventListener("click", onClick)

                const elem = standartDiv()
                elem.append(document.createTextNode("Plugin has been disabled, it's recomended to reload the page (F5), click here to close"))
                document.body.append(elem)
                elem.addEventListener("click", ()=>elem.remove())
        } catch(e) { console.error(e) }
    
        MSQ.log("Plugin has been disabled")
    
    }
}}
