const client = ()=>controllers.client.getReadyClient();

()=>{

if (!localStorage.MSQ)
        localStorage.MSQ = JSON.stringify({
                personas: []
        })


const delSvg = '<svg viewBox="0 0 24 24" height="24" width="24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" color="var(--error)" class="StyledIconBase-ea9ulj-0 bWRyML"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>'
const editSvg = '<svg viewBox="0 0 24 24" height="18" width="18" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 bWRyML"><path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path></svg>'
const okSvg = '<svg viewBox="0 0 24 24" height="20" width="20" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 VtuNT check"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>'
const addSvg = '<svg viewBox="0 0 24 24" height="24" width="24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 bWRyML"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>'

const sendPluginMessage = text=>{
        var message = document.createElement("DIV")
        var usernameContainer = document.createElement("DIV")
        var username = document.createElement("P")
        var badge = document.createElement("DIV") // UserShort__BotBadge-sc-1sbe9n1-0 cYjFcE
        var del = document.createElement("BUTTON")
        var copy = document.createElement("BUTTON")
        var textElem = document.createElement("P")

        username.innerText = "LazyCat2/masquerade"
        username.style.fontWeight = "bold"
        username.style.margin = "0px"

        badge.innerText = "PLUGIN"
        badge.classList.add("UserShort__BotBadge-sc-1sbe9n1-0")
        badge.classList.add("cYjFcE")

        del.innerText = "Hide"
        del.style.marginLeft = '10px'
        del.addEventListener("click", ()=>{
        	message.remove()
        })

        copy.innerText = "Copy"
        copy.style.marginLeft = '10px'
        copy.addEventListener("click", ()=>{
        	navigator.clipboard.writeText(text)
        })

        usernameContainer.style.display = 'flex'
        usernameContainer.style.alignItems = 'center'

        textElem.innerText = text
        textElem.style.margin = "10px 0px"

        usernameContainer.append(username)
        usernameContainer.append(badge)
        usernameContainer.append(del)
        usernameContainer.append(copy)

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
                        if (['{}', 'null'].includes(JSON.stringify(currentPersona))) return
                                                                        
                        Array.from([
                                [msg.author._id != c.user._id, "Message was not sent by you."],
                                [!window.location.href.includes(msg.channel_id), "You are selected other channel than message's"],
                                [msg.masquerade, "Message already has masquerade"]
                        ]).forEach(cond=>{
                                if (cancel) return
                                if (cond[0]) {
                                        MSQ.log("Message ignored: " + cond[1])
                                        cancel = true
                                }
                        })
                        if (cancel) return
                        var channel = c.channels.get(msg.channel_id)
                        if (!channel.havePermission("Masquerade")) {
                                sendPluginMessage(`You do not have permission to use masquerade in this channel.`)
                                return
                        }
                        channel.sendMessage({
                                masquerade: {
                                        colour: (channel.havePermission("ManageRole")) ? currentPersona.color : null,
                                        name: currentPersona.name,
                                        avatar: currentPersona.avatar
                                },
                                content: (
                                	msg.content.startsWith(currentPersona.prefix)
                                	? msg.content.substring(currentPersona.prefix.length)
                                	: msg.content
                                ) + (
                                        (msg.attachments || []).length > 0
                                  ? "\n\n" + msg.attachments.map(a=>
                                      `[${a.filename}](https://autumn.revolt.chat/attachments/${a._id}/${a.filename})`
                                  ).join(" | ")
                                  :""
                                ), 
                                replies: Array.from(msg.reply_ids || []).map(
                                        reply=>({id: reply, mention: false})
                                )
                        })
                        .then(_=>msg.delete())
                        .catch(error=>{
                        try{
                        sendPluginMessage(`The following error was returned when masquerade was attempted. The original message will not be deleted
\`\`\`
${error.message}

${error.stack}
\`\`\``)}catch(e){console.error(e)}
                       })
                        sendAs.remove()
                        sendAs = null
                })
        }
}

setTimeout(hell, 5000)
var menu = null
var currentPersona = null
var sendAs = null

const setPersona = data=>{
	console.log(data)
	currentPersona = data
	var avatar = document.querySelector(".MSQ-AVATAR")
	
	avatar.style.backgroundImage = `url('${data.avatar??client().user.generateAvatarURL()}')`
}



const addAvatarButton = ()=>{
	if (document.querySelector(".MSQ-AVATAR")) return
	
	var container = document.querySelector(".MessageBox__Base-sc-jul4fa-0.jBEnry")
	var avatar = document.createElement("DIV")
	var obj = {}

	avatar.style.width = '35px'
	avatar.style.height = '35px'
	avatar.style.backgroundImage = `url('${(currentPersona||obj).avatar??client().user.generateAvatarURL()}')`
	avatar.style.backgroundSize = 'cover'
	avatar.style.backgroundPosition = 'center'
	avatar.style.borderRadius = '100%'
	avatar.style.margin = 'auto 0px auto 5px'
	avatar.style.cursor = 'pointer'
	
	avatar.classList.add("MSQ-AVATAR")

	avatar.addEventListener("click", ()=>{
	 	document.querySelector(".MessageBox__FloatingLayer-sc-jul4fa-4.QpRyQ").innerHTML = ''
		if (document.querySelector(".MSQ-MASK-MENU")) return document.querySelector(".MSQ-MASK-MENU").remove()

		var menu = document.createElement("DIV")

		menu.style.backgroundColor = 'var(--secondary-background)'
		menu.style.width = 'fit-content'
		menu.style.padding = '0px'
		menu.style.backdropFilter = 'blur(20px)'
		menu.style.borderRadius = '0px var(--border-radius) 0px 0px'
		
		menu.classList.add("MSQ-MASK-MENU")

		var personaThing = data=>{
			data = data ?? {}
			
			var container = document.createElement("DIV")
			var maskThing = document.createElement("DIV")
			var avatar = document.createElement("IMG")
			var textContainer = document.createElement("DIV")
			var title = document.createElement("P")
			var info = document.createElement("P")
			var buttons = document.createElement("DIV")
			var del = document.createElement("BUTTON")
			var edit = document.createElement("BUTTON")

			container.style.width = '250px'
			container.style.display = 'flex'
			container.style.alignItems = 'center'
			container.style.padding = '5px'
			container.style.margin = '5px'
			container.style.borderRadius = 'var(--border-radius)'
			container.style.userSelect = 'none'
			container.style.cursor = 'pointer'
			container.style.justifyContent = 'space-between'

			container.addEventListener("click", function (e){
				if(["BUTTON", "SVG", "PATH"].includes(e.target.tagName)) return

				menu.remove()
				setPersona(data)
			})

			maskThing.style.display = 'flex'
			
			avatar.style.borderRadius = '100%'
			avatar.src = data.avatar ?? client().user.generateAvatarURL()
			avatar.style.width = '40px'
			avatar.style.height = '40px'
			avatar.style.margin = '0px 10px 0px 0px'

			title.innerText = data.name ?? client().user.username
			title.style.margin = '0px'

			var Jdata = JSON.stringify(data)
			var Jperson = JSON.stringify(currentPersona ?? {})
			if (Jdata == Jperson) {
				container.style.backgroundColor = 'var(--primary-background)'
			}
			
			info.innerText = data.prefix ?? (Jdata=='{}' ? 'Your default profile':'[NO PREFIX]')
			info.style.margin = '0px'
			info.style.color = 'var(--secondary-foreground)'
			info.style.fontSize = 'normal'

			del.innerHTML = delSvg
			del.addEventListener("click", ()=>{
				container.remove()
				if (JSON.stringify(data) == JSON.stringify(currentPersona)) setPersona()
				var savedData = JSON.parse(localStorage.MSQ)
				savedData.personas.splice(savedData.personas.findIndex(a=>a==data), 1)
				localStorage.MSQ = JSON.stringify(savedData)
			})

			edit.innerHTML = editSvg
			edit.addEventListener("click", ()=>{
				var mainContainer = document.querySelector(".MessageBox__FloatingLayer-sc-jul4fa-4.QpRyQ")
				var prefix = document.createElement("INPUT")
				var avatar = document.createElement("INPUT")
				var name = document.createElement("INPUT")
                                var color  = document.createElement("INPUT")
				var done = document.createElement("BUTTON")

				name.value = data.name
				avatar.value = data.avatar
				prefix.value = data.prefix
                                color.value = data.color
                                color.setAttribute("type", "color")

				;([prefix, avatar, name, color]).forEach(inp=>{
					inp.style.width = '100%'
					inp.style.backgroundColor = 'var(--primary-background)'
					inp.style.border = '1px solid'
					
					mainContainer.append(inp)
				})

				prefix.placeholder = 'Prefix'
				avatar.placeholder = 'Avatar URL (@ID to to copy someone\'s avatar)'
				name.placeholder = 'Name'
                                color.placeholder = "Color of username"

				done.innerHTML = addSvg
				done.addEventListener("click", ()=>{
					var changeMe = JSON.stringify(data) == JSON.stringify(currentPersona)
					var savedData = JSON.parse(localStorage.MSQ)
					var index = savedData.personas.findIndex(a=>JSON.stringify(a)==JSON.stringify(data))

					savedData.personas[index] = {
						prefix: prefix.value,
						avatar: avatar.value,
						name: name.value,
                                                color: color.value
					}

					if (changeMe) {
						setPersona(savedData.personas[index])
					}
					
					localStorage.MSQ = JSON.stringify(savedData)

					 document.querySelector(".MessageBox__FloatingLayer-sc-jul4fa-4.QpRyQ").innerHTML = ''
				})
				mainContainer.append(done)
				mainContainer.style.backgroundColor = 'var(--secondary-background)'
				mainContainer.style.display = 'flex'
			})

			buttons.style.display = 'flex'

			buttons.append(del)
			buttons.append(edit)

			textContainer.append(title)
			textContainer.append(info)
			
			maskThing.append(avatar)
			maskThing.append(textContainer)
			
			container.append(maskThing)

			if (Jdata != '{}')
				container.append(buttons)

			return container
		}
		
		menu.append(personaThing())
		JSON.parse(localStorage.MSQ)
			.personas
			.forEach(persona=>menu.append(personaThing(persona)))
			
		var addMask = document.createElement("DIV")
		var pluginInfo = document.createElement("DIV")
		var version = document.createElement("P")
		var source = document.createElement("A")

		addMask.style.width = '25px'
		addMask.style.height = '25px'
		addMask.style.borderRadius = 'var(--border-radius)'
		addMask.style.backgroundColor = 'var(--primary-background)'
		addMask.style.display = 'flex'
		addMask.style.justifyContent = 'center'
		addMask.style.alignItems = 'center'
		addMask.style.cursor = 'pointer'
		addMask.innerHTML = addSvg

		addMask.addEventListener("click", ()=>{
			var mainContainer = document.querySelector(".MessageBox__FloatingLayer-sc-jul4fa-4.QpRyQ")
			var prefix = document.createElement("INPUT")
			var avatar = document.createElement("INPUT")
			var name = document.createElement("INPUT")
                        var color  = document.createElement("INPUT")
			var done = document.createElement("BUTTON")

			;([prefix, avatar, name, color]).forEach(inp=>{
				inp.style.width = '100%'
				inp.style.backgroundColor = 'var(--primary-background)'
				inp.style.border = '1px solid'
				
				mainContainer.append(inp)
			})

			prefix.placeholder = 'Prefix'
			avatar.placeholder = 'Avatar URL (@ID to to copy someone\'s avatar)'
			name.placeholder = 'Name'
                        color.placeholder = "Color of username"
                        color.setAttribute("type", "color")

			avatar.addEventListener("input", ()=>{
				if (avatar.value.startsWith('@')) {
				    let user = client().users.get(avatar.value.replace("@", ''))
				    if (user)
				        avatar.value = user.generateAvatarURL()
				}
			})
			
			
			done.innerHTML = addSvg
			done.addEventListener("click", ()=>{
				var savedData = JSON.parse(localStorage.MSQ)
				var index = savedData.personas.findIndex(a=>JSON.stringify(a)==JSON.stringify(data))
				var newdata = {
								prefix: prefix.value,
								avatar: avatar.value,
								name: name.value,
                                                                color: color.value
							}
				savedData.personas.push(newdata)
					
				localStorage.MSQ = JSON.stringify(savedData)

				pluginInfo.before(personaThing(newdata))
				
			 	document.querySelector(".MessageBox__FloatingLayer-sc-jul4fa-4.QpRyQ").innerHTML = ''
			})
			
			mainContainer.append(done)
			mainContainer.style.backgroundColor = 'var(--secondary-background)'
			mainContainer.style.display = 'flex'
		})

		version.innerText = MSQVersion
		version.style.margin = '0px'

		source.innerText = 'Source code'
		source.href = "https://github.com/LazyCat2/revolt-plugins/tree/main/masquerade"
		source.style.textDecoration = 'underline'
		source.setAttribute("target", "_blank")
		
		pluginInfo.style.display = 'flex'
		pluginInfo.style.justifyContent = 'space-evenly'
		pluginInfo.style.alignItems = 'center'
		pluginInfo.style.marginBottom = '5px'

		pluginInfo.append(version)
		pluginInfo.append(addMask)
		pluginInfo.append(source)

		menu.append(pluginInfo)

		document.querySelector(".AutoComplete__Base-sc-dtvq9c-0.hkukmG").append(menu)
	})

	container.prepend(avatar)
}

const onMessageTextareaInput = function(){

        if (!this.value.startsWith("@MSQ")) {
                if (menu) menu.remove()
                MSQ.isShowed = false

                var pers = JSON.parse(localStorage.MSQ).personas.find(p=>this.value&&this.value.startsWith(p.prefix))
                if (pers && pers != currentPersona) 
                	setPersona(pers)
                
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
                addAvatarButton()
        } catch(a){console.error(a)}
}

const MSQVersion = (
	Array.from(state.plugins.plugins).find(plugin=>plugin[0]=="LazyCat2/masquerade")
	??[null, {version:'ERROR'}])[1].version

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

                                text.innerText = "You don't have any masks yet. Create one by clicking \"New\" button."

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
                                username.style.color = pers.color

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
                        githubLink.href = "https://github.com/LazyCat2/revolt-plugins/tree/main/masquerade"
                        githubLink.style.textDecoration = 'underline'
                        githubLink.setAttribute("target", "_blank")

                        addPersonaButton.innerText = "New"
                        addPersonaButton.style.width = 'fit-content'
                        addPersonaButton.addEventListener("click", ()=>{
                                let prefix = document.createElement("INPUT")
                                let avatar = document.createElement("INPUT")
                                let name   = document.createElement("INPUT")
                                let color  = document.createElement("INPUT")

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
                                                color: color.value
                                        })
                                        localStorage.MSQ = JSON.stringify(savedState)
                                })

                                addPersonaButton.setAttribute("disabled", true)

                                color.setAttribute("type", "color")

                                prefix.placeholder = "Prefix"
                                avatar.placeholder = "Avatar URL"
                                name.placeholder = "Name"
                                color.placeholder = "Color of username"

                                prefix.setAttribute("description", "You will need to put this at start of message, so make it short and don't make it same as bot's prefix")
                                avatar.setAttribute("description", "URL of the mask's avatar. You can put @[ID of user] to copy someone's avatar.")
                                name.setAttribute("description", "Username of the mask.")
                                color.setAttribute("description", "Color of username")

                                var inputHint = standartDiv()
                                var inputHintText = document.createElement("P")

                                Array.from([
                                        prefix,
                                        avatar,
                                        name,
                                        color
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
                		return
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
                elem.append(document.createTextNode("The plugin has been disabled; it's recommended to reload the page/app. Click here to close."))
                document.body.append(elem)
                elem.addEventListener("click", ()=>elem.remove())
        } catch(e) { console.error(e) }
    
        MSQ.log("Plugin has been disabled")
    
    }
}}
