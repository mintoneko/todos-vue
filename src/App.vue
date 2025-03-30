<script setup>
import { ref, reactive, computed, nextTick } from 'vue';
import { watchEffect } from 'vue'

// 1.处理列表显示数据（添加本地存储逻辑）
const todos = reactive(JSON.parse(localStorage.getItem('todos')) || [
  { id: 0, title: '测试内容1', completed: true, editing: false },
  { id: 1, title: '测试内容2', completed: false, editing: false }
])

function toogleAll(e) {
  todos.forEach(todo => {
    todo.completed = e.target.checked;
  })
}
// e是复选框时间，e.target.checked获取复选框的当前选中状态

// 2.处理路由
const visibility = ref('all');
function onHashChange() {
  const hash = window.location.hash.replace('#/', ''); // 直接移除#/前缀
  // console.log(hash);
  if (['all', 'active', 'completed'].includes(hash)) {
    visibility.value = hash;
    // 在js中使用visibility的时候要用value，es6特性
  }
  else {
    window.location.hash = "#/all";
    visibility.value = 'all';
  }
  // 重定向到#/all
}
window.addEventListener('hashchange', onHashChange); // hashchange是浏览器原生事件

// 3.处理过滤
const filteredTodos = computed(() => {
  switch (visibility.value) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
    // js数组方法，等效于：
    // function(todo) { return todo.completed === false; }
  }
})
// 将计算属性替换之前的todos，代以filteredTodos
onHashChange();
// 初始化的时候调用一次，防止刷新后路由丢失->原理是刷新的时候是根据原来的url，改计算属性根据url设置visibility，来处理过滤等操作

// 4.处理左下角的计算剩余值
const remaining = computed(() => {
  return todos.filter(todo => !todo.completed).length;
})

// 5.处理新增
function addTodo(e) {
  const title = e.target.value.trim();
  if (title) {
    if (todos.some(todo => todo.title === title)) {
      alert('该todo已存在');
      e.target.value = '';
      return;
    }
    // some()、find()、for...of、findIndex()等遍历方法
    const newTodo = {
      id: todos.length,
      title,
      completed: false,
      editing: false
    }
    todos.push(newTodo);
    e.target.value = '';
  }
  // e是原生DOM事件对象，类型为Event，e.target指向触发事件的元素，即input元素
}

// 6.处理清除
function clearCompleted() {
  // console.log("here");
  todos.splice(0, todos.length, ...todos.filter(todo => !todo.completed));
  // ...: 扩展运算符展开过滤后的新数组；拓展展开防止一个引用的数组对象被传递；区分添加一整个数组对象和添加数组对象的元素
}
// 想要value替换掉todos需要改为ref，这里涉及vue的两种响应式数据类型

// 7.处理删除
function removeTodo(todo) {
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
}
// v-for故每个li对应一个todo对象，所以click能够传递

// 8.处理left或lefts
const left = computed(() => {
  return remaining.value > 1 ? 'lefts' : 'left';
})
// vscode折叠快捷键：部分折叠->command+option+[ 全部折叠->command+k command+0

// 9.处理展开
const showFooter = computed(() => {
  return todos.length > 0;
})

// 10.处理数据持久化
watchEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
})
// 借用watchEffect的副作用函数，监听todos的变化，自动更新localStorage


// 11.处理编辑
const oneEditing = ref(false); // 只允许一个todo处于编辑状态
const editingTodo = ref(null);
let originalTitle = '';

function editTodo(todo) {
  if (oneEditing.value) {
    alert('请先完成当前编辑');
    return;
  }
  oneEditing.value = true;
  editingTodo.value = todo;
  originalTitle = todo.title;
  todo.editing = true;

  // 添加nextTick确保DOM更新后执行：这里设计更深度的vue异步更新知识
  nextTick(() => {
    const input = document.querySelector('.edit[autofocus]');
    input?.focus();
  });
}

function doneEdit(todo) {
  if (!editingTodo.value) return;
  const title = todo.title.trim();
  if (title) {
    if (todos.some(item => item.title === title && item !== todo)) {
      alert('该todo已存在');
      todo.title = originalTitle;
    }
  } else {
    removeTodo(todo);
  }
  oneEditing.value = false;
  editingTodo.value = null;
  originalTitle = '';
  todo.editing = false;
}

function cancelEdit(todo) {
  todo.title = originalTitle;
  oneEditing.value = false;
  editingTodo.value = null;
  originalTitle = '';
  todo.editing = false;
}
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input @keyup.enter="addTodo" class="new-todo" placeholder="What needs to be done?" autofocus>
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" @click="toogleAll">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed, editing: todo.editing }">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" v-model="todo.title" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)"
            @blur="doneEdit(todo)" v-if="todo.editing" autofocus>
          <!-- 需要与todo绑定，用全局editing会渲染实效 -->
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="showFooter">
      <span class="todo-count"><strong>{{ remaining }}</strong> item {{ left }}</span>
      <ul class="filters">
        <li>
          <a :class="{ selected: visibility == 'all' }" href="#/all">All</a>
        </li>
        <li>
          <a :class="{ selected: visibility == 'active' }" href="#/active">Active</a>
        </li>
        <li>
          <a :class="{ selected: visibility == 'completed' }" href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="clearCompleted">Clear completed</button>
    </footer>
  </section>
</template>

<style scoped></style>