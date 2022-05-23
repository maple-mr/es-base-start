<!-- 兼容性表达组件，暂不支持详细信息介绍，仅表达一下当前已支持的浏览器版本 -->

<template>
  <div class="browser-wrapper">
    <div class="browser">
      <table class="browser-content">
        <tr>
          <td colspan="6"><i class="blogfont blog-pc" title="PC端"></i></td>
          <td colspan="6"><i class="blogfont blog-phone" title="移动端"></i></td>
          <td colspan="2"><i class="blogfont blog-server" title="服务器端"></i></td>
        </tr>
        <tr>
          <td><i class="compatible-icon blogfont blog-chrome"></i>Chrome</td>
          <td><i class="compatible-icon blogfont blog-edge"></i>Edge</td>
          <td><i class="compatible-icon blogfont blog-firefox"></i>Firefox</td>
          <td><i class="compatible-icon blogfont blog-ie"></i>Internet Explorer</td>
          <td><i class="compatible-icon blogfont blog-opera"></i>Opera</td>
          <td><i class="compatible-icon blogfont blog-safari"></i>Safari</td>
          <td><i class="compatible-icon blogfont blog-android"></i>WebView Android</td>
          <td><i class="compatible-icon blogfont blog-p-chrome"></i>Chrome Android</td>
          <td><i class="compatible-icon blogfont blog-p-firefox"></i>Firefox for Android</td>
          <td><i class="compatible-icon blogfont blog-p-opera"></i>Opera Android</td>
          <td><i class="compatible-icon blogfont blog-p-safari"></i>Safari on iOS</td>
          <td><i class="compatible-icon blogfont blog-Samsung"></i>Samsung Internet</td>
          <td><i class="compatible-icon blogfont blog-deno"></i>Deno</td>
          <td><i class="compatible-icon blogfont blog-nodejs"></i>Node.js</td>
        </tr>
        <tr>
          <template v-for="(item, index) in versionArr">
            <td :key="index" :class="item.state" v-html="tbData(item)"></td>
          </template>
        </tr>
      </table>
    </div>

    <div class="support-wrapper">
      <div>
        <div class="support full"></div>
        <div class="support-text">支持</div>
      </div>
      <div>
        <div class="support partial"></div>
        <div class="support-text">部分支持</div>
      </div>
      <div>
        <div class="support no"></div>
        <div class="support-text">不支持</div>
      </div>
      <div>
        <div class="support see">
          <i class="blogfont blog-xing"></i>
        </div>
        <div class="support-text">请参阅实施说明</div>
      </div>
      <div>
        <div class="support see">
          <i class="blogfont blog-hongqi"></i>
        </div>
        <div class="support-text">用户必须明确启用此功能</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "jy-browser-compatible",
  props: {
    // 接收上方传进来的版本号支持
    // 存在的版本直接写版本号，不存在则以 - 代替，存在其他特殊符号直接写入html代码，会以插槽的形式插入
    // ['Chrome', 'Edge', 'Fierfox', 'IE', 'Opera', 'Safari', 'Android', 'ChromeAndroid', 'FirefoxAndroid', 'FirefoxAndroid', 'OperaAndroid', 'SafariIOS', 'Samsung', 'Deno', 'Node']
    
    versionArr: {
      type: Array,
      default: () => {
        return new Array(14).fill({
          ver: '-', 
          state: 'full'
        });
      }
    },

    //  
  },

  methods: {
    /**
     * 计算是否存在星符号
     * @param star {String} 是否存在
    */
    isStarSymbol(star) {
      return star?'<i class="blogfont blog-xing"></i>':'';
    },
    /**
     * 计算当前返回的页面数据
    */
    tbData(data) {
      return data.star?this.isStarSymbol(data.star) + data.ver:data.ver;
    }
  },
}
</script>

<style scoped>
.browser-content{
  text-align: center;
}

.support-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.support {
  width: 2em;
  height: 2em;
  display: inline-block;
}

.full {
  background-color: #d0f1de;
}

.partial {
  background-color: #f8cac5;
  background-image: linear-gradient(to bottom right,rgba(144,99,18,.2) 0,rgba(144,99,18,.2) 1px,transparent 0,transparent 67px,rgba(144,99,18,.2) 0,rgba(144,99,18,.2) 73px,transparent 0,transparent 138px,rgba(144,99,18,.2) 0,rgba(144,99,18,.2) 144px,transparent 0);
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 100px 100px;
}

.no {
  background-color: #f8c9ca;
  background-image: linear-gradient(to bottom right,rgba(94,3,6,.1) 0,rgba(94,3,6,.1) 1px,transparent 0,transparent 67px,rgba(94,3,6,.1) 0,rgba(94,3,6,.1) 73px,transparent 0,transparent 138px,rgba(94,3,6,.1) 0,rgba(94,3,6,.1) 144px,transparent 0),linear-gradient(to bottom left,rgba(94,3,6,.1) 0,rgba(94,3,6,.1) 1px,transparent 0,transparent 67px,rgba(94,3,6,.1) 0,rgba(94,3,6,.1) 73px,transparent 0,transparent 138px,rgba(94,3,6,.1) 0,rgba(94,3,6,.1) 144px,transparent 0);
  background-position: 50% 50%,50% 50%;
  background-repeat: no-repeat;
  background-size: 100px 100px,100px 100px;
  font-weight: 700;
}
</style>
