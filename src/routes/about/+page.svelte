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
        TurtleTurtle-RedSea is an interactive sea turtle photo-identification game that 	allows you to learn about the sea turtles of the Egyptian Red Sea while having 		fun matching their faces.
    </p>
    <p>
        You can play endlessly trying to match sea turtle faces and in the same
        time learn facts about their lives! All the green and hawksbill turtles featured 	in the game have been monitored for years through 
	<a href="https://www.turtlewatchegypt.net">TurtleWatch Egypt 2.0’s</a> 
	long-term research and citizen science program. When you successfully match a 		turtle, a pop-up window appears showing its story, biological information, and		conservation facts from the Red Sea.
    </p>
    <p>
        Your task is to match turtles using photo-identification (photo-ID), a 			scientific method widely used in sea turtle research. Each turtle has a unique 		pattern of facial scales that does not change over time. The pattern on the left 	side of the face is different from the right side, but there are enough 		similarities to allow matching turtles from opposite profiles. This is much more 	challenging than matching photos showing the same side, especially when images		are unclear or taken from different angles.
    </p>
    <p>
        There are four difficulty levels (Easy, Medium, Hard, and Expert) based on image 	quality, head orientation, and species. Green turtle facial patterns are 		generally easier to match, while hawksbill turtles often present more 			difficulties, making identification more challenging. Artificial intelligence 		algorithms can also perform this task, but they often struggle with low-quality 	images, different orientations, and species-specific variability. Can you do 		better?
    </p>
    <p>
	All turtle photos in the game come from TurtleWatch Egypt 2.0’s photo-ID 		database, built since 2011 with contributions from tourists, divers, local 		communities and organizations, and researchers. The game is based on the 		original <a href="turtleturtle.fun">TurtleTurtle</a> concept originally created 	for the sea turtles of Zakynthos Island, Greece, with support from Queen Mary 		University of London. The Red Sea version was adapted and developed by the 		original TurtleTurtle with funding provided by an 
	<a href="https://www.internationalseaturtlesociety.org/">International Sea 		Turtle Society</a> Innovation Grant.
    </p>
    <p>
	You can get involved in sea turtle conservation in the Red Sea by sharing your 		sightings with, volunteering for, or <a href="https://turtlewatchegypt.net/support-us/">supporting TurtleWatch Egypt 2.0</a>.
    </p>	
    <p>
        Did you see a sea turtle in the Red Sea  and want to learn more about its
        story? You can submit your photo or video <a href="https://turtlewatchegypt.net/share-marine-turtles-photos/"
            >here</a
        >. By doing so, you will contribute to sea turtle conservation in the Red Sea, 		helping improve scientific knowledge. The TurtleWatch Egypt 2.0 team will share 	with you the results of your sighting once the identification process is 		complete.
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
    <Button url="mailto:turtlewatchegypt@gmail.com?subject=TurtleTurtle-RedSea"
        >Contact</Button
    >
</ButtonBox>
