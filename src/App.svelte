<script>
	import Book from "./Book.svelte";
	import Tailwind from './Tailwind.svelte';

	let items;
	let searchKey;

	async function getBookList() {
		if (searchKey) {
			await fetch(
				`https://thinkpool-goodread.nezamuddin.repl.co/search/${searchKey}`
			).then((res) => res.json()).then(resp => items = resp);
			console.log(items);
		}
	}
</script>
<Tailwind />
<main>
	<p class="text-4xl font-bold text-indigo-600 lg:text-6xl">Goodread Library Search</p>
	<form class="mt-3">
		<input type="text" class="border-indigo-300" required bind:value={searchKey} />
		<button class="ml-2 mt-2 px-5 py-2 text-indigo-700 border-indigo-300 hover:border-indigo-600" on:click|preventDefault={getBookList}>Search</button>
	</form>
	<div class="grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-col-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 px-3 lg:px-48">
		{#if items}
			{#each items.list as book}
				<Book {book} />
				
			{/each}
		{/if}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	
</style>
