<script lang="ts">
  import '@fontsource/archivo-black/400.css';
  import '@fontsource/space-grotesk/400.css';
  import '@fontsource/space-grotesk/700.css';
  import '../app.css';

  import JsonLd from '$lib/components/JsonLd.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { organizationSchema } from '$lib/seo/organization';

  let { children } = $props();
</script>

<JsonLd data={organizationSchema} />

<Header />

<main>
  {@render children()}
</main>

<Footer />
