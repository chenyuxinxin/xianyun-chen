<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部 -->
        <el-row type="flex" justify="center"class="tabs">
          <span 
           v-for="(item,index) in ['登录','注册']"
           :key="index"
           :class="{active:currentTab===index}"
           @click="handleChangeTab(index)"
          >
          {{item}}
          </span>
        </el-row>
        <loginForm v-if="currentTab===0"/>
        <registerForm v-if="currentTab===1"/>
      </div>


    </el-row>
  </div>
</template>

<script>
import loginForm from "@/components/user/loginForm"
import registerForm from "@/components/user/registerForm"
export default {
 data(){
  return{
   currentTab:1
  }
 },
 components: {
   loginForm,
   registerForm
 },
 methods: {
   handleChangeTab(index){
     console.log(123);
     
     this.currentTab=index
   }
 }

}
</script>

<style lang="less" scoped>

.container{
  background: url("http://157.122.54.189:9095/assets/images/th03.jfif") center 0;
  height:700px;
  min-width:1000px;
  .main{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position:relative;
    .form-wrapper{
      width: 400px;
      // height: 100px;
      margin:0 auto;
      background-color:#fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, .1);
      .tabs{
       position: absolute;
      //  top:0;
      //  left:50%;
      //  left:-200px;
       width: 400px;
       height: 50px;
       background-color: #fff;
        span{
          display: inline-block;
          width: 200px;
          text-align: center;
          color:black;
          line-height: 50px;
          border-top:3px;
          // font-weight: bold;
          background-color: #eee;
           border-top:2px #eee solid;
          &.active{
            color:orange;
            border-top-color:orange;
            background-color: #fff;
            font-weight: bold;
          }


        }
      }
    }
  }
}

</style>
