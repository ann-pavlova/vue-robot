export default function (element, bindings) {
	Object.keys(bindings.value).forEach(position => {
		element.style[position] = bindings.value[position];
	});

	element.style.position = 'absolute';
}