<template>

  <div class="Shopping" v-if="Shopping">
    <div>
      <router-link to="/">
        <img class="fotter-image" src="@/assets/logo-mi2.png" alt="">
      </router-link>
      <div class="Shoppingname" v-show="!uname">
        <router-link to="/login">登录</router-link>
        <router-link to="/regiter">注册
        </router-link>
        <router-link to="/">消息通知
        </router-link>
        <div class="yanse">
          <router-link to="/gouwuche">
            <img class="bon" style="width: 15px;height: 15px;"
                 src="@/assets/1.png" alt="">
            <span>购物车</span></router-link>
        </div>
      </div>
      <div class="Shoppingname" v-show="uname">
        <span>欢迎:{{ uname }}</span>
        <span>|</span>
        <span @click="namepreservation(null)">退出</span>
        <router-link to="/">消息通知
          </router-link>
        <div class="yanse">
          <router-link to="/gouwuche">
            <img class="bon" style="width: 15px;height: 15px;"
                 src="@/assets/1.png" alt="">
            <span>购物车</span></router-link>
        </div>
      </div>
    </div>
    <div>
      <p>全部商品</p>
      <div>
        <table>
          <tbody>
          <tr class="tr_size">
            <th>
              <input type="checkbox" @click="box_go" v-model="gx"/>
            </th>
            <th>商品名称</th>
            <th>数量</th>
            <th>单价（元）</th>
            <th>金额（元）</th>
            <th>操作</th>
          </tr>
          </tbody>
          <tbody>
          <tr v-for='(tmp,index) in Shopping' class="commodity">
            <!--            勾选状态-->

            <th>
              <el-checkbox v-model="tmp.checkbox"
                           true-label="1" false-label="0"

                           @change="checkChange(index)"/>
            </th>
            <!--详情-->
            <th>{{ tmp.shuoming }}</th>
            <th class="inputpeizhi">
              <button @click="numreduce(index)">
                -
              </button>
              <!--              数量-->
              <input
                  type="text"
                  v-model="tmp.num"
                  class="in-put">
              <button @click="numplus(index)">
                +
              </button>
            </th>
            <!--            单价-->
            <th class="content">
              {{ tmp.name }}
            </th>
            <!--小计-->
            <th class="jiner">
              {{ tmp.name * tmp.num }}
            </th>

            <th class="dellll">
              <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="del(index)">
                删除
              </el-button>
            </th>
          </tr>
          </tbody>

        </table>
        <div class="shoppingBar-footer">
          <!--          allshop 为总计n件商品 allmoney为总计价格-->
          <div class="buy">
            <span>
              {{ allshop() }}
            </span> 件商品总计:
            <span>
              {{ allmoney() }}
            </span>
          </div>
          <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deleteCommodity"
          >
            删除选中商品
          </el-button>
          <el-button
              align="right"
              type="danger"
              icon="el-icon-delete"
              @click="emptyShopping">
            清空购物车
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

export default {
  data() {
    return {
      Shopping: [],
      box: '-1',  //勾选状态
      gx: true,

    }
  },
  computed: {
    ...mapState(['uname'])
  },
  methods: {

    ...mapMutations(['namepreservation']),
    getData() {
      const url = 'zsg/gwcchaxun'
      this.axios.post(url, {
        uname: this.uname
      }).then(res => {
        this.Shopping = res.data
      })
    },
    //num数量-1
    numreduce(index) {
      let formBody = {...this.Shopping[index]}
      this.index = index
      const url = 'zsg/gwcupdate'
      if (formBody.num > 1) {
        this.axios.post(url, {
          bid: formBody.bid,
          num: formBody.num - 1
        }).then(res => {
              this.Shopping = res.data
              this.getData()
            }
        )
      }
    },
    //num数量+1
    numplus(index) {
      let formBody = {...this.Shopping[index]}
      this.index = index
      const url = 'zsg/gwcupdate'
      if (formBody.num < 10) {
        this.axios.post(url, {bid: formBody.bid, num: formBody.num + 1})
            .then(res => {
              this.Shopping = res.data
              this.getData()
            })
      }
    },
    //购物车删除
    del(index) {
      let formBody = {...this.Shopping[index]}
      const url = 'zsg/gwcdelete'
      this.axios.post(url, {bid: formBody.bid}).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '删除失败',
            type: 'warning'
          });
        }
        this.getData()
      })
    },
    //删除选中商品
    deleteCommodity() {
      const url = 'zsg/xzcdelete'
      this.axios.post(url, {
        uname: this.uname,
        checkbox: 1
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '删除失败',
            type: 'warning'
          });
        }
        this.getData()

      })
    },
    //清空购物车
    emptyShopping() {
      const url = 'zsg/qkcdelete'
      this.axios.post(url, {uname: this.uname}).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '清空购物车成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '清空购物车失败',
            type: 'warning'
          });
        }
        this.getData()
      })
    },
    //商品总计多少件
    allshop() {
      let arr = [...this.Shopping];
      let num = 0;
      for (var i in this.Shopping) {
        if (this.Shopping[i].checkbox) {
          num += parseInt(arr[i].num);
        }
      }
      return num

    },
    //商品总计价格
    allmoney() {
      let arr = [...this.Shopping];
      let num = 0;
      for (var i in this.Shopping) {
        if (this.Shopping[i].checkbox) {
          num += arr[i].name * arr[i].num
        }
      }
      return num
    },
    checkChange(index) {
      let formBody = {...this.Shopping[index]}
      const url = 'zsg/gxupdate'
      this.index = index
      this.axios.post(url, {
        bid: formBody.bid, checkbox:
        formBody.checkbox
      }).then(res => {

      })

    },
    //勾选全选
    box_go() {
      const url = 'zsg/qxupdate'
      this.axios.post(url, {
        uname: this.uname,
        checkbox: !this.gx
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '全选成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '全选失败',
            type: 'warning'
          });
        }
        this.getData()
      })
    },
  },
  mounted() {
    this.getData()
  },
  watch: {
    //购物车数量的监听设置
    num(to, from) {
      const reg = /^[1-9]\d*$/
      if (!reg.test(to)) this.num = from
      if (this.num > 10) this.num = 10
      if (this.num < 1) this.num = 1
      console.log(this.num)
    }
  }

}
</script>

<style lang="scss" scoped>
.Shopping {
  margin: auto;
  width: 80%;
}

.tr_size {
  th:not(:first-child) {
    width: 20%;
  }

  th {
    border-bottom: 1px solid #ccc;
  }
}

th {
  line-height: 40px;
}

.commodity {
  th {

    border-bottom: 1px solid #ccc;
  }
}

.inputpeizhi {
  button {
    width: 36px;
    text-align: center;
    border: 1px solid #ddd;
    vertical-align: middle;
    padding: 8px 0px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
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

}

.fotter-image {
  margin-top: 20px;
  width: 60px;
  height: 60px;
}


.Shoppingname {
  float: right;
  line-height: 100px;
  color: #666;
  font-size: 14px;

  a {
    padding: 10px 10px;
    color: #333;

    &:hover {
      color: #666
    }
  }

  span {
    padding: 10px 10px;

    &:hover {
      color: #333;
    }
  }

  img {
    width: 10px;
    height: 10px;
  }

  .yanse {

    float: right;

    .bon {
      position: relative;
      left: -2px;
      top: 1px;

    }

    &:hover {
      color: #333
    }

    &:hover img {
      content: url("./2.png");
    }
  }
}
</style>
