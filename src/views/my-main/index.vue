<template>

  <div v-if="data" >

    <div class="my-mian-top">

      <div class="my-mian-left">
        <!-- 一级分类     -->
        <div v-for="(item,index) in
        tupianname"
             :key="item.nid"
        >
          <h3 :class="{xianshi:yjindex==index}"
              @mouseover="shubiaoyiru(index)"
              @click="goSearch(item,0)"
              @mouseleave="shubiaoyichu">
            {{ item.name }}

          </h3>
          <!--二级分类-->
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


      <!-- 轮播图   -->
      <div class="block">
        <el-carousel height="400px">
          <el-carousel-item v-for="(item,index) in lunbo" :key="item.cid">
            <img style="height: 100%;" :src="item.img" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {

  data() {
    return {
      data: null,
      lunbo: null,
      tupianname: null,
      yjindex: '-1',

    }
  },
  mounted() {
    this.getData()
    this.gtData()
    this.gData()
  },
  methods: {
    //一二级分类显示隐藏
    shubiaoyichu() {
      this.yjindex = '-1'
    },
    shubiaoyiru: _.throttle(function (index) {
      this.yjindex = index
    }, 50),
    //二级分类查询
    getData() {
      const url = 'zsg/imgcha'
      this.axios.get(url).then(res => {

        this.data = res.data
      })
    },
    //轮播图查询
    gtData() {
      const url = 'zsg/imglunbo'
      this.axios.get(url).then(res => {

        this.lunbo = res.data
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
      if (index==0) {
        this.$router.push({
          name: 'woshizhu',
         query: {nid: item.nid}
        })
      }
      if (index==1) {
        this.$router.push({
          name: 'woshizhu',
          query: {id: item.id}
        })
      }
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
<style scoped lang="scss">
.my-mian-top {

  width: 80%;
  height: 500px;
  margin: auto;
  display: flex;
  justify-content: flex-start;


  .my-mian-left {
    width: 15%;
    .xianshi {
      background: red;
    }

    .my-mian-asise {
      position: absolute;
      z-index: 999;
      left: 22%;
      width: 65%;
      top: 150px;
      display: none;

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
    width: 85%;
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


</style>
