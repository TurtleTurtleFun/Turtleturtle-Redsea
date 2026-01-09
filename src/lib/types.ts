// Types go here

export type GameState = {}

// Image Type
export type ImageType = {
    id: string
    turtle: string
    image_id: number
    taken: string
    orientation: string
    clarity: number
    width: number
    height: number
    image: string
    name: string | undefined
    species?: string | undefined
}

// Pair Type
export type Pair = {
    id: string
    images: ImageType[]
    difficulty: number
    difficultyType: 'easy' | 'med' | 'hard' | 'vHard' | 'random'
}

export type difficultyType = 'easy' | 'med' | 'hard' | 'vHard' | undefined

export type ImageCSVData = {
    image_id: number
    identity: string
    path: string
    date: string
    orientation: string
    clarity: number
    width: number
    height: number
}

export type GameType = {
    pairs: Pair[]
    random: ImageType
    ids: string[]
    id: string
}

export type GameData = {
    rawIds: string[]
    images: PocketImageRecord
}

export type PocketImageRecord = {
    collectionId: string
    collectionName: string
    id: string
    expand: Expand
    image_num: number
    taken: string
    image: string
    orientation: string
    clarity: number
    width: number
    height: number
    created: string
    updated: string
    difficultyType: 'easy' | 'med' | 'hard' | 'vHard' | 'random'
    styleDifficultyType: 'easy' | 'med' | 'hard' | 'vHard' | 'random'
    name: string
    hero: string | null
    story: string | null
}

export type Expand = {
    turtle: PocketTurtleRecord
}

export type PocketTurtleRecord = {
    collectionId: string
    collectionName: string
    id: string
    hero: string[]
    stories: string[]
    name: string
    created: string
    updated: string
}
export type Guess = {
    images: PocketImageRecord[]
    correct: boolean
    timeStamp: string
}

export type completedGameData = {
    playerId: string // Local Storage
    guesses: Guess[]
    imageIds: string[]
    timeStart: string
    timeEnd: string
    solved: boolean
}
