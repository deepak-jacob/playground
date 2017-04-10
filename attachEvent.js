export default function attactClickEvent(selector, eventHandler) {
	Array.from(document.querySelectorAll(selector)).forEach(ele => ele.addEventListener('click', eventHandler));
}
