<!-- 弹窗组件 -->

<template>
  <div class="dialog-wrapper" :style="style" v-show="visible">
    <div class="dialog">
      <div class="dialog-title">{{ title }}</div>
      <div class="dialog-content">
        <slot name="content"></slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jy-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题'
    },
    width: {
      type: String,
      default: '50%'
    }
  },
  computed: {
    style() {

    },
  },
  methods: {

  }
}
</script>

<style scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(202, 206, 208, 0.6);
}

.dialog {
  margin: 15vh auto 0 auto;
  width: 50%;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.dialog-title {
  font-size: 18px;
  padding: 20px 20px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.3);
}

.dialog-content {
  width: 100%;
  min-height: 8em;
  padding: 30px 20px;
  box-sizing: border-box;
  color: #606266;
  font-size: 16px;
  word-break: break-all;
  position: relative;
}

.dialog-footer {
  padding: 10px 20px 20px;
  text-align: right;
  box-sizing: border-box;
}

.dialog-btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.dialog-submit {
  color: #fff;
  background-color: #3eaf7c;
  border-color: #3eaf7c;
}

.dialog-submit:hover {
  background: #61b991;
  border-color: #61b991;
  color: #fff;
}

.dialog-close:hover {
  color: #3eaf7c;
  border-color: #61b991;
  background-color: #ecf5ff;
}
</style>
