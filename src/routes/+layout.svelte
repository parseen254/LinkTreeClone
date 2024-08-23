<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import ThemeController from "$lib/components/ThemeController.svelte";
  import "../app.css";
</script>

<div class="flex flex-col min-h-screen">
  <nav class="flex justify-between pt-4 px-[25%] w-full">
    <Logo className="w-16 h-16 rounded-full" />
    <ThemeController />
  </nav>
  <slot />
</div>
