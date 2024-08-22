<script lang="ts">
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import themes from "daisyui/src/theming/themes";
  import type { Writable } from "svelte/store";
  import { onMount } from "svelte";

  export let theme: Writable<string>;

  let currentTheme: string;

  onMount(() => {
    const unsubscribe = theme.subscribe((value) => {
      currentTheme = value;
    });

    return unsubscribe;
  });

  const handleThemeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      const newTheme = target.value;
      theme.set(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };
</script>

<div class="dropdown">
  <div tabindex="0" role="button" class="btn btn-lg m-1">
    Theme: {currentTheme}
    <ChevronDown />
  </div>
  <ul
    class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl block"
  >
    <div class="overflow-y-auto max-h-48">
      {#each Object.keys(themes) as _theme}
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            value={_theme}
            aria-label={_theme}
            checked={currentTheme === _theme}
            on:change={handleThemeChange}
          />
        </li>
      {/each}
    </div>
  </ul>
</div>
