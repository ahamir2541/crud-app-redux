import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'
import testReducer from '../../feature/Testarea/testReducer'
import eventReducer from '../../feature/event/eventReducer'

const rootReducer = combineReducers({
    form : FormReducer,
    test : testReducer,
    events : eventReducer,
})

export default rootReducer