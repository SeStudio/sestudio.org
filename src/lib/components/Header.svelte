<script lang="ts">
  import SocialLinks from './SocialLinks.svelte';
</script>

<header class="header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="SeStudio home">
      <img src="/logos/logo.svg" alt="SeStudio" />
    </a>
    <div class="socials-wrap">
      <SocialLinks />
    </div>
  </div>
</header>

<style>
  .header-inner {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4);
  }

  .brand {
    grid-column: 2;
    display: inline-flex;
    align-items: center;
    justify-self: center;
  }

  .brand img {
    height: 80px;
    width: auto;
    display: block;
  }

  .socials-wrap {
    grid-column: 3;
    justify-self: end;
  }

  @media (max-width: 640px) {
    .header-inner {
      grid-template-columns: 1fr;
      justify-items: center;
      padding: var(--space-3);
      gap: var(--space-3);
    }

    .brand,
    .socials-wrap {
      grid-column: 1;
      justify-self: center;
    }

    .brand img {
      height: 56px;
    }
  }
</style>
