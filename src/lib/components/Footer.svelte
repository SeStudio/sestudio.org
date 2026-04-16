<footer class="footer">
  <div class="container footer-inner">
    <div class="contact">
      <a href="mailto:support@sestudio.org">support@sestudio.org</a>
      <span class="sep" aria-hidden="true">·</span>
      <a href="mailto:press@sestudio.org">press@sestudio.org</a>
    </div>
    <span>&copy; SeStudio</span>
  </div>
</footer>

<style>
  .footer {
    padding: var(--space-3) 0;
    color: var(--muted);
    font-size: 0.8rem;
  }

  .footer-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-2);
  }

  .contact {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
  }

  .contact a {
    color: var(--muted);
  }

  .contact a:hover,
  .contact a:focus-visible {
    color: var(--accent);
  }

  .sep {
    opacity: 0.5;
  }
</style>
