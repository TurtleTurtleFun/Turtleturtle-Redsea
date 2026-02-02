<script lang="ts">
    import { getRandomArbitrary } from '$lib/Funcs'
    import { animationTime } from '$lib/store'
    import { fade, scale } from 'svelte/transition'

    let { children } = $props()
    let rotation = getRandomArbitrary(-1.5, 1.5)
</script>

{#key getRandomArbitrary(0, 99)}
    <div
        class="board"
        style="transform: rotate({rotation}deg);"
        in:scale|global={{
            duration: 300,
            delay: 300,
            opacity: 0,
            start: 1.2,
        }}
        out:fade|global={{ duration: 300 }}
    >
        {@render children()}
    </div>
{/key}

<style lang="scss">
    .board {
        padding: var(--padding) var(--largePadding);
        background-color: var(--white);
        min-width: clamp(30dvw, 50dvw, calc(500px - var(--largePadding)));
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-shadow: var(--shadowS);
    }
</style>
