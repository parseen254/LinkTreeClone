<script lang="ts">
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import themes from "daisyui/src/theming/themes";
  import { writable, type Writable } from "svelte/store";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  const getInitialTheme = async (): Promise<string> => {
    switch (browser) {
      case true:
        return localStorage.getItem("theme") || "dark";
      default:
        return "dark";
    }
  };

  let theme: Writable<string>;
  let currentTheme: string;

  onMount(async () => {
    const initialTheme = await getInitialTheme();
    theme = writable(initialTheme);
    currentTheme = initialTheme;
  });

  const handleThemeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      currentTheme = target.value;
      theme.set(currentTheme);
      localStorage.setItem("theme", currentTheme);
    }
  };
</script>

<div class="dropdown">
  <div tabindex="0" role="button" class="btn m-1">
    Theme: {currentTheme}
    <ChevronDown class="ml-2 w-6 h-6" />
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
