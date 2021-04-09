<script>
    export let book;
</script>

<div class="flex flex-col w-32 md:w-36">
    <img src={book.imageUrl} alt={book.title} class="object-cover" />
    <p class="text-indigo-600">
        <a href="https://goodread.com/title/{book.goodreadId}">{book.title}</a>
    </p>
    <p class="text-indigo-400">{book.authorName}</p>
    <p class="text-gray-500">{book.avgRating} by {book.ratingCount} readers</p>
</div>
