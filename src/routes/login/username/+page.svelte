<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";
  import User from "lucide-svelte/icons/user";

  let username = "";
  let loading = false;
  let isUsernameAvailable = false;

  async function checkUsernameAvailability() {
    loading = true;
    const docRef = doc(db, "usernames", username);
    const docSnap = await getDoc(docRef);
    isUsernameAvailable = !docSnap.exists();
    loading = false;
  }

  async function confirmUsername() {
    console.log("confirming username", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user?.photoURL ?? null,
      published: true,
      bio: "I am a new user",
      links: [
        {
          label: "Website",
          url: "https://example.com",
          icon: "link",
        },
      ],
    });
    await batch.commit();
    username = "";
    isUsernameAvailable = false;
  }
</script>

<AuthCheck>
  <div class="card card-side bg-base-300 shadow-2xl py-6 px-12 w-full">
    <form
      class="card-body form-control"
      on:submit|preventDefault={confirmUsername}
    >
      <h2 class="card-title">Username</h2>
      <label class="label cursor-pointer flex items-center gap-2">
        <User />
        <input
          type="text"
          class="grow input input-bordered"
          class:input-success={isUsernameAvailable && username && !loading}
          class:input-error={!isUsernameAvailable && username && !loading}
          placeholder="Username"
          bind:value={username}
          on:input={checkUsernameAvailability}
        />
      </label>
      {#if username}
        {#if loading}
          <p class="text-base-content">Checking availability...</p>
        {:else if isUsernameAvailable}
          <p class="text-success">{username} is available!</p>
        {:else}
          <p class="text-error">{username} is unavailable</p>
        {/if}
      {/if}
      <button
        type="submit"
        class="btn btn-primary"
        disabled={!isUsernameAvailable || !username || loading}
        >Confirm Username {username && '@'}{username}</button
      >
    </form>
  </div>
</AuthCheck>
