<template>
  <div>
    <el-form ref="form" :model="form"  label-width="100px">
    <el-upload
        class="upload-demo"
        drag
        multiple
        :limit="100"
        action="http://1.14.96.47:3001/iimg"
        :on-success="uploadOk"
        name="uploadFile">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      form: {

        iimg: ''
      },
      urls: [],
    }
  },
  mounted() {

  },
  methods: {
    uploadOk(a,file,filelist){
      console.log('a',a)
      console.log('b',file)
      console.log('c',filelist)
      let url=a.urls[0]
      this.urls.push(url)
      this.axios.post("http://1.14.96.47:3001/zsg/img",
          {iimg: url}).then(res => {
        console.log(res)
      })
    },
  },


}
</script>

<style scoped>

</style>
<style scoped lang="scss">

</style>
