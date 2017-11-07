const FETCH_DECKS = 'FETCH_DECKS'

export const fetchDecks = (decks) => {
    return {
        type: FETCH_DECKS,
        data: decks,
    }
}

const ADD_DECK = 'ADD_DECK'

export const addDeck = (title) => {
    return {
        type: ADD_DECK,
        title
    }
}

const ADD_CARD = 'ADD_CARD'

export const addCard = (title, card) => {
    console.log("Inside Action Title:", title)
    console.log("Inside Action Card:", card)
    return {
        type: ADD_CARD,
        title,
        card,
    }
}