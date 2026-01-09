<script lang="ts">
    import { page } from '$app/state'
    import { animationTime } from '$lib/store'
    import Land from '$lib/svgs/land.svelte'
    import Sea from '$lib/svgs/sea.svelte'
    import texture from '$lib/imgs/yan-ots-UuBR5kbvt4Y-unsplash.webp'
    let { home } = $props()
</script>

<div class="background" class:home style="--animationTime: {$animationTime}ms;">
    <div class="texture" style="background-image: url('{texture}');"></div>
    <Sea></Sea>
    <Land></Land>
    <div class="sun"></div>
</div>

<style lang="scss">
    .background {
        background-color: #b7e6dd;
        width: 100dvw;
        max-height: 100dvh;
        position: fixed;
        overflow: hidden;
        inset: 0px;
        z-index: -10;
        transition: background-color var(--animationTime) ease;
        :global(.land) {
            z-index: -5;
            position: absolute;
            top: 75dvh;
            left: -10%;
            min-height: 25svh;
            width: 120%;
            transition: top var(--animationTime) ease;
        }
        :global(.sea) {
            z-index: -7;
            position: absolute;
            top: 40dvh;
            left: -10%;
            min-height: 100svh;
            width: 120%;
            transition: top var(--animationTime) ease;
        }
        .sun {
            width: 7.5dvh;
            height: 7.5dvh;
            position: absolute;
            top: 7.5dvh;
            border-radius: 100%;
            left: 7.5dvh;
            transform: translate(-50%, -50%);
            z-index: -9;
            background-color: #ef8012;
            transition: top var(--animationTime) ease;
        }
        .texture {
            width: 100dvw;
            height: 100%;
            position: absolute;
            background-size: cover;
            mix-blend-mode: color-burn;
            opacity: 0.5;
            background-repeat: no-repeat;
            inset: 0;
            z-index: 0;
        }
        &.home {
            background-color: #6e878a;

            .sun {
                top: 25dvh;
            }

            :global(.sea) {
                top: 20dvh;
            }

            :global(.land) {
                top: 90dvh;
            }
        }
    }
</style>
