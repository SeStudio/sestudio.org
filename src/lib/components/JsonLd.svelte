<script lang="ts">
  let { data }: { data: unknown } = $props();
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`}
</svelte:head>
