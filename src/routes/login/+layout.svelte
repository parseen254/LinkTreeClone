<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<nav
  class="flex justify-center items-center w-full md:w-2/3 lg:w-1/2 mx-auto my-4"
>
  <ul class="steps">
    <a href="/login" class="step step-primary">Sign In</a>
    <a
      href="/login/username"
      class:step-primary={$page.route.id?.match(/username|photo/g)}
      class="step">Choose Username</a
    >
    <a
      href="/login/photo"
      class:step-primary={$page.route.id?.match(/photo/g)}
      class="step">Upload Photo</a
    >
  </ul>
</nav>

<AnimatedRoute>
  <main class="card w-full md:w-2/3 lg:w-1/2 mx-auto">
    <div class="card-body items-center text-center p-0">
      <slot />
    </div>
  </main>
</AnimatedRoute>
