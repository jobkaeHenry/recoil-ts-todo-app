import {atom,atomFamily,selectorFamily} from 'recoil'
import { filteredTodoListState } from '../TodoList/atom'

export const todoStatisticsModalOpenState = atom<boolean>({
  key: "todoStatisticsModalOpenState",
  default: false
})

export const todoStatistcsState = atomFamily({
  key:"todoStatistcsState",
  default:selectorFamily({
    key:"todoStaticsState/default",
    get: (selectedDate:Date)=>({get})=>{
      const todoList = get(filteredTodoListState(selectedDate))

      return {
        total:todoList.length,
        done : todoList.filter(todo=>todo.done).length || 0
      }
    }
  })
})