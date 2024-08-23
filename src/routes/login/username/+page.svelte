<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";
  import User from "lucide-svelte/icons/user";

  let username = "";
  let loading = false;
  let isUsernameAvailable = false;

  let debounceTimer: NodeJS.Timeout;
  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  $: isValid =
    username?.length > 2 && username?.length < 17 && re.test(username);
  $: isTouched = username?.length > 0;
  $: isTaken = isValid && !isUsernameAvailable && !loading;

  async function checkUsernameAvailability() {
    clearTimeout(debounceTimer);
    loading = true;
    debounceTimer = setTimeout(async () => {
      const docRef = doc(db, "usernames", username);
      const docSnap = await getDoc(docRef);
      isUsernameAvailable = !docSnap.exists();
      loading = false;
    }, 369);
  }

  async function confirmUsername() {
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
      <label
        class:input-success={isUsernameAvailable && isValid && !loading}
        class:input-error={!isValid && isTouched}
        class:input-warning={isTaken}
        class="input input-bordered flex items-center gap-2"
      >
        <input
          type="text"
          class="grow"
          placeholder="Username"
          bind:value={username}
          on:input={checkUsernameAvailability}
        />
        <User class="opacity-70" />
      </label>
      {#if username}
        {#if !isValid && isTouched}
          <p class="text-error text-sm">
            must be 3-17 characters long, alphanumeric only
          </p>
        {:else if loading && isTouched}
          <p class="text-base-content">Checking availability...</p>
        {:else if isUsernameAvailable && isValid}
          <p class="text-success">{username} is available!</p>
        {:else}
          <p class="text-error">{username} is unavailable</p>
        {/if}
      {/if}
      <button
        type="submit"
        class="btn btn-primary"
        disabled={!isUsernameAvailable || !isValid || loading}
        >Confirm Username {username && "@"}{username}</button
      >
    </form>
  </div>
</AuthCheck>
