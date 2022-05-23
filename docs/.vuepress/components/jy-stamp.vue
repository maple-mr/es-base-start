<!-- 盖章组件 -->

<template>
  <div class="stamp-wrapper" :class="{loadStamp: showStamp}">
    <div class="stamp-content"></div>
  </div>
</template>

<script>
export default {
  name: "jy-stamp",
  props: {
    // 当前盖章的信息
    stampMsg: {
      type: String,
      default: 'ERROR'
    },
    // 是否显示盖章
    showStamp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      "--stampContent": this.stampMsg,
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.stamp-wrapper {
  width: 9em;
  height: 3em;
  position: absolute;
  right: 6em;
  z-index: 1;
}

.stamp-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.stamp-content::after {
  border: solid 0.1em #d00;
  border-radius: .2em;
  color: #d00;
  content: '80';
  font-size: 50px;
  font-weight: bold;
  line-height: 1;
  opacity: 0;
  position: absolute;
  padding: .1em .5em;
  margin: 0 auto;
  top: 10%;
  right: 10%;
  text-transform: uppercase;
  opacity: 0;
  transform-origin: 50% 50%;
  transform: rotate(-2deg) scale(2);
  transition: all 0.4s cubic-bezier(0.6, 0.04, 0.98, 0.335);
}

.loadStamp .stamp-content::after {
  opacity: .75;
  transform: rotate(-15deg) scale(1);
  z-index: -1;
}
</style>
