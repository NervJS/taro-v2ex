import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [
  thunkMiddleware
]

export default function configStore () {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store
}
