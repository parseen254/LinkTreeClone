<script lang="ts">
  import { user } from "$lib/firebase";
</script>

{#if $user}
  <slot />
{:else}
  <div
    class="flex flex-col justify-betweenw-full md:w-2/3 lg:w-1/2"
  >
    <p class="text-center text-lg font-bold my-6">Please sign in to continue</p>
    <a href="/login" class="btn btn-lg rounded-lg btn-primary my-6 w-full md:w-2/3 mx-auto">Sign In</a>
  </div>
{/if}
