<script setup>
import { ref, reactive, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
const currentDate = new Date();
const weekdays = ref(['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'])
</script>

<template>
  <div class="date">
    <h1>hello world</h1>
    <RouterLink v-for="(weekday, index) in weekdays" :key="index" :to="{
      name: 'weekday',
      params: { id: index }
    }">
      {{ weekday }} |
    </RouterLink>
    <RouterView />
  </div>
</template>


<style scoped>
.date {
  color: red;
  font-size: 20px;
  text-align: center;
}

.weekday-active {
  color: red;
  text-align: center;
}

a {
  text-decoration: none;
}
</style>
<!-- 导包的时候^符号表示允许安装同一主版本号下的最新次要版本和补丁版本。例如，^3.5.13允许安装3.5.13以上的3.x.x版本，但不会升级到4.0.0。 -->