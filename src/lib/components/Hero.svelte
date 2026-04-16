<script lang="ts">
  import { onMount } from 'svelte';
  import { slogans } from '$lib/data/slogans';

  let pick = $state(slogans[0]);

  onMount(() => {
    pick = slogans[Math.floor(Math.random() * slogans.length)];
  });

  const lines = $derived(
    pick.match(/[^.]+\./g)?.map((s) => s.trim()) ?? [pick]
  );

  function parts(line: string) {
    return line
      .split(/(\{[^}]+\})/g)
      .filter((s) => s.length > 0)
      .map((s) =>
        s.startsWith('{') && s.endsWith('}')
          ? { text: s.slice(1, -1), accent: true }
          : { text: s, accent: false }
      );
  }
</script>

<section class="hero">
  <h1 class="visually-hidden">SeStudio — Steam Engine Studio</h1>
  <div class="container hero-inner">
    <p class="slogan">
      {#each lines as line, i (i)}
        <span>
          {#each parts(line) as seg, j (j)}
            {#if seg.accent}<em>{seg.text}</em>{:else}{seg.text}{/if}
          {/each}
        </span>
      {/each}
    </p>
  </div>
</section>

<style>
  .hero {
    min-height: 78vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-5) 0;
  }

  .hero-inner {
    text-align: center;
  }

  .slogan {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 3.4vw, 2rem);
    text-transform: uppercase;
    letter-spacing: 0.02em;
    line-height: 1.18;
    margin: 0 auto;
    padding-bottom: 0.15em;
    max-width: 44ch;
  }

  .slogan span {
    display: block;
  }

  em {
    color: var(--accent);
    font-style: normal;
  }
</style>
