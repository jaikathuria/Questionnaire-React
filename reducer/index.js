import {combineReducers} from 'redux'

const decks = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_DECKS':
            return action.data
        case 'ADD_DECK':
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case 'ADD_CARD':
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: state[action.title].questions.concat(action.card)
                }
            }
        default:
            return state
    }
}


const quizInitState = {
    title: null,
    total: null,
    current: null,
    correct: null,
    incorrect: null,
    skipped: null,
    questions: [],
}

const quiz = (state = quizInitState,action) => {
    switch (action.type) {
        case 'START_QUIZ':
            return {
                ...state,
                questions: action.deck.questions,
                title: action.deck.title,
                total: action.deck.questions.length,
                current: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,
            }
        case 'CORRECT':
            return {
                ...state,
                correct: state.correct + 1,
                current: state.current + 1,
            }
        case 'INCORRECT':
            return {
                ...state,
                incorrect: state.incorrect + 1,
                current: state.current + 1,
            }
        case 'SKIPPED':
            return {
                ...state,
                skipped: state.skipped + 1,
                current: state.current + 1,
            }
        case 'RESTART':
            return {
                ...state,
                current: 0,
                correct: 0,
                incorrect: 0,
                skipped: 0,
            }
        case 'END_QUIZ':
            return quizInitState
        default:
            return state
    }
}
export default combineReducers({
    decks,
    quiz
})