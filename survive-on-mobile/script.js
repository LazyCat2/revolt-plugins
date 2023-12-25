()=>{
	console.history = [];
	console.evalCode = ()=>{}
	console.evalResult = ()=>{}
	
	var styles = {
		info: {
			outline: '#55f',
			background: '#aaf'
		},
		debug: {
			outline: '#5f5',
			background: '#afa'
		},
		warn: {
			outline: '#ff5',
			background: '#ffa'
		},
		error: {
			outline: '#f55',
			background: '#faa'
		},
		log: {
			outline: 'var(--secondary-background)',
			background: 'var(--primary-background)'
		},
		evalCode: {
			outline: '#5f5',
			background: 'var(--primary-background)'
		},
		evalResult: {
			outline: '#55f',
			background: 'var(--primary-background)'
		}
	}
	console.asElement = data=>{
		var container = document.createElement("DIV")
		var type = document.createElement("P")
		var text = document.createElement("P")

		container.style.borderRadius = 'var(--border-radius)'

		var style = (styles[data.func] || styles.log)
		style.color = !styles[data.func] || data.func == 'log'
					? 'white'
					: 'var(--primary-foreground)'
		container.style.backgroundColor = style.background
		container.style.outline = '2px solid ' +style.outline
		container.style.padding = '10px'
		container.style.marginTop = '10px'

		type.innerText = data.func
		type.style.fontSize = 'small'
		type.style.margin = '0px 0px 5px 0px'		

		var asJSON = a
		
		try { asJSON = JSON.stringify(a) }
		catch(_){}
		
		text.innerText = data.args.map(a=>{
			if (a == null)
				return 'null'
				
			return typeof a == 'object' && a != null
		  ? a.stack
		 || asJSON
		  : a
		}
			
		).join(" ")
		text.style.margin = '0px'

		container.append(type)
		container.append(text)
		
		return container
	}
	var oldConsole = {};
	for (var i in console) {
	    //console.log(i)
	    if (i == 'asElement') continue
	    if (typeof console[i] == 'function') {
	        oldConsole[i] = console[i];
	        var obj = `{func: '${i}', args: Array.prototype.slice.call(arguments)}`
	        //console.log(obj)
	        console[i] = eval(`function ${i}(){
	        	var args = Array.from(arguments)
	        	var output = document.getElementById("SOM-console-output-container")
	        	if (output) {
	        		output.append(console.asElement(${obj}))
	        	}	
	        	const showNotify = text=>{
	        			var notifyElem = document.createElement("DIV")
	        	
	        			notifyElem.style.backgroundColor = 'var(--primary-background)'
	        			notifyElem.style.color = 'var(--primary-foregroud)'
	        			notifyElem.style.width = '100%'
	        			notifyElem.style.height = 'fit-content'
	        			notifyElem.style.padding = '15px'
	        			notifyElem.style.position = 'fixed'
	        			notifyElem.style.top = '0px'
	        			notifyElem.style.left = '0px'
	        			notifyElem.style.userSelect = 'none'
	        				
	        			notifyElem.innerText = text
	        			notifyElem.addEventListener("click", ()=>notifyElem.remove())
	        	
	        			document.body.append(notifyElem)
	        		}
	        	var data = JSON.parse(localStorage.SOM)
	        	if (
	        		'${i}' == 'error' && data.errorNotify
	        	 || '${i}' == 'warn' && data.warnNotify
	        	)
	        		showNotify('New ${i} occured. Check console to see it. Tap here to close.')
	        	console.history.push(${obj});
	        	oldConsole['${i}'].apply(console, args);
	        }
	        ${i}`)
	    }
	}
	
	if (!localStorage.SOM) {
		localStorage.SOM = JSON.stringify({
			errorNotify: false,
			warnNotify: false
		})
	}

	const log = text=>console.log("[SOM]", text)

	const checkmark = (title, description, status, onclick)=>{
		var container = document.createElement("LABEL")
		var textsContainer = document.createElement("DIV")
		var titleContainer = document.createElement("DIV")
		var titleText = document.createElement("DIV")
		var descriptionText = document.createElement("DIV")
		var checkbox = document.createElement("INPUT")
		var svgContainer = document.createElement("DIV")
		var svg = `<svg viewBox="0 0 24 24" height="20" width="20" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 VtuNT check"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>`

		container.classList.add("Base-sc-1c2l8gq-0")
		container.classList.add("bCPWex")

		textsContainer.classList.add("Content-sc-1c2l8gq-1")
		textsContainer.classList.add("jsXlFI")

		titleContainer.classList.add("TitleContent-sc-1c2l8gq-2")
		titleContainer.classList.add("jIeDPs")

		titleText.classList.add("Title-sc-1c2l8gq-3")
		titleText.classList.add("jdoJOP")
		titleText.innerText = title

		descriptionText.classList.add("Description-sc-1c2l8gq-5")
		descriptionText.classList.add("ftPWRP")
		descriptionText.innerText = description

		checkbox.setAttribute("type", "checkbox")

		svgContainer.classList.add("Checkmark-sc-1c2l8gq-6")
		svgContainer.classList.add("iuABtr")
		svgContainer.classList.add("checkmark")
		svgContainer.innerHTML = svg

		const setValue = value=>{
			if (value) {
				svgContainer.classList.add("gfBZnu")
				svgContainer.classList.remove("iuABtr")
							
				svgContainer.setAttribute("value", "true")
			} else {
				svgContainer.classList.remove("gfBZnu")
				svgContainer.classList.add("iuABtr")
				
				svgContainer.removeAttribute("value")
			}
		}

		setValue(status)
		
		container.addEventListener("click", e=>{
			if (e.pointerId == -1) return
			setValue(!svgContainer.getAttribute("value"))
			
			onclick(Boolean(svgContainer.getAttribute("value")))
		})
		
		titleContainer.append(titleText)

		textsContainer.append(titleContainer)
		textsContainer.append(descriptionText)
		
		container.append(textsContainer)
		container.append(checkbox)
		container.append(svgContainer)
				
		return container
	}
	var sideBarChilds = []
	const settingsTab = (id, name, icon, elements)=>{
		var tabContainer = document.createElement("DIV")
		var tabInner = document.createElement("DIV")
		var tabImage = document.createElement("IMG")
		var tabText = document.createTextNode(name)
			
		tabContainer.classList.add("_compact_1avxi_19")
		tabContainer.classList.add("_item_1avxi_1")
		tabContainer.id = id

		tabContainer.addEventListener("click", ()=>{
			window.history.pushState({},"", "/settings/" +id)
			document.querySelectorAll("._item_1avxi_1._compact_1avxi_19[data-active]")
				.forEach(elem=>elem.removeAttribute("data-active"))
			tabContainer.setAttribute("data-active", true) 

			var IHateRevoltUIModifying = document.createElement("DIV")
			var mainContainer = document.querySelector("._contentcontainer_t7t23_62")
			
			var isMobile = !Boolean(document.querySelector("._content_t7t23_40"))
			var sidebar = document.querySelector(isMobile ? "._sidebar_t7t23_39": "._container_t7t23_46") //_container_t7t23_46
			
			
			if (isMobile) {
				document.querySelector("._sidebar_t7t23_39").remove()
				mainContainer = document.createElement("DIV")
				mainContainer.classList.add("_content_t7t23_40")
				
				sidebar.remove()

				var containerAll = document.querySelector("._settings_t7t23_33")
				containerAll.append(mainContainer)

				var titleElem = document.querySelector(".Header-sc-ujh2d9-0.fPzJRX")
				titleElem.innerText = name
				var back = document.createElement('A')
				back.classList.add("IconButton-sc-166lqkp-0")
				back.classList.add("bGwznd")
				back.innerHTML = '<svg viewBox="0 0 24 24" height="24" width="24" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="StyledIconBase-ea9ulj-0 bWRyML" style="margin-inline-end: 10px;"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg>'
				back.addEventListener("click", ()=>{
					window.history.pushState({},"", "/settings/")
					titleElem.innerText = 'Settings'
					document.querySelectorAll("._container_t7t23_46").forEach(a=>a.remove())
					
					document.querySelector("._settings_t7t23_33").append(sidebar)
					document.querySelector("._content_t7t23_40").remove()
				})
				titleElem.prepend(back)
				IHateRevoltUIModifying.style.marginTop = '60px'
			} else {
				var title = document.createElement("H1")
				
				title.innerText = name
				title.style.marginBottom = '5px'
				IHateRevoltUIModifying.append(title)
			}

			IHateRevoltUIModifying.classList.add("SOM-MAIN-CONTAINER")
			
			elements.forEach(elem=>IHateRevoltUIModifying.append(typeof elem == 'function' ? elem() : elem))
			
			mainContainer.innerHTML = ""
			mainContainer.append(IHateRevoltUIModifying)
		})

		tabInner.classList.add("_content_1avxi_40")

		tabImage.src = icon
		tabImage.style.maxWidth = "20px"

		tabInner.append(tabImage)
		tabInner.append(tabText)
		tabContainer.append(tabInner)

		return tabContainer
	}
	
	window.addEventListener("click", ()=>{
		if (!window.location.href.includes("settings")) return

		if (document.querySelector('.SOM-MAIN-CONTAINER')) {
			var tab = window.location.href.split('/').slice(-1)[0]
			if (!["console", "som-about", "som-settings"].includes(tab)) {
				document.querySelector('.SOM-MAIN-CONTAINER').remove()
				document.querySelectorAll('.SOM-SETTINGS > *[data-active]').forEach(
					elem=>elem.removeAttribute("data-active")
				)
			}
		}
		
		if (! document.querySelector(".SOM-SETTINGS-TITLE")) {
			var pluginSettingsWraper = document.createElement("DIV")
			var pluginSideMenuCategoryTitle = document.createElement("DIV")
			var line = document.querySelector(".LineDivider-sc-135498f-0.fAjgmF")

			pluginSettingsWraper.style.paddingTop = "6px"
			pluginSettingsWraper.style.marginTop = "4px"
			pluginSettingsWraper.classList.add("SOM-SETTINGS")
			
			pluginSideMenuCategoryTitle.innerText = "Survive on mobile"

			pluginSideMenuCategoryTitle.classList.add("SOM-SETTINGS-TITLE")
			pluginSideMenuCategoryTitle.classList.add("Category-sc-tvyi45-0")
			pluginSideMenuCategoryTitle.classList.add("iuNJGz")


			pluginSettingsWraper.append(pluginSideMenuCategoryTitle)
			pluginSettingsWraper.append(settingsTab(
				"console",
				"Console",
				"",  // TODO: Put here image and not get terminated for copyrights
				[
					()=>{
						var consoleOutputContainer = document.createElement("DIV")

						consoleOutputContainer.id = "SOM-console-output-container"
						console.history.forEach(
							d=>consoleOutputContainer.append(console.asElement(d))
						)
						consoleOutputContainer.style.marginBottom = '250px'
						
						return consoleOutputContainer
					},
					(()=>{
						var container = document.createElement("DIV")
						var buttons = document.createElement("DIV")
						var executer = document.createElement("BUTTON")
						var clear = document.createElement("BUTTON")
						var codeInput = document.createElement("TEXTAREA")

						container.style.position = 'sticky'
						container.style.bottom = '75px'
						container.style.width = '100%'

						buttons.style.marginBottom = '5px'
						buttons.style.display = 'flex'

						codeInput.classList.add("TextArea-sc-1kh63xd-0")
						codeInput.classList.add("habcqT")
						codeInput.style.resize = 'none'
						container.style.maxWidth = '100vw'
						codeInput.addEventListener("focus", ()=>{
							codeInput.style.minHeight = '100%'
							container.style.height = '75vh'
							codeInput.style.width = '100%'

							var output = document.getElementById("SOM-console-output-container")
							output.style.opacity = 0.5
							
						})
						codeInput.addEventListener("blur", ()=>{
							codeInput.style.minHeight = ''
							container.style.height = ''

							var output = document.getElementById("SOM-console-output-container")
							output.style.opacity = 1
							
						})
						
						executer.innerText = "Execute"
						
						executer.classList.add("Button-sc-wdolxy-0")
						executer.classList.add("claKep")
						
						executer.addEventListener("click", ()=>{
							var code = codeInput.value.trim()
							if (!code) return

							console.evalCode(code)
							try {
								console.evalResult(eval(code))
							} catch(E) {
								return console.error(E.message)
							}
						})

						clear.classList.add("Button-sc-wdolxy-0")
						clear.classList.add("claKep")

						clear.innerText = 'Clear'

						clear.addEventListener("click", ()=>{
							console.clear()
							console.history = []
							var output = document.getElementById("SOM-console-output-container")
							output.innerHTML = ''
						})
						
						
						buttons.append(executer)
						buttons.append(clear)

						container.append(buttons)
						container.append(codeInput)
						
						return container
					})(),	
				]
			))
			pluginSettingsWraper.append(settingsTab(
				"som-settings",
				"Settings",
				"",  // TODO: Put here image and not get terminated for copyrights
				[
					checkmark(
						"Notify about every error",
						"You will see notification every time error occurs",
						JSON.parse(localStorage.SOM).errorNotify,
						val=>{ 
							var s = JSON.parse(localStorage.SOM)
							s.errorNotify = val
							localStorage.SOM = JSON.stringify(s)
						}
					),
					checkmark(
						"Notify about every warning",
						"You will see notification every time warning occurs",
						JSON.parse(localStorage.SOM).warnNotify,
						val=>{ 
							var s = JSON.parse(localStorage.SOM)
							s.warnNotify = val
							localStorage.SOM = JSON.stringify(s)
						}
					)
				]
			))
			pluginSettingsWraper.append(settingsTab(
				"som-about",
				"About",
				"",  // TODO: Put here image and not get terminated for copyrights
				[
					(()=>{
						var mainText = document.createElement("H3")

						mainText.innerText = "Survive on mobile v" +Array.from(state.plugins.plugins).find(plugin=>plugin[0]=="LazyCat2/Survive on mobile")[1].version
						return mainText
					})(),
					(()=>{
						var description = document.createElement("P")

						description.innerText = 'This plugin is designed for mobile users. It allows you easily access console without PC.'
						return description
					})(),
					(()=>{
						var githublink = document.createElement("BUTTON")
						var icon = document.createElement("IMG")
						var text = document.createElement("A")
						
						icon.src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
						icon.style.width = '15px'
						icon.style.width = '25px'
						icon.style.borderRadius = '100%'
						icon.style.marginRight = '10px'

						text.innerText = 'LazyCat2/revolt-plugins'
						
						githublink.addEventListener("click", ()=>{
							window.open('https://github.com/LazyCat2/revolt-plugins', '_blank').focus()
						})
						githublink.classList.add("claKep")
						githublink.classList.add("Button-sc-wdolxy-0")

						githublink.append(icon)
						githublink.append(text)
						
						var update = document.createElement("BUTTON")

						update.addEventListener("click", ()=>{
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
						})
						update.innerText = 'Update plugin (client will be restarted)'
						update.classList.add("Button-sc-wdolxy-0")
						update.classList.add("claKep")
						update.style.margin = '0px 10px'

						var buttonContainer = document.createElement("DIV")

						buttonContainer.style.display = 'flex'
						
						buttonContainer.append(githublink)
						buttonContainer.append(update)
						
						return buttonContainer
				})()
				]
			))
			if (line)			
				line.before(pluginSettingsWraper)
		}
	})
	
	return {
	    onClient: ()=>{},
	    onUnload: ()=>{}
	}
}
