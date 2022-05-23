<!-- 测验组件 -->

<template>
  <div class="class-test-wrapper">
    <button type="button" class="class-test-start" @click="startClassTest">开始测验</button>
    <jy-dialog :visible="dialogVisible">
      <div slot="content">
        <jy-stamp :show-stamp="isShowStamp"></jy-stamp>
      </div>
      <span slot="footer">
          <button type="button" class="dialog-btn dialog-submit" @click="dialogSubmit">确定</button>
          <button type="button" class="dialog-btn dialog-close" @click="dialogClose">取消</button>
      </span>
    </jy-dialog>
  </div>
</template>

<script>
// dialog弹窗
import jyDialog from './jy-dialog'
// 盖章插件
import jyStamp from './jy-stamp'

export default {
  name: "jy-class-test",
  components: {
    jyDialog,
    jyStamp
  },
  data() {
    return {
      // 是否显示盖章
      isShowStamp: false,
      // 是否显示dialog弹窗
      dialogVisible: false,
    }
  },
  methods: {
    startClassTest() {
      this.dialogVisible = true;
    },
    dialogSubmit() {
      this.isShowStamp = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    }
  }
}
</script>

<style scoped>
.class-test-start {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.8rem 1.6rem;
  border: 1px solid #3eaf7c;
  border-radius: 4px;
  transition: background-color .1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid #389d70;
  cursor: pointer;
}

.class-test-start:hover {
  background-color: #4abf8a;
}

.class-test-start:active {
  background-color: #3eaf7c;
}
</style>
