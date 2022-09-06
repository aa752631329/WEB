<template>
  <div class="qingchufudong">
    <div class="container">
      <ul class="container-a">
        <li class="top">
          <span>小米官网</span>
          <span>小米商城</span>
          <span>MIUI</span>
          <span>loT</span>
          <span>云服务</span>
          <span>天星舒克</span>
          <span>油品</span>
          <span>小艾开放平台</span>
          <span>企业团购</span>
          <span>资格征兆</span>
          <span>协议规则</span>
          <span>下载APP</span>
          <span>Selete</span>
        </li>
        <li v-show="!uname">
          <router-link to="/login">登录</router-link>
          <router-link to="/regiter">注册
          </router-link>
          <router-link to="/">消息通知
          </router-link>
          <router-link to="/gouwuche" id="yanse">
            <img class="bon" style="width: 15px;height: 15px;"
                 src="@/assets/1.png" alt="">
            <span>购物车</span>
          </router-link>
        </li>
        <li v-show="uname">
          <span>欢迎:{{ uname }}</span>
          <span>|</span>
          <span
              @click="namepreservation(null)">退出</span>
          <router-link to="/">消息通知
          </router-link>
          <router-link to="/gouwuche" id="yanse">
            <img class="bon" style="width: 15px;height: 15px;"
                 src="@/assets/1.png" alt="">
            <span>购物车</span>
          </router-link>
        </li>
      </ul>
      <div class="fotter">
        <router-link to="/">
          <img class="fotter-image" src="@/assets/logo-mi2.png" alt="">
        </router-link>
        <div class="fotter-right">
          <router-link to="/ceshi">小米手机</router-link>
          <router-link to="/">小米手机
          </router-link>
          <router-link to="/">电视</router-link>
          <router-link to="/">笔记本
          </router-link>
          <router-link to="/">平板</router-link>
          <router-link to="/">加点
          </router-link>
          <router-link to="/">路由器</router-link>
          <router-link to="/">服务中心
          </router-link>
          <router-link to="/" style="margin-right: 40px;">社区</router-link>
          <input type="text"/>
          <button>
            搜索
          </button>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {

  data() {
    return {}
  },
  computed: {
    ...mapState(['uname'])
  },
  methods: {
    ...mapMutations(['namepreservation']),

  },

}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  background: #333333;
  height: 40px;

  .fotter {
    height: 100px;
    width: 80%;
    margin: auto;

    .fotter-image {
      margin-top: 20px;
      width: 60px;
      height: 60px;
    }

    .fotter-right {
      float: right;
      line-height: 100px;

      a {
        text-decoration: none;
        color: black;
        margin: 0 15px;

        &:hover {
          color: red;
        }
      }

      input {
        width: 200px;
        height: 23px;
      }
    }

    button {
      border: none;

    }
  }

  .container-a {
    color: #B0B0B0;
    width: 80%;
    margin: auto;
    list-style: none;
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: #B0B0B0;
      font-size: 12px;
      margin-right: 10px;
      line-height: 40px;

      &:hover {
        color: white;
      }
    }

    span {
      margin-right: 10px;
      font-size: 12px;
      line-height: 40px;

      &:not(:last-child):hover {
        color: white;
      }
    }
  }
}

#yanse {
  padding: 10px 15px;

  &:hover {
    color: red;
    background: white;
  }

  &:hover img {
    content: url(../assets/2.png)
  }
}

.bon {
  position: relative;
  left: -2px;
  top: 1px;

}

.qingchufudong::after {
  content: '';
  display: block;
  clear: both;
}
</style>
<style lang="scss">

</style>
