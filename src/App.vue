<script setup>
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import Date from '@/components/Date.vue'
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/store/todo'

// 监听器，监听路由参数变化, 并更新store中的id
const route = useRoute();
watch(() => route.params.id, (newId) => {
  // console.log('Route parameter changed:', newId);
  const store = useTodoStore();
  store.$patch({
    id: newId,
  })
});

</script>

<template>
  <Date />
  <TodoList />
</template>

<style scoped></style>