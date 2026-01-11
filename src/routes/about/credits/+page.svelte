<script lang="ts">
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import Splash from '$lib/comps/utils/Splash.svelte'
    import type { PageData } from './$types'
    import logo from '$lib/imgs/QMplusISTS_CPE_Logo_landscape_-_blue-removebg-preview.png'
    import Board from '$lib/comps/utils/board.svelte'

    let { data }: { data: PageData } = $props()
</script>

<Splash>
    <h2>Credits</h2>
    <p>
        This project builds upon the original <a href="https://www.turtleturtle.fun/">TurtleTurtle</a> game which was funded by a Queen Mary University of London Public Engagement Grant awarded to <a
            href="https://kostaspapafitsoros.weebly.com/">Kostas Papafitsoros</a
        >. The TurtleTurtle-RedSea version was developed with support from an <a href="https://www.internationalseaturtlesociety.org/">ISTS</a> Innovation Grant awarded to Micol Montagna and Kostas Papafitsoros.
    </p>

    <p>
        Game design & development: <a href="https://www.fredwordie.com/"
            >Fred Wordie</a
        >
    </p>
    <p>Further data support by: Valeria Roma, Lukáš Adam</p>
    <Board>
        <img src={logo} alt="" />
    </Board>
</Splash>
<ButtonBox>
    <Button url="/" style="orange">Home</Button>
    <Button url="/about">About</Button>
    <Button url="/about/science">Science</Button>
    <Button url="https://www.turtleturtle.fun">Zakynthos Edition</Button>
    <Button url="mailto:k.papafitsoros@qmul.ac.uk?subject=TurtleTurtle"
        >Contact</Button
    ></ButtonBox
>

<style>
    img {
        max-width: 100%;
    }
</style>
