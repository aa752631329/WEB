<template>
  <div id="nav">
    <vue-particles
        color="#555"
        :particleOpacity="0.7"
        :particlesNumber="150"
        shapeType="circle"
        :particleSize="4"
        linesColor="#555"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
        class="lizi"
    />
    <div id="login-container">


      <div style="height: 50px" class="dengluyemian">
        <router-link to="/" style="padding-left: 20px">首页</router-link>
        <span>注册</span>
      </div>
      <el-form ref="form" :model="form" status-icon2
               label-width="100px" class="demo-ruleForm"
               :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input prop="name" v-model="form.name" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="form.pwd"
                    placeholder="密码"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input type="password" v-model="form.password"
                    placeholder="请再次输入密码密码"/>
        </el-form-item>
        <el-form-item>
          <el-button :plain=true type="primary" @click="onRegist">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let valitateName= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        const url = 'http://1.14.96.47:3000/zc/valitateName'
        this.axios.get(url, {
          params:
              {name: this.form.name}
        }).then(res => {
          if (res.hasOld) {
            callback(new Error('用户名重复'));
          } else {
            callback();
          }
        })
      }
    };

    return {
      form: {
        id: '',
        name: '', //姓名
        pwd: '',
        password: '',  //密码
        repwdState:''
      },
      rules: {
        name: [
          {required: true, message: '用户名格式错误', trigger: 'blur'},
          {validator: valitateName, trigger: 'blur'},

        ],
        pwd: [{required: true, message: '密码错误', trigger: 'blur'},
        ],
        password: [{required: true, message: '密码错误', trigger: 'blur'},
        ],

      },
    };
  },
  methods: {
    onRegist() {
      const url='zsg/insert'
      this.$refs.form.validate((success)=>{
        if (success){
          this.$refs['form'].validate((val) =>{

              this.axios.post(url,{...this.form}).then(res => {
                console.log(res)
                this.$message({
                  message:'注册成功',
                  type:'success'
                })
                this.$router.push('/login')
              })
          })
        }else {
          console.log('error')
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
body{
  margin: 0;
}
#login-container{
  width: 400px;
  height: 290px;
  background: #e5e9f2;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -220px;
  margin-top: -170px;
  border-radius: 5px;
  padding-top: 40px;
  padding-right: 40px;
}
.dengluyemian{
  display: flex;
  justify-content: space-between;
}
</style>
