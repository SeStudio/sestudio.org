<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import { videoGameSchemas } from '$lib/seo/videogames';
</script>

{#each videoGameSchemas as game (game.url)}
  <JsonLd data={game} />
{/each}

<Hero />
