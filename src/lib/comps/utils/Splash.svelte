<script lang="ts">
    import { getRandomArbitrary } from '$lib/Funcs'
    import { animationTime } from '$lib/store'
    import { fade, scale } from 'svelte/transition'

    let { children } = $props()
    let rotation = getRandomArbitrary(-1.5, 1.5)
</script>

{#key getRandomArbitrary(0, 99)}
    <div
        class="splashScreen"
        style="transform: rotate({rotation}deg) translate(0,-50%);"
        in:scale|global={{
            duration: 300,
            delay: 300,
            opacity: 0,
            start: 1.5,
        }}
        out:fade|global={{ duration: 300 }}
    >
        {@render children()}
    </div>
    <div
        class="darkenBackground"
        in:fade|global={{
            duration: 300,
        }}
        out:fade|global={{ duration: 300 }}
    ></div>
{/key}

<style lang="scss">
    .splashScreen {
        position: fixed;
        z-index: 9;
        background-color: var(--lightBlue);
        width: calc(100% - 2 * var(--largePadding));
        max-width: calc(500px);
        display: flex;
        align-items: center;
        justify-content: safe center;
        flex-direction: column;
        padding: var(--largePadding);
        box-shadow: var(--shadowL);
        min-height: 40dvh;
        max-height: 70dvh;
        text-align: center;
        overflow: auto;
        top: 50%;
        gap: var(--halfPadding);
    }
    .darkenBackground {
        position: fixed;
        top: 0;
        z-index: 8;
        height: 100dvh;
        width: 100dvw;
        background-color: black;
        opacity: 0.4;
    }
</style>
