<script lang="ts">
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import Splash from '$lib/comps/utils/Splash.svelte'
    import type { PageData } from './$types'

    let { data }: { data: PageData } = $props()
</script>

<Splash>
    <h2>About</h2>
    <p>
        TurtleTurtle is the first of its kind interactive sea turtle photo-ID
        game!
    </p>
    <p>
        You can play endlessly trying to match sea turtle faces and in the same
        time learn facts about their lives! Some of the turtles in the game have
        stories that go back more than 3 decades ago! When you play, these
        stories and facts along with a photo of the turtle you match appear in a
        pop-up window.
    </p>
    <p>
        Your task is to match turtles using photo-identification (photo-ID):
        Every turtle has a unique pattern of scales that does not change in
        time. This left side pattern is different to the right side one but
        there are still enough similarities to allow you to match turtles from
        opposite profiles. Yet, this is considered a much more difficult task
        than matching turtles from photos that show the same profile! Sometimes
        the photos are not very clear which also makes the matching difficult!
    </p>
    <p>
        There are 4 difficulty levels depending on the quality of the images and
        the head orientations: Easy, Medium, Hard and Expert. AI algorithms can
        also do this matching task but they may struggle with low photo quality
        and different orientations. Can you beat them?
    </p>
    <p>
        All the turtle photos in the game are from the loggerhead sea turtle
        population of Zakynthos Island, Greece. This is one of the most
        important and best studied sea turtle populations in the Mediterranean.
        You can get involved in sea turtle conservation there by volunteering
        with
        <a href="https://archelon.gr"
            >ARCHELON, the Sea Turtle Protection Society of Greece</a
        >.
    </p>
    <p>
        Did you see a sea turtle in Zakynthos and want to learn more about its
        story? You can submit its photo <a href="https://zakynthosturtles.org"
            >here</a
        > and you will immediately receive all the information we know about it via
        an email!
    </p>
    <p>
        Do you have your own sea turtle photo-ID project and you would like to
        create such a game with your photos! We can help you set it up for free
        and host your game in your own server. You don’t have to send us your
        data! Please contact <a
            href="mailto:k.papafitsoros@qmul.ac.uk?subject=TurtleTurtle"
            >Kostas Papafitsoros</a
        > if you are interested!
    </p>
</Splash>
<ButtonBox>
    <Button url="/" style="orange">Home</Button>
    <Button url="/about/credits">Credits</Button>
    <Button url="/about/science">Science</Button>
    <Button url="https://www.turtleturtle.fun">Zakynthos Edition</Button>
    <Button url="mailto:k.papafitsoros@qmul.ac.uk?subject=TurtleTurtle"
        >Contact</Button
    >
</ButtonBox>
