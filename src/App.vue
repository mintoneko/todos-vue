<script setup>
import { useRoute } from 'vue-router'
import { computed, watch } from 'vue'
import Date from '@/components/Date.vue'
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <Date />
  <TodoList />
</template>

<style scoped></style>