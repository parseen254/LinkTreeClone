<script lang="ts">
  import { auth, user, userData } from "$lib/firebase";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);

    const idToken = await credential.user.getIdToken();

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
  }

  async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }
</script>

{#if $user}
  <div class="card card-side bg-base-300 shadow-2xl py-6 px-12 w-full">
    <figure>
      <img
        src={$userData?.photoURL}
        alt={$user.displayName}
        class="w-48 h-48 rounded-full p-4"
      />
    </figure>
    <div class="card-body text-pretty text-left">
      <h2 class="card-title">
        Hello, {`@${$userData?.username}` || $user.displayName?.split(" ")[0]} 👋
      </h2>
      <p class="text-xs">Email: {$user.email}</p>
      <div class="card-actions justify-start">
        <button
          on:click={signOutSSR}
          class="btn btn-lg btn-warning rounded-lg mt-4 w-full md:w-2/3"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="py-24 w-full md:w-2/3 lg:w-1/2">
    <button
      on:click={signInWithGoogle}
      class="btn btn-lg rounded-lg btn-primary w-full md:w-2/3"
    >
      Sign In with Google
    </button>
  </div>
{/if}
