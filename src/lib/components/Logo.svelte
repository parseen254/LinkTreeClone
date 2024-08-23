<script lang="ts">
  export let className: string = '';
</script>

<div class="flex flex-col justify-center items-center">
  <svg
    width="288"
    height="288"
    viewBox="0 0 288 288"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
  >
    <defs>
      <filter id="colorFilter">
        <feFlood id="logoColor" flood-color="currentColor" result="color" />
        <feComposite
          in="color"
          in2="SourceAlpha"
          operator="in"
          result="masked-color"
        />
        <feComposite in="masked-color" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
    <image
      href="/favicon.png"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      filter="url(#colorFilter)"
    />
  </svg>
</div>
