<script lang="ts">
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import Splash from '$lib/comps/utils/Splash.svelte'
</script>

<Splash>
    <h2>The Science</h2>
    <p>
        TurtleTurtle-RedSea is based on real scientific research and long-term conservation 	work carried out in the Egyptian Red Sea.
    </p>
    <ul>
        <li>
		All the turtle photos used in the game come from TurtleWatch Egypt 2.0 ’s 		long-term photo-identification database including more than 11000 turtle 		sightings and a catalogue of almost 1000 individual turtles, which has been 		built since 2011- at that time under the umbrella of the Hurghada 			Environmental Protection and Conservation Association - through the help of 		tourists, divers, dive centers, and local communities. This citizen science 		approach has proven to be a
		 <a href="https://doi.org/10.1007/978-3-319-99417-8_28">powerful tool for 		monitoring marine megafauna in the Red Sea </a> and improving our			understanding of sea turtle populations and their conservation needs.
        </li>
        <li>
		The game is built around photo-identification (photo-ID), a non-invasive 		technique widely used by researchers to identify animals to the individual 		levels using the natural markers on their bodies. Each sea turtle has a 		unique pattern of facial scales that remains unchanged over time, allowing 		individuals to be recognised across years. By applying photo-ID, TurtleWatch 		2.0 team have been able to monitor turtles at feeding grounds, study site 		fidelity, assess population connectivity, and understand how turtles use 		different areas of the Red Sea, see <a href="https://www.academia.edu/39876895/African_Sea_Turtle_Newsletter">this publication</a>.
        </li>
        <li>
		Photo-ID data from the Red Sea have also shown that turtles photographed in 		Egyptian feeding areas are <a href="https://iotn.org/iotn38-02-combined-photo-identification-and-flipper-tagging-of-green-turtles-identify-connections-between-egyptian-red-sea-feeding-areas-and-a-key-nesting-area-in-saudi-arabia/">connected to important nesting sites</a> in Saudi Arabia, highlighting how conservation efforts must consider movements across national boundaries.
        </li>
        <li>
		Another important way photo-ID is used by the TurtleWatch Egypt 2.0 team is 		to <a href="https://doi.org/10.2744/CCB-1665.1">track injuries and recovery in individual turtles</a>. By repeatedly identifying the same individuals over time, researchers can assess how often turtles are injured by human activities and whether and how they are able to recover, providing key information for conservation and management in the Red Sea.
        </li>
        <li>
		These findings contribute to the broader scientific knowledge of sea turtles 		in the region, including <a href="https://link.springer.com/chapter/10.1007/978-3-662-45201-1_31">species distribution, ecology, and threats in the 		Red Sea</a>.
        </li>
	<li>
		The matching challenges in TurtleTurtle-RedSea reflect the same principles used by scientists and are aligned with <a href="https://www.researchgate.net/profile/Kostas-Papafitsoros/publication/388909753_Sea_Turtle_Photo_Identification_A_Practical_Guide/links/67ac5e81645ef274a47b0593/Sea-Turtle-Photo-Identification-A-Practical-Guide.pdf">best practices in sea turtle photo-identification</a>.
	</li>
	<li>
	Difficulty levels in the game are based on image quality, head orientation, and species-specific characteristics. Green turtles generally have facial profiles that are easier to match, while hawksbill turtles show lower variability, making identification more challenging. This variability is deliberately included in the game to reflect real-world research conditions.<\br>
By playing TurtleTurtle-RedSea, you are learning the same skills scientists use to study and protect sea turtles in the wild, and helping spread awareness about their conservation in the Red Sea.
	</li>
    </ul>
    <p><br /></p>
</Splash>
<ButtonBox>
    <Button url="/" style="orange">Home</Button>
    <Button url="/about">About</Button>
    <Button url="/about/credits">Credits</Button>
    <Button url="https://www.turtleturtle.fun">Zakynthos Edition</Button>
    <Button url="mailto:turtlewatchegypt@gmail.com?subject=TurtleTurtle-RedSea"
        >Contact</Button
    >
</ButtonBox>
