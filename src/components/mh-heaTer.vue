<template >
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
            <span >购物车</span>
          </router-link>
        </li>
        <li v-show="uname">
          <span>欢迎:{{uname}}</span>
          <span>|</span>
          <span @click="namepreservation(null)">退出</span>
          <span to="/">消息通知
          </span>
          <router-link to="/gouwuche" id="yanse">
            <img class="bon" style="width: 15px;height: 15px;"
                 src="@/assets/1.png" alt="">
            <span >购物车</span>
          </router-link>
        </li>
      </ul>
      <div class="fotter"  >
        <router-link to="/">
          <img class="fotter-image" src="@/assets/logo-mi2.png" alt=""></router-link>
        <div class="fotter-right">
<!--  一级分类        -->
          <span style="padding: 40px 30px;line-height: 40px"
          @mouseover="yjshow"
                @mouseleave="shubiaoyichu"
          >全部商品显示页面</span>
          <router-link to="/ceshi">小米手机</router-link>
          <router-link to="/">小米手机
        </router-link><router-link to="/">电视</router-link ><router-link to="/">笔记本
        </router-link><router-link to="/">平板</router-link><router-link to="/">加点
        </router-link><router-link to="/">路由器</router-link><router-link to="/">服务中心
        </router-link><router-link to="/" style="margin-right: 40px;">社区</router-link>
          <input type="text" /><button>
          搜索
        </button>
        </div>
      </div>
    </div>
    <div v-if="data">

      <div class="my-mian-top"
           v-show="show">

        <div class="my-mian-left">
          <!-- 二级分类     -->
          <div v-show="show"
              v-for="(item,index) in tupianname"
               :key="item.nid"
               @mouseover="yjshow"
               @mouseleave="shubiaoyichu"

          >
            <h3  :class="{xianshi:yjindex==index}"
                 @click="goSearch(item,0)"
                @mouseover="shubiaoyiru(index)">
              <a :data-rlink="item.name" :data-rlinkid="item.nid" >
                {{ item.name }}
              </a>
            </h3>

            <!--三级分类-->
            <div class="my-mian-asise"

                 @mouseover="shubiaoyiru(index)"
                 @mouseleave="shubiaoyichu"
                 :style="{display:yjindex==index?'block':'none'}">
              <template
                  v-for="(item,index) in data"
              >
                <div @click="goSearch(item,1)" style="width: 100px;height:
              100px;display: inline-block">
                <span style="color:lavender;">
                  {{ item.name }}
                  <img :src="item.iimg" alt="">
                </span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import _ from 'lodash';
import {mapMutations, mapState} from 'vuex'
export default {

  data() {
    return {
      data: null,
      tupianname: null,
      yjindex: '-1',
      show:false,
    }
  },
  mounted() {
    this.getData()
    this.gData()

  },

  computed:{
    ...mapState(['uname'])
  },
  methods: {
    ...mapMutations(['namepreservation']),
    yjshow(){
      this.show=true
    },
    //一二级分类显示隐藏
    shubiaoyichu() {
      this.yjindex = -1
      this.show=false
    },
    shubiaoyiru: _.throttle(function (index) {
      this.yjindex = index
      this.isThree = true
    }, 50),
    //二级分类查询
    getData() {
      const url = 'zsg/imgcha'
      this.axios.get(url).then(res => {
        this.data = res.data
      })
    },

    //一级分类查询
    gData() {
      const url = 'zsg/imgname'
      this.axios.get(url).then(res => {
        this.tupianname = res.data
      })
    },
    //一级分类跳转设置  不能采用routerlink导航
    // ,因为获取频率过高,所以使用事件委派.以下为事件委派自定义属性的编程式
    goSearch(item, index) {
      console.log(item,index)
      if (index == 0) {
        this.$router.push({
          name: 'woshizhu',
          query: {nid: item.nid}
        })
      }
      if (index == 1) {
        this.$router.push({
          name: 'woshizhu',
          query: {id: item.id}
        })}
    },

  },
  watch:{
// 路由发生变化页面刷新
    '$route' (to, from){
      this.$router.go(0);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0;
  padding: 0;
  background: #333333;
  height: 40px;
  .fotter{
    height: 100px;
    width: 80%;
    margin: auto;
    .fotter-image{
      margin-top: 20px;
      width: 60px;
      height: 60px;
    }
    .fotter-right{
      float:right;
      line-height: 100px;

      a{
        text-decoration: none;
        color:black;
        margin: 0 15px;
        &:hover{
          color:red;
        }
      }
      input{
        width: 200px;
        height: 23px;
      }
    }
    button{
      border:none;

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
#yanse{
  padding: 10px 15px;
  &:hover {
    color:red;
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
.qingchufudong::after{
  content: '';
  display: block;
  clear: both;
}
.my-mian-top {
  width: 80%;
  height: 500px;
  margin: auto;
  display: flex;
  justify-content: flex-start;
position: absolute;
left: 10rem;
  top: 140px;
  .my-mian-left {
    width: 15%;

    .xianshi {
      background: red;
    }

    .my-mian-asise {
      position: absolute;
      z-index: 999;
      left: 15%;
      width: 60%;
      top: 0;
      display: none;
      background: #666;
      span {
        height: 80px;
        width: 80px;

        img {
          height: 80px;
          width: 80px;
        }
      }
    }

    h3 {
      padding: 10px 15px;
      background: #333;
      color: white;
    }
  }

  .block {
    width: 80%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;

  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}
.my-mian-left{

}
.sort-enter{
  height: 0;
}
.sort-hover{
  transition:all 1s linear;
}

</style>
<style lang="scss">

</style>
