import { writable, derived } from 'svelte/store';

function dadjokeApi() {
	const { subscribe, set } = writable({id:"", joke:"", status: 200});
	
	return {
		subscribe,
		fetch: async () => {
			let config = {
				headers: {
					Accept: "application/json",
				}
			};

			let response = await fetch("https://icanhazdadjoke.com/", config);
			let json = await response.json();
			set(json);
		}
	}
}

export const dadjoke = dadjokeApi();

export const dadjokeStatus = derived(dadjoke, ($dadjoke) => {
	switch ($dadjoke.status) {
		default:
			return $dadjoke.status.toString();
		case 200:
		case 201:
	  case 202:
		case 203:
		case 204:
		case 205:
		case 206:
		case 207:
		case 208:
		case 226:
			return "Success!";
		case 429:
			return "You have asked for too many dad jokes. Try again later";
	};
})

let last = -1;
export const dadjokeResponse = derived(dadjoke, ($dadjoke) => {
	const responses = [
		"Bad joke dad",
		"Boo!",
		"No",
		"Stop",
		"Do better",
		"I hate you",
		"Please stop",
		"God no",
		"Thats a horrible joke",
		"Not funny",
		"Mercy please!",
		"Please kill me",
		"Free me from this",
		"Haha... no.",
		"Hello, police?",
	];
	
	// Select a new response that is different from the last
	let i = 0;
	do {
		i = Math.floor(Math.random() * responses.length);
	} while (i == last);
	last = i;
	
	return responses[i];
})
