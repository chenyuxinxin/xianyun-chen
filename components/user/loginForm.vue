<template>
  <div class="loginForm">

    <el-form :model="userForm" :rules="rules" ref="usersForm" label-width="100px" class="usersForm">
  <el-form-item label="用户名" prop="username" >
    <el-input class="form-item" v-model="userForm.username"></el-input>
  </el-form-item>
 <el-form-item label="密码" prop="password">
    <el-input v-model="userForm.password"></el-input>
  </el-form-item>
  <p class="form-text"> <nuxt-link to="#">忘记密码</nuxt-link></p>
   <el-form-item>
    <el-button type="primary" class="submit" @click="handlesubmit">提交</el-button>
  </el-form-item>
</el-form>
 
  </div>
</template>

<script>
export default {
  data(){
    return{
    userForm:{
     username:"",
     password:""
     },
     rules:{
         username:[{required: true, message: '请输入用户名', trigger: 'blur'}],
         password:[{required: true, message: '请输入密码', trigger: 'blur'}]
     }
    }
  },
  methods: {
    handlesubmit(){
      // console.log(123);
      this.$refs.usersForm.validate(valid=>{
        if(valid){
          // 发送ajax 请求
        //  使用仓库里面的方法
        this.$store.dispatch("user/login",this.userForm)
         .then(res=>{
           this.$router.push("/")
         
           
         })
          
        }else{
          return false
        }
      })
      
      
    }

      
  }
}
</script>

<style lang="less" scoped>
.usersForm{
  padding-top:80px;
  padding-right:60px;
  .form-text{
    font-size: 12px;
    color: aqua;
    text-align: right;
    line-height: 1;
  }
  .submit{
    margin-top:10px;
    width: 100%;
  }
}
</style>
