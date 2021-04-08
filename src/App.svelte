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
	<h1>Goodread Library Search</h1>
	<form>
		<input type="text" required bind:value={searchKey} />
		<button class="ml-2 px-5 py-2" on:click|preventDefault={getBookList}>Search</button>
	</form>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-col-4 lg:grid-cols-4 gap-3 mt-5 px-3 lg:px-60">
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
