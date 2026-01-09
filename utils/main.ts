import { parse } from 'jsr:@std/csv'
import { walk } from 'https://deno.land/std@0.170.0/fs/walk.ts'
import 'jsr:@std/dotenv/load'
import moment from 'moment'
import PocketBase from 'pocketbase'
import type { Pair, ImageType, GameType } from '../src/lib/types.ts'
import { randomIntFromInterval, delay } from '../src/lib/funcs.ts'

// Image quality threshold
const threshold = 150

let min = 10
let max = 0

// game difficulty weights
const weights = {
    date: 1,
    orientation: 2,
    clarity: 1,
    species: 10,
}

// diffculty thresholds
const scoreThresholds = {
    easy: 0,
    med: 7,
    hard: 9,
    vHard: 11,
}

const idSerperator = '~'

// Set up pocketbase instance (See env)
const pb = new PocketBase(Deno.env.get('POCKET_URL'))
let count = 0

// Login into Pocketbase (See env)
const authData = await pb
    .collection('_superusers')
    .authWithPassword(
        Deno.env.get('POCKET_USER') || 'test',
        Deno.env.get('POCKET_PASS') || 'test'
    )

const idParser = (string: string) => {
    return string
        .replaceAll('.jpg', '')
        .replaceAll('.jpeg', '')
        .replaceAll('.webp', '')
        .replaceAll('_', '')
        .replaceAll('-', '')
        .toLowerCase()
}

// This Function uploads all turtle to the pocketbase
const uploadTurtles = async (location: string) => {
    // construct a list of folders that have hero images
    let heroFolders: string[] = []
    for await (const walkEntry of walk(location + '/poster')) {
        const type = walkEntry.isSymlink
            ? 'symlink'
            : walkEntry.isFile
              ? 'file'
              : 'directory'

        if (type == 'directory') {
            heroFolders.push(walkEntry.path)
        }
    }

    // construct an array of stories
    let storyArray: {
        id: string
        stories: string[]
    }[] = []
    for await (const walkEntry of walk(location + '/stories')) {
        const type = walkEntry.isSymlink
            ? 'symlink'
            : walkEntry.isFile
              ? 'file'
              : 'directory'

        if (type == 'file') {
            let story = {
                id: walkEntry.name,
                // must be TXT FILES!!!!
                // splits on line break
                stories: (await Deno.readTextFile(walkEntry.path))
                    .split('\n')
                    .filter((item) => item),
            }
            storyArray.push(story)
        }
    }

    // get current Records for update/create
    const currentRecords = await pb.collection('turtles').getFullList({})

    // just their IDs
    const currentRecordIds = currentRecords.map((record) => {
        return record.id
    })

    // parse csv file for all turtles to upload
    const data = parse(await Deno.readTextFile(location + '/idNames.csv'), {
        columns: ['id', 'name'],
    })

    // construct data to upload for each csv entry
    for (let x = 0; x < data.length; x++) {
        console.log('TURTLE UPLOAD: ', x, '/', data.length)

        const file = {
            id: data[x].id,
            stories: [] as string[],
            name: data[x].name,
            hero: [] as Blob[],
        }

        // checks if there are hero images to upload
        for (const folder of heroFolders) {
            if (folder.includes(file.id)) {
                for await (const walkEntry of walk(folder)) {
                    const type = walkEntry.isSymlink
                        ? 'symlink'
                        : walkEntry.isFile
                          ? 'file'
                          : 'directory'
                    if (type == 'file') {
                        const data = await Deno.readFile(walkEntry.path)
                        const blob = new Blob([data])
                        file.hero.push(blob)
                    }
                }
            }
        }

        // checks if there are stories  to upload
        for (const storyItem of storyArray) {
            if (storyItem.id.includes(file.id)) {
                file.stories = storyItem.stories
            }
        }

        // Check if this is new or an update
        if (currentRecordIds.includes(file.id)) {
            // updates each exisitng record
            try {
                const response = await pb
                    .collection('turtles')
                    .update(file.id, file, { $autoCancel: false })
            } catch (error) {
                console.log(error)
            }
        } else {
            //uploads new record to pocket base
            try {
                const response = await pb
                    .collection('turtles')
                    .create(file, { $autoCancel: false })
            } catch (error) {
                console.log(error)
            }
        }

        // Delay becuase Pocketbase was struggling
        await delay(100)
    }
}

// This Function uploads all images to the pocketbase
const uploadPictures = async (location: string) => {
    // For logging
    let imagesSent = 0
    let imagesRegected = 0

    // Grab CSV data
    const data = parse(await Deno.readTextFile(location + '/metaData.csv'), {
        skipFirstRow: true,
        strip: true,
    })

    // Loop over data
    for (let x = 0; x < data.length; x++) {
        console.log('IMAGE UPLOAD: ', x, '/', data.length)

        const thisData = data[x]
        try {
            const imageData = await Deno.readFile(
                location + `/heads/${thisData.path}`
            )
            const blob = new Blob([imageData])
            var regex = new RegExp(/^[a-z0-9]+$/)
            let oldId = idParser(thisData.path)
            let id = undefined
            if (regex.test(oldId)) {
                id = oldId
            }
            // construct the file to be uploaded
            const file = {
                id: id,
                turtle: thisData.identity,
                image_num: Number.parseFloat(thisData.image_id) || null,
                taken: thisData.date,
                orientation: thisData.orientation,
                clarity: Number.parseFloat(thisData.clarity),
                width: Number.parseFloat(thisData.width),
                height: Number.parseFloat(thisData.height),
                image: blob,
                old_Name: oldId,
            }

            if (file.width > threshold && file.height > threshold) {
                try {
                    const response = await pb
                        .collection('images')
                        .create(file, { $autoCancel: false })
                } catch (error) {
                    console.log(error)
                }

                imagesSent++
                await delay(100)
            } else {
                imagesRegected++
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const uploadNewData = async () => {
    // EDIT THIS Location to your data in Archive
    const folder = 'ArchiveSea/data'
    // Folder Layout
    // - Folder Name
    //      - metadata.csv
    //      - idNames.csv
    //      - data
    //          - heads
    //              - name.jpg ...
    //          - poster
    //              - Turtle Id ...
    //                  - name.jpg ...
    //          - stories
    //              - TurtleId.txt ... (seperate multiple statements with line breaks)

    await uploadTurtles(folder)

    await uploadPictures(folder)
}

const genHash = (ids: string[]) => {
    let string = ''

    ids = ids.sort(function (a, b) {
        return ('' + a).localeCompare(b)
    })

    for (let x = 0; x < ids.length; x++) {
        string += ids[x]
        if (x < ids.length - 1) {
            string += idSerperator
        }
    }

    return string
}

const generateScore = (imageA: ImageType, imageB: ImageType) => {
    // GameDifficultyScore =
    // YearDif * YearWeight +
    // ProfileDif * ProfileWeight +
    // EnvDif * EnvWeight +
    // ((ClarityOne + ClarityTwo) * ClarityWeight) / 2

    // Date score
    let dateScore = 0

    let dateDiffernce = 0

    // work around for no date
    if (imageA.taken && imageB.taken) {
        if (imageA.taken.length == 10 && imageB.taken.length == 10) {
            dateDiffernce = Math.abs(
                moment(imageA.taken, 'YYYY-MM-DD').diff(
                    moment(imageB.taken, 'YYYY-MM-DD'),
                    'day',
                    true
                )
            )
        } else {
            if (imageA.taken == imageB.taken) {
                dateDiffernce = 0
            } else {
                dateDiffernce = 30
            }
        }
    } else {
        dateDiffernce = 30
    }

    if (dateDiffernce == 0) {
        // Same day
        dateScore = 1
    } else if (dateDiffernce < 30) {
        // Same month
        dateScore = 2
    } else if (dateDiffernce < 365) {
        // Same year
        dateScore = 3
    } else {
        // Other
        dateScore = 4
    }

    // Orientation score
    let orientationScore = 0
    if (imageA.orientation == imageB.orientation) {
        // Same Orientation
        orientationScore = 1
    } else {
        // Differemt Orientation
        orientationScore = 2
    }
    if (
        imageA.orientation.includes('top') ||
        imageB.orientation.includes('top')
    ) {
        // add 1 to score for 'top'
        orientationScore++
    }
    if (
        imageA.orientation.includes('front') ||
        imageB.orientation.includes('front')
    ) {
        // add 2 to score for 'front'
        orientationScore++
        orientationScore++
    }

    let speciesScore = 0
    if (imageA.species == 'EI' || imageB.species == 'EI') {
        speciesScore = 1
    }

    // Clarity Score
    const clarityScore = (imageA.clarity + imageB.clarity) / 2

    // Score
    return (
        dateScore * weights.date +
        orientationScore * weights.orientation +
        clarityScore * weights.clarity +
        speciesScore * weights.species
    )
}

const generatePairs = async () => {
    const pairs = {
        meta: {
            total: 0,
            totalEasy: 0,
            totalMed: 0,
            totalHard: 0,
            totalVHard: 0,
            splits: {
                easy: 0,
                med: scoreThresholds.med,
                hard: scoreThresholds.hard,
                vHard: scoreThresholds.vHard,
            },
        },
        easy: [] as Pair[],
        med: [] as Pair[],
        hard: [] as Pair[],
        vHard: [] as Pair[],
    }

    // Grab image data
    let allImageData = parse(
        await Deno.readTextFile('ArchiveSea/data/metadata.csv'),
        {
            skipFirstRow: true,
            strip: true,
        }
    )

    // Grab turtle data
    const allTurtleData = parse(
        await Deno.readTextFile('ArchiveSea/data/idNames.csv'),
        {
            columns: ['id', 'name'],
        }
    )

    const parsedAllImageData: ImageType[] = allImageData.map((image) => {
        let imageObj = {
            id: idParser(image.path),
            turtle: image.identity,
            image_id: parseInt(image.image_id),
            taken: image.date,
            orientation: image.orientation,
            clarity: parseInt(image.clarity),
            width: parseInt(image.width),
            height: parseInt(image.height),
            image: image.path,
            species: image.Species ? image.Species : undefined,
            name: allTurtleData.find((turtle) => {
                return turtle.id == image.identity
            })?.name,
        }
        return imageObj
    })

    const maxPairs = 0
    const tempPairs: string[] = []

    allTurtleData.forEach((turtle) => {
        // filter array for turtles that have pics and pics that are bigger then the threshold
        const imageArray = parsedAllImageData.filter((imageData) => {
            return (
                turtle.id == imageData.turtle &&
                imageData.width > threshold &&
                imageData.height > threshold
            )
        })
        if (imageArray.length > 0) {
            imageArray.forEach((image) => {
                const thisImage = image
                imageArray.forEach((otherImg) => {
                    // Unique hash for filtering
                    const uniqueHash = genHash([thisImage.id, otherImg.id])

                    // Check we don't allready have this pair and that its not the same image
                    if (
                        thisImage.id != otherImg.id &&
                        !tempPairs.includes(uniqueHash)
                    ) {
                        // Gen Scores
                        const score = generateScore(thisImage, otherImg)

                        //For debugging Weights
                        if (score < min) {
                            min = score
                        }
                        if (score > max) {
                            max = score
                        }

                        // create pair object
                        let pair = {
                            images: [thisImage, otherImg],
                            difficulty: score,
                            id: uniqueHash,
                            difficultyType: 'random',
                        } as Pair

                        // filter to correct pair hardness
                        if (score > scoreThresholds.vHard) {
                            pair.difficultyType = 'vHard'
                            pairs.vHard.push(pair)
                            pairs.meta.totalVHard++
                        } else if (score > scoreThresholds.hard) {
                            pair.difficultyType = 'hard'

                            pairs.hard.push(pair)
                            pairs.meta.totalHard++
                        } else if (score > scoreThresholds.med) {
                            pair.difficultyType = 'med'

                            pairs.med.push(pair)
                            pairs.meta.totalMed++
                        } else {
                            pair.difficultyType = 'easy'
                            pairs.easy.push(pair)
                            pairs.meta.totalEasy++
                        }

                        // push hash into temp array for checking
                        tempPairs.push(uniqueHash)
                        pairs.meta.total++
                        // console.log('added: ', uniqueHash)
                    } else {
                        // console.log('ignored: ', uniqueHash)
                    }
                })
            })
        }
    })
    console.log('Max: ', maxPairs, 'Min: ', min, 'Max: ', max)
    console.log(pairs.meta)
    const file = await Deno.writeTextFile(
        'allPairs.json',
        JSON.stringify(pairs, null, 2)
    )
}

// Checks that random image is not also one of the pairs
const checkDups = (game: GameType) => {
    // Get random image Id & Turtle
    const randomId = game.random.id
    const randomTurtle = game.random.turtle

    const otherIds = game.pairs.map((thisPair: Pair) => {
        return thisPair.id.split(idSerperator)
    })
    const otherTurtles = game.pairs.map((thisPair: Pair) => {
        return thisPair.images[0].turtle
    })

    const allIds = [...new Set([randomId, ...otherIds.flat(1)])]
    const allTurtles = [...new Set([randomTurtle, ...otherTurtles])]

    if (allIds.length < 9 || allTurtles.length < 5) {
        return false
    }

    // Retruns true if not found
    return allIds
}

const generateGames = async () => {
    // Games to Generate
    const maxGames = 2000

    // Hard Break if searches are failing
    let maxDepthSearch = 3000

    //Incrimentar for first difficulty select
    let difficultyInc = 0

    // Array for all Games
    let games: GameType[] = []
    const difficulties = ['easy', 'med', 'hard', 'vHard']

    // Grab pair data
    const allPairData = JSON.parse(await Deno.readTextFile('allPairs.json'))

    const allNamedPairs = {
        easy: allPairData.easy.filter((pair: Pair) => {
            return pair.images[0].name
        }) as Pair[],
        med: allPairData.med.filter((pair: Pair) => {
            return pair.images[0].name
        }) as Pair[],
        hard: allPairData.hard.filter((pair: Pair) => {
            return pair.images[0].name
        }) as Pair[],
        vHard: allPairData.vHard.filter((pair: Pair) => {
            return pair.images[0].name
        }) as Pair[],
    }

    for (let x = 0; x < maxGames; ) {
        let first = true

        // Construct game with a random red herring
        let game: GameType = {
            pairs: [],
            random: allPairData[
                difficulties[difficultyInc % difficulties.length]
            ][
                randomIntFromInterval(
                    0,
                    allPairData[
                        difficulties[difficultyInc % difficulties.length]
                    ].length - 1
                )
            ].images[0],
            ids: [],
            id: '',
        }

        //Loop over each level
        for (
            let y = difficultyInc;
            y < difficultyInc + difficulties.length;
            y++
        ) {
            // Rotate the difficulty array to search in
            const difficultyLevel = difficulties[y % difficulties.length] as
                | 'easy'
                | 'med'
                | 'hard'
                | 'vHard'

            let diffcultyPairs = allPairData[difficultyLevel]

            // If first make sure there is a named nurtle
            if (first) {
                diffcultyPairs = allNamedPairs[difficultyLevel]
                first = false
            }

            // Assign a random pair
            const thisPair =
                diffcultyPairs[
                    randomIntFromInterval(0, diffcultyPairs.length - 1)
                ]

            if (thisPair === undefined) {
                console.log('THIS PAIR IS UNDEFINED, You probs messed up')
            }

            game.pairs.push(thisPair)
        }
        difficultyInc++

        // If game passes check, add it to Array
        if (game.pairs.length == 4 && checkDups(game)) {
            game.ids = checkDups(game) as string[]
            game.id = game.ids.join(idSerperator)
            games.push(game)
            x++
        }

        // Decriment max for hard stop
        maxDepthSearch--
        if (maxDepthSearch % (maxGames / 10) == 0) {
            console.log(' ATTEMPTS REMAINING: ', maxDepthSearch)
        }
        // Break if hard stop is reached
        if (maxDepthSearch < 0) {
            break
        }
    }

    console.log('TOTAL GAMES: ', games.length)
    const file = await Deno.writeTextFile(
        '../src/lib/gameData/allGames.json',
        JSON.stringify(games, null, 2)
    )

    const specGames = {
        easy: [],
        med: [],
        hard: [],
        vHard: [],
    }

    for (let z = 0; z < difficulties.length; z++) {
        maxDepthSearch = 2000
        const difficultyLevel = difficulties[z]
        console.log(difficultyLevel)
        for (let x = 0; x < maxGames; ) {
            let first = true

            // Construct game with a random red herring
            let game: GameType = {
                pairs: [],
                random: allPairData[
                    difficulties[difficultyInc % difficulties.length]
                ][
                    randomIntFromInterval(
                        0,
                        allPairData[
                            difficulties[difficultyInc % difficulties.length]
                        ].length - 1
                    )
                ].images[0],
                ids: [],
                id: '',
            }

            //Loop over each level
            for (let y = 0; y < 4; y++) {
                // Rotate the difficulty array to search in

                let diffcultyPairs = allPairData[difficultyLevel]

                // If first make sure there is a named nurtle
                if (first) {
                    diffcultyPairs = allNamedPairs[difficultyLevel]
                    first = false
                }

                // Assign a random pair
                const thisPair =
                    diffcultyPairs[
                        randomIntFromInterval(0, diffcultyPairs.length - 1)
                    ]

                if (thisPair === undefined) {
                    console.log('THIS PAIR IS UNDEFINED, You probs messed up')
                }

                game.pairs.push(thisPair)
            }

            // If game passes check, add it to Array
            if (game.pairs.length == 4 && checkDups(game)) {
                game.ids = checkDups(game) as string[]
                game.id = game.ids.join(idSerperator)
                specGames[difficultyLevel].push(game)
                // console.log(
                //     difficultyLevel,
                //     (game.pairs[0].difficulty +
                //         game.pairs[0].difficulty +
                //         game.pairs[0].difficulty +
                //         game.pairs[0].difficulty) /
                //         4
                // )
                x++
            }

            // Decriment max for hard stop
            maxDepthSearch--
            if (maxDepthSearch % (maxGames / 10) == 0) {
                console.log(' ATTEMPTS REMAINING: ', maxDepthSearch)
            }
            // Break if hard stop is reached
            if (maxDepthSearch < 0) {
                break
            }
        }

        console.log(
            `TOTAL ${difficultyLevel} GAMES: `,
            specGames[difficultyLevel].length
        )
        const file = await Deno.writeTextFile(
            `../src/lib/gameData/all${difficultyLevel}Games.json`,
            JSON.stringify(specGames[difficultyLevel], null, 2)
        )
    }
}

// DO NOT USE - > see uploadNewData
const turtleUpdate = async () => {
    // construct a list of folders that have hero images
    let updates: any[] = []
    for await (const walkEntry of walk('Archive/stories')) {
        const type = walkEntry.isSymlink
            ? 'symlink'
            : walkEntry.isFile
              ? 'file'
              : 'directory'

        if (type == 'file') {
            let update = {
                id: walkEntry.name.split('-')[0],
                // must be TXT FILES!!!!
                // splits on line break
                stories: (await Deno.readTextFile(walkEntry.path))
                    .split('\n')
                    .filter((item) => item),
            }
            updates.push(update)
        }
    }

    // updates each entry with a story
    for (let update of updates) {
        try {
            console.log(update.stories)
            const response = await pb.collection('turtles').update(
                update.id,
                {
                    stories: update.stories,
                },
                { $autoCancel: false }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

if (import.meta.main) {
    await uploadNewData()

    // // upload turtle info
    // await uploadTurtles()

    // // upload imageset
    // await uploadPictures()

    // // make Pairs (takes along time...)
    await generatePairs()

    // // make a set of games from the pairs
    await generateGames()

    // //updat turtles with stories
    // await turtleUpdate()
}
