<template>
  <div class="gouwuche">
    <div>
      <p>全部商品</p>
      <div>
        <table>
          <tbody>
          <tr class="tr_size">
            <th><input type="checkbox" @click='box_go'></th>
            <th>商品名称</th>
            <th>数量</th>
            <th>单价（元）</th>
            <th>金额（元）</th>
            <th>操作</th>
          </tr>
          </tbody>
          <tbody>
          <tr v-for='(tmp,index) in gouwuche' class="commodity">
            <th><input type="checkbox" v-model='tmp.checkbox'></th>

            <th>{{tmp.shuoming}}</th>
            <th >
              <span>-</span>
              <input
                type="text"
                v-model="tmp.num"
               class="in-put">
              <span>-</span>
            </th>
            <th class="content">
              {{tmp.name}}
            </th>

            <th class="jiner">{{tmp.name*tmp.num}}</th>

            <th class="dellll"><button @click='del(index)'>删除</button></th>
          </tr>
          </tbody>
        </table>
        <div class="shoppingBar-footer">
          <button  type="button">去结算</button>
          <div class="buy"><span >{{allshop()}}</span> 件商品总计:
            <span >{{allmoney()}}</span></div>
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
      gouwuche: '',
      box: 1,

    }

  },
  computed: {
    ...mapState(['uname'])
  },
  methods: {

    ...mapMutations(['namebaocun']),
    getData() {
      const url = 'zsg/gwcchaxun'
      this.axios.post(url, {
        uname: this.uname
      }).then(res => {

        this.gouwuche = res.data

      })
    },
    numjian(index) {
      this.index = index
      const url = 'zsg/gwcupdate'
      if (this.num == 1) {
        this.axios.post(url, {bid: 32, num: 2}).then(res => {
          this.gouwuche = res.data

          this.getData()
        })
      }
    },
    numjia(index) {
      this.index = index
      let body = Object.assign(this.gouwuche, {});
      const url = 'zsg/gwcupdate'
      let num = this.num
      console.log(this.num)
      let bum = num
      console.log(num)
      this.axios.post(url, {bid: 32, num: this.num += 1}).then(res => {
        this.gouwuche = res.data

        this.getData()
      })

    },
    del(index) {

    let  formBody = Object.assign(this.gouwuche, {});
      console.dir(formBody)
      console.log(this.gouwuche)
      console.dir(this.gouwuche)

      const url = 'zsg/gwcupdate'
      this.index=index
      this.axios.post(url, {bid: this.bid}).then(res => {
        this.$message(this.bid ? '修改成功' : '修改失败')
        this.getData()

      })
    },
    allshop() {
      let arr = [...this.gouwuche];
      let num = 0;
      for (var i in this.gouwuche) {
        if (this.gouwuche[i].checkbox) {
          num += parseInt(arr[i].num);
        }
      }
      return num

    },
    allmoney() {
      let arr = [...this.gouwuche];
      let num = 0;
      for (var i in this.gouwuche) {
        if (this.gouwuche[i].checkbox) {
          num += arr[i].name * arr[i].num
        }
      }
      return num
    },
    box_go() {
      if (this.box) {
        for (var i in this.gouwuche) {
          this.gouwuche[i].checkbox = true
        }
        this.box = 0;
      } else {
        for (var i in this.gouwuche) {
          this.gouwuche[i].checkbox = false
        }
        this.box = 1;
      }

    }

  },
  mounted() {
    this.getData()

  },


}
</script>

<style lang="scss" scoped>
.gouwuche {
  margin: auto;
  width: 80%;
}
.tr_size{
  th:not(:first-child){
    width: 20%;
  }
  th{
    border-bottom: 1px solid #ccc;
  }
}
th{
  line-height: 40px;
}
.commodity{
  th{

    border-bottom: 1px solid #ccc;
  }
}
</style>
