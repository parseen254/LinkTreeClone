<script lang="ts">
  import { user, userData } from "$lib/firebase";
  import Logo from "$lib/components/Logo.svelte";
  import ThemeController from "$lib/components/ThemeController.svelte";
  import "../app.css";

  $user;
  $userData;
</script>

<div class="flex flex-col min-h-screen">
  <nav class="flex justify-between pt-4 w-full md:w-2/3 lg:w-1/2 mx-auto">
    <Logo className="w-16 h-16 rounded-full" />
    <ThemeController />
  </nav>
  <slot />
</div>
