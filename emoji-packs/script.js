()=>{
	const repoUrl = "https://raw.githubusercontent.com/LazyCat2/revolt-plugins/main/emoji-packs/packs.json";
	// const repoUrl = "http://localhost:1234/emoji-packs/packs.json";
	const buttonIcon = "🐱";
	const elementClasses = {
		rightSideButtons: ".MessageBox__Action-sc-jul4fa-2.fIbyPH",
		customEmojiPicker: ".emoji-packs-emoji-picker",
		emojiPicker: ".Column-sc-mmjmg6-0.Base-sc-1c6g74-0.iGkTrh.kpGWUw",
		modified: "emojipacks-modified",
		emojipacksList: ".Groups-sc-1c6g74-3.iSKkn"
	}

	var packs = [];

	function getPackOf(emojiId) {
		return packs.find(p=>p.emojis.includes(emojiId));
	}
	
	function log(a) {
		console.log("[Emoji Packs] ", a);
	}

	function emojiUrl(emoji) {
		return `https://autumn.revolt.chat/emojis/${emoji}`
	}

	function fetchPacks() {
		xhr = new XMLHttpRequest();
		xhr.open("GET", repoUrl);
		xhr.send("");
		xhr.onload = function() {
			packs = JSON.parse(xhr.response);
		};
	}
	
	function createEmojiButton(emoji) {
		/* <a class="EmojiContainer-sc-1c6g74-4 flxbls">
			<div class="CategoryIcon-sc-1c6g74-7 eXUldd">
				<a class="EmojiContainer-sc-1c6g74-4 flxbls">
					<img alt=":_:" loading="lazy" class="sc-dlfnuX ljqHEM emoji" draggable="false" src="">
				</a>
			</div>
		</a> */

		const container1 = document.createElement("a")
		const container2 = document.createElement("div")
		const container3 = document.createElement("a")
		if (emoji) {	
			const image = document.createElement("img")
			
			image.classList.add("sc-dlfnuX", "ljqHEM", "emoji")
			image.src = emojiUrl(emoji)
			image.alt = `:${emoji}:`
			image.loading = "lazy"
			image.draggable = "false"

			container3.append(image)
		} else {
			const add = document.createElement("a")
			
			add.innerHTML = "&plus;"
			container3.append(add)
		}

		container1.classList.add("EmojiContainer-sc-1c6g74-4", "flxbls")
		container2.classList.add("EmojiContainer-sc-1c6g74-4", "eXUldd")
		container3.classList.add("EmojiContainer-sc-1c6g74-4", "flxbls")
		
		container1.append(container2)
		container2.append(container3)

		return container1
	}

	function createEmoji(emoji) {
		/* <a class="EmojiContainer-sc-1c6g74-4 flxbls">
			<img alt=":_:" loading="lazy" class="sc-dlfnuX ljqHEM emoji" draggable="false" src="">
		</a> */

		const container = document.createElement("a")
		const image = document.createElement("img")

		container.classList.add("EmojiContainer-sc-1c6g74-4", "flxbls")
		image.classList.add("sc-dlfnuX", "ljqHEM", "emoji")
		image.src = emojiUrl(emoji)
		image.alt = `:${emoji}:`
		image.loading = "lazy"
		draggable = "false"
		
		container.append(image)
		container.addEventListener("click", ()=>pasteIntoMsgbox(`:${emoji}:`))

		return container
	}
	
	function pasteIntoMsgbox(text) {
		const message = document.getElementById("message")
	    const start = message.selectionStart;
	    const end = message.selectionEnd;
	    const currentValue = message.value || "";
	    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);

	    message.value = newValue;
	    message.selectionStart = message.selectionEnd = start + text.length;
	    message.dispatchEvent(new Event('input'));
	}
	
	function onClick() {
		const emojiPicker = document.querySelector(elementClasses.emojiPicker)
		if (!emojiPicker) return;

		if (emojiPicker.classList.contains(elementClasses.modified)) return;

		emojiPicker.classList.add(elementClasses.modified);

		const emojipacksList = document.querySelector(elementClasses.emojipacksList);
		emojipacksList.insertBefore(
			createEmojiButton("01JB9VZ0ZJKV3R2VHSK8RVX7NZ"),
			emojipacksList.lastChild
		);
		emojipacksList.append(
			createEmojiButton()
		)
	}

	const styleTag = document.createElement("style");
	styleTag.innerText = `
.EmojiContainer-sc-1c6g74-4.flxbls > a {
	font-size: 25px;
	font-weight: bolder;
}
	`
	document.head.append(styleTag);
	window.addEventListener("click", onClick);
	
	return { onUnload: ()=>{} }
}
