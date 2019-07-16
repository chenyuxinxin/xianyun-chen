
<template>
  <div class="registerContain">
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="registerForm"
      class="registerForm"
    >

      <el-form-item
        prop="username" >
        <el-input
          class="form-item"
          v-model="registerForm.username"
           placeholder="注册的手机号码"
        ></el-input>
      </el-form-item>
    
       <el-form-item class="form-item" prop="captcha">
                <el-input 
                v-model="registerForm.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button  @click="sendCode(registerForm.username)">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

      <el-form-item
        prop="nickname"
      >
        <el-input
         placeholder="你的名字"
          class="form-item"
          v-model="registerForm.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item
        label=""
        prop="password"
       
      >
        <el-input
         placeholder="密码"
          class="form-item"
          v-model="registerForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="checkPaw"
      
      >
        <el-input
          placeholder="确认密码"
          class="form-item"
          v-model="registerForm.checkPaw"
        ></el-input>
      </el-form-item>
      <el-form-item >
        <el-button
          type="primary"
          class="submit"
          @click="registerSubmit"
        >注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {

  data() {
    const validatePass=(rule, value, callback)=>{
      if (value===""){
        callback(new Error('请再次输入密码'))
      }else if(value==!this.registerForm.password){
         callback(new Error('两次密码不一致'))
      }else{
        callback()
      }
    }
    return {
      registerForm: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPaw: "",
      },
      rules:{
       username:[{ required: true, message: "请输入用户名", trigger: "blur"}],
       code:[{ required: true, message: "请输入用户名", trigger: "blur"}],
       nickname:[{ required: true, message: "请输入用户名", trigger: "blur"}],
       password:[{ required: true, message: "请输入用户名", trigger: "blur"}],
       checkPaw:[{ validator: validatePass, trigger: 'blur' }],
      }
    }
  },
  methods: {
    sendCode(){
      // 如果手机号码为空，则提示不能发送
      const phoneNumber=this.registerForm.username
      if( !phoneNumber.trim()){
          this.$confirm('请输入手机号码', '提示', {
          confirmButtonText: '确定',
          showCancelButton:false,
          type: 'warning'
        })
        // if 判断时候，如果为某种特殊条件，记得使用return阻止某种行为
        return
      }
       
      //  调用action 的方法
      this.$store.dispatch("user/sendCode",phoneNumber)
      .then(res=>{
        this.$confirm(`你的手机验证码为${res}`, '提示', {
          confirmButtonText: '确定',
          showCancelButton:false,
          type: 'warning'
        })
      }
      )

    },
    registerSubmit(){
      // console.log(1223);
      
      this.$refs.registerForm.validate(valid=>{
         const {checkPaw,...props}=this.registerForm
        //  console.log(props);
         
        if(valid){
           this.$axios({
             url:"/accounts/register",
             method:"POST",
             data:props
           }).then(res=>{
            //  console.log(res.data);  
            // 直接保存到本地，跳转页面
            this.$store.commit("user/setUserInfo",res.data) 
            this.$router.push("/")
                   
           }
           )

        }else{
          return false
        }
      }
      )
    }

  }

}
</script>


<style lang="less" scoped>
.registerContain {
  margin-top: 80px;
  overflow: hidden;
}
.form-item{
 margin-left: 10px;
}
.submit{
  display: inline-block;
  width: 100%;
  margin: 0px,10px,0px;
}

</style>

