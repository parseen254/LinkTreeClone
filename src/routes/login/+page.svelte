<script lang="ts">
  import { auth, user } from "$lib/firebase";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
</script>

{#if $user}
  <div class="card card-side bg-base-300 shadow-2xl py-6 px-12 w-full">
    <figure>
      <img
        src={$user.photoURL}
        alt={$user.displayName}
        class="w-48 h-48 rounded-full p-4"
      />
    </figure>
    <div class="card-body text-pretty text-left">
      <h2 class="card-title">Hello, {$user.displayName?.split(" ")[0]} 👋</h2>
      <p class="text-xs">Email: {$user.email}</p>
      <div class="card-actions justify-end">
        <button
          on:click={() => signOut(auth)}
          class="btn btn-block btn-warning rounded-lg mt-4"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
{:else}
  <button on:click={signInWithGoogle} class="btn btn-block btn-primary">
    Sign In with Google
  </button>
{/if}
