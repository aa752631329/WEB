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
        <span>登录</span>
        <router-link to="/regiter">注册</router-link>
      </div>
      <el-form ref="form" :model="form" status-icon2
               label-width="100px" class="demo-ruleForm"
               :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input prop="name" v-model="form.uname" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="form.pwd"
                    placeholder="密码"/>
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
    return {
      form: {
        uname: '', //姓名
        pwd: '',
        repwdState: ''
      },
      rules: {
        uname: [
          [{required: true, message: '用户名错误', trigger: 'blur'},
          ],
        ],
        pwd: [{required: true, message: '密码错误', trigger: 'blur'},
        ],

      },
    };
  },
  methods: {
    onRegist() {
      const url = 'zc/login'
      this.$refs['form'].validate((val) => {
            this.axios.post(url, {...this.form}).then(res => {
                  if (res.code == 200) {
                    this.$store.commit('namepreservation', this.form.uname)
                    this.$message({
                      message: '登录成功',
                      type: 'success'
                    })
                    this.$router.push('/')
                  } else {
                    this.$message({
                      showClose: true,
                      message: '登录失败',
                      type: 'warning'
                    });
                  }
                }
            )
          }
      )
    },
  }
}
</script>

<style scoped>
body {
  margin: 0;
}

#login-container {
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

.dengluyemian {
  display: flex;
  justify-content: space-between;
}
</style>
