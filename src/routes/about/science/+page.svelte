<script lang="ts">
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import Splash from '$lib/comps/utils/Splash.svelte'

</script>

<Splash>
    <h2>The Science</h2>
    <p>
        There are plenty of published scientific works as well as sea turtle
        conservation efforts associated with the game:
    </p>
    <ul>
        <li>
            Our sea turtle photo-database from Zakynthos Island, where all the
            photos are taken, spans 25 years, and is one of the oldest (if
            not the oldest) sea turtle photo-database of this kind worldwide. It
            has supported many studies, from <a
                href="https://esajournals.onlinelibrary.wiley.com/doi/abs/10.1002/ecy.3027"
                target="_blank">estimating survival rates</a
            >,
            <a
                href="https://www.int-res.com/abstracts/meps/v575/meps12193"
                target="_blank"
                >studying in-water sea turtle behaviour in cleaning stations</a
            >, and
            <a
                href="https://www.sciencedirect.com/science/article/pii/S0003347222001312"
                target="_blank">aggressive interactions in foraging grounds</a
            >, to
            <a
                href="https://zslpublications.onlinelibrary.wiley.com/doi/full/10.1111/acv.12656"
                target="_blank">quantifying ecotouristic pressure</a
            >
            and
            <a
                href="https://www.sciencedirect.com/science/article/pii/S0304380022003210"
                target="_blank">measure its evolution over time</a
            >.
        </li>
        <li>
            We are developing state-of-the-art automated photo-ID methods (<a
                href="https://openaccess.thecvf.com/content/WACV2024/html/Cermak_WildlifeDatasets_An_Open-Source_Toolkit_for_Animal_Re-Identification_WACV_2024_paper.html"
                target="_blank">MegaDescriptor</a
            >). We have also developed the
            <a
                href="https://wildlifedatasets.github.io/wildlife-datasets"
                target="_blank">WildlifeDatasets</a
            > library which is a constantly updated library providing easy access
            to multi-species photo-databases for algorithmic training and testing.
        </li>
        <li>
            Our published dataset <a
                href="https://openaccess.thecvf.com/content/WACV2024/html/Adam_SeaTurtleID2022_A_Long-Span_Dataset_for_Reliable_Sea_Turtle_Re-Identification_WACV_2024_paper.html"
                target="_blank">SeaTurtleID2022</a
            >, on which this game is largely based on, is the first public
            large-scale, long-span dataset with sea turtle photographs captured
            in the wild (Zakynthos Island). It contains 8729 photographs of 438
            unique individuals collected within 13 years, making it the
            longest-spanned dataset for animal re-identification.
        </li>
        <li>
            Recently, we conducted a <a
                href="https://www.sciencedirect.com/science/article/pii/S1574954125001670"
                target="_blank">breakthrough study</a
            > in sea turtle Photo-ID: We quantified for the first time the inherent
            similarity between the left and the right facial profiles in three sea
            turtle species. In particular we showed that the similarity of the left
            and right profiles of the same individuals is higher than those of different
            individuals. This similarity can be detected and quantified by state-of-the-art
            artificial intelligence-based photo-ID methods, including MegaDescriptor.
            As a result one can now match opposite profile photos of the same individual
            which was so far not possible with the current sea turtle photo-ID practices,
            either manual or automatic. This also leads to increased photo-ID accuracies
            and flexibility in photo-ID data collection protocols as very often in
            practice only a single facial profile is available. Can you also match
            opposite profiles of the same individuals? Try it on the high difficulty
            levels of our game!
        </li>
        <li>
            Finally, we have published some general <a
                href="https://www.researchgate.net/profile/Kostas-Papafitsoros/publication/388909753_Sea_Turtle_Photo_Identification_A_Practical_Guide/links/67ac5e81645ef274a47b0593/Sea-Turtle-Photo-Identification-A-Practical-Guide.pdf"
                target="_blank">practical guidelines for sea turtle photo-ID</a
            > as part of the upcoming Manual on “Research and Management Techniques
            for the Conservation of Sea Turtles”, by the&nbsp;IUCN/SSC Marine Turtle
            Specialist Group.
        </li>
    </ul>
    <p><br /></p>
</Splash>
<ButtonBox>
    <Button url="/" style="orange">Home</Button>
    <Button url="/about">About</Button>
    <Button url="/about/credits">Credits</Button>
    <Button url="mailto:k.papafitsoros@qmul.ac.uk?subject=TurtleTurtle"
    >Contact</Button
>
</ButtonBox>
