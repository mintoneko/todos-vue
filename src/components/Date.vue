<script setup>
import { ref, onMounted } from 'vue'; // 添加生命周期钩子
import { RouterLink, RouterView } from 'vue-router'

const currentDate = new Date();
const weekdays = ref(['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'])

const ch = ref(false);
// 在点按的时候设置hash值，实现页面正确刷新，显示想要的结果
function setHash() {
  window.location.hash = "#/all";
  ch.value = true;
  window.location.reload()
}

// 添加页面刷新监听
onMounted(() => {
  ch.value = true;
  window.addEventListener('beforeunload', () => { })
})
// 处理当前日期是否添加weekday-active类
</script>

<template>
  <div class="date">
    <h1>记录你要做的事情吧</h1>
    <nav class="nav" @click="setHash">
      <RouterLink v-for="(weekday, index) in weekdays" :key="index" :to="{
        name: 'weekday',
        params: { id: index }
      }" :class="{ 'weekday-active': index === currentDate.getDay() && !ch }">
        {{ weekday }}
      </RouterLink>
    </nav>
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

.nav {
  display: flex;
  justify-content: center;
  /* 水平居中->主轴居中 */
  align-items: center;
  /* 垂直居中->交叉轴居中 */
  gap: 15px;
  margin-top: 40px;
}
</style>
<!-- 导包的时候^符号表示允许安装同一主版本号下的最新次要版本和补丁版本。例如，^3.5.13允许安装3.5.13以上的3.x.x版本，但不会升级到4.0.0。 -->