import { defineStore } from 'pinia'
import { ref } from 'vue'

const currentDate = new Date().getDay()

export const useTodoStore = defineStore(
  'todo',
  () => {
    const id = ref(currentDate.toString())
    return { id }
  },
  {
    persist: true,
  },
)
