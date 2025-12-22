<script lang="ts">
    import { page } from '$app/state'

    let home = $state(true)
    $effect(() => {
        home = page.route.id == '/'
    })
</script>

<div class="title" class:notHome={!home}>
    <h1>TurtleTurtle</h1>
    <h2>Red Sea</h2>
</div>

<style lang="scss">
    .title {
        transition: flex-grow var(--animationTime) ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2 {
            font-family: 'Intro Script';
            font-size: calc(0.6 * var(--font-size-xxxl));
            -webkit-text-stroke: calc(0.5 * var(--padding)) var(--red);
            color: var(--white);
            paint-order: stroke fill;
            text-shadow: var(--shadowS);
            align-self: flex-end;
            rotate: -10deg;
            margin-top: calc(-0.7 * var(--font-size-xxxl));
            margin-right: calc(-1 * var(--padding));
        }

        h1 {
            font-family: 'Intro Script';
            font-size: calc(1.2 * var(--font-size-xxxl));
            -webkit-text-stroke: calc(0.5 * var(--padding)) var(--white);
            color: var(--green);
            paint-order: stroke fill;
            text-shadow: var(--shadowS);
            margin-bottom: 0px;
        }
    }
</style>
