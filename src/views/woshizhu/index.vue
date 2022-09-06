<template>

  <div class="mY-heater">
    <!--  左侧-->
    <div class="mY-left">
      <div class="mY-left-top" v-if="urLimg">
        <img style="width: 600px;height: 400px;"
             :src="urLimg[hoverIndex].img" alt="">
        <div class="mY-left-top-lg" v-for="(item,index) in urLimg"
             style="">
          <img @mouseover="houverInde(index)"
               style="width: 60px;height: 60px;"
               :src="item.img"
               alt="">
        </div>

      </div>
    </div>
    <!--  右侧  -->

    <div class="mY-right" style="width: 65%;background: #ccc">
      <div class="pxiangqing" v-if="details">
        <p>小米手机: <span>{{ details.shuoming }}</span>
        </p>
        <p>小米详情:{{ details.mingcheng }}</p>
        <p>小米配置:{{ details.peizhi }}</p>
        <p>售价:{{ details.name }}</p>
        <div class="my-shuliang">
          <p> 数量: 1</p>
          <button @click="num--">-</button>
          <input type="text" v-model="num">
          <button @click="num++">+</button>
        </div>

        <div>
          <el-button @click="gouwuche" type="danger">添加购物车</el-button>
        </div>

      </div>
      <div class="pxiangqing" v-if="details2">

          <p>小米手机: <span>{{ details2.shuoming }}</span>
          </p>
          <p>小米详情:{{ details2.mingcheng }}</p>
          <p>小米配置:{{ details2.peizhi }}</p>
          <p>售价:{{ details2.name }}</p>
          <div class="my-shuliang">
            <p> 数量: 1</p>
            <button @click="num--">-</button>
            <input type="text" v-model="num">
            <button @click="num++">+</button>
          </div>

          <div>
            <el-button @click="gouwuche2" type="danger">添加购物车</el-button>
          </div>


      </div>

    </div>

  </div>
</template>

<script>
import _ from "lodash";
import {mapMutations, mapState} from 'vuex'

export default {

  data() {
    return {
      data: '',
      list: '',
      list2: '',
      urLimg: '',
      hoverIndex: '0',
      details: '',
      details2: '',
      num: '1',
    }
  },
  mounted() {
    this.getData()
    this.geData()
    this.gtData()
    this.gETData()
    this.gETata()
  },
  computed: {
    ...mapState(['uname'])
  },
  methods: {
    ...mapMutations(['namepreservation']),
    houverInde: _.throttle(function (index) {
      this.hoverIndex = index
    }, 50),
    gouwuche() {
      const url = 'zsg/gouwuche'
      if (this.uname === null) {
        this.$message({
          showClose: true,
          message: '请先登录',
          type: 'warning'
        })
      } else {
        let body = {...this.details}
        body.uname = this.uname
        body.num = this.num
        this.axios.post(url, body).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '添加购物车成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '添加购物车失败',
                  type: 'warning'
                });
              }
            }
        )
      }
    },
    gouwuche2() {
      const url = 'zsg/gouwuche'
      if (this.uname === null) {
        this.$message({
          showClose: true,
          message: '请先登录',
          type: 'warning'
        })
      } else {
        let body = {...this.details2}
        body.uname = this.uname
        body.num = this.num
        this.axios.post(url, body).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '添加购物车成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '添加购物车失败',
                  type: 'warning'
                });
              }
            }
        )
      }
    },
    //二级分类获取
    getData() {
      let query = {};
      query.sid = this.$route.query.nid
      const url = 'zsg/shoujia'
      this.axios.post(url, {
        sid: query.sid
      }).then(res => {
        this.list = res.data
      })

    },
    //三级分类获取
    geData() {
      let query = {};
      query.sid = this.$route.query.id
      const url = 'zsg/shoujia'
      this.axios.post(url, {
        sid: query.sid
      }).then(res => {
        this.list2 = res.data
      })

    },
    //左侧
    gtData() {
      const url = 'zsg/imglunbo'
      this.axios.get(url).then(res => {
        this.urLimg = res.data
      })
    },
    //二级分类的购物车
    gETData() {
      let query = {};
      query.sid = this.$route.query.nid
      const url = 'zsg/shoujia'
      this.axios.post(url, {
        sid: query.sid
      }).then(res => {
        this.details2 = res.data ? res.data[0] : null
      })
    },
    //三级分类的购物车
    gETata() {
      let query = {};
      query.id = this.$route.query.id
      const url = 'zsg/shoujia'
      this.axios.post(url, {
        sid: query.id
      }).then(res => {
        this.details = res.data ? res.data[0] : null

      })
    },
  },
  watch: {
    //购物车数量的监听设置
    num(to, from) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(to)) this.num = from
      if (this.num > 10) this.num = 10
      if (this.num < 1) this.num = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.mY-heater {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
}

.mY-left-top {

  height: 400px;
  width: 600px;
  margin-right: 30px;

  .mY-left-top-lg {
    margin-top: 10px;
    display: inline-block;

  }

}

.my-shuliang {
  p {
    margin: 30px 0;
  }

  line-height: 16px;

  button {
    width: 36px;
    text-align: center;
    border: 1px solid #ddd;
    vertical-align: middle;
    padding: 8px 0;
    background: #999;
    font-size: 14px;
    cursor: pointer;
    outline: none;

    &:hover {
      background: white;
    }
  }

  input {
    margin: 0 5px;
    width: 36px;
    text-align: center;
    border: 1px solid #ddd;
    vertical-align: middle;
    padding: 8px 0;
    font-size: 14px;
    cursor: pointer;
    outline: none;
  }

  margin-bottom: 30px;

}

.pxiangqing {
  line-height: 40px;
}
</style>
<style lang="scss">

</style>
