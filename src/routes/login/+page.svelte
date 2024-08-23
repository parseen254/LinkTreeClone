<script lang="ts">
  import { auth } from "$lib/firebase";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  };
</script>

<button on:click={signInWithGoogle} class="btn ">
  Sign In with Google
</button>
