<template>
  <div class="header">
    <el-row type="flex" justify="space-between" class='main'>
      <div class="logo">
     <nuxt-link to ="/">
     <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
     </nuxt-link>
   </div>
   <el-row type="flex" class="navs">
     <nuxt-link to="/">首页</nuxt-link>
     <nuxt-link to="/post">旅游攻略</nuxt-link>
     <nuxt-link to="/hotel">酒店</nuxt-link>
     <nuxt-link to="/air">国内机票</nuxt-link>
   </el-row>
   <div class="login">
    <!-- 右侧的登录注册 -->
    <div v-if="!$store.state.user.userInfo.token">
      <nuxt-link to="/user/login" >登录/注册</nuxt-link>
    </div>

    <el-dropdown v-else>
  <span class="el-dropdown-link">
    <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">{{$store.state.user.userInfo.user.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item  @click.native="logout">退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
   </div>
    </el-row>
 
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      // console.log(123);
      this.$store.commit("user/clearUserInfo")
      
    }
  }
}
</script>

<style lang="less" scoped>
.header{
   box-shadow: 0 2px 2px #ddd;
}
.main{
    width:1000px;
    margin: 0 auto;
    height:60px;
    line-height:60px;
}
.logo img{
height: 42px;
margin-right:30px;
width:156px;
margin-top:9px;
}
.navs{
  flex: 1; 
a{
  padding: 0px 20px;
  &:hover{
    color:aquamarine;
    border-bottom: 5px solid aquamarine
  }
}
.nuxt-link-exact-active{
  background-color: aquamarine;
  color:white;
  &:hover{
    color:white
  }
    }

}
.el-dropdown-link{
    img{
        width: 36px;
        height:36px;
        vertical-align: middle;
    }
}





</style>

