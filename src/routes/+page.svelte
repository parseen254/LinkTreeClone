<script lang="ts">
  import ThemeController from "$lib/components/ThemeController.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import { writable } from "svelte/store";
  import { browser } from "$app/environment";

  function getInitialTheme(): string {
    if (browser) {
      return (
        localStorage.getItem("theme") ||
        document.documentElement.getAttribute("data-theme") ||
        "dark"
      );
    }
    return "dark";
  }

  const theme = writable(getInitialTheme());
</script>

<div class="flex flex-col justify-center items-center h-screen">
  <h1 class="text-4xl font-bold mb-4">LinkTree Clone</h1>
  <Logo />
  <ThemeController {theme} />
</div>