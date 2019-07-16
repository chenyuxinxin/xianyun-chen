<template>
  <div class="container">
    <!-- 标题 -->
    <h2 class="air-title"><span class="iconfont iconfeiji"></span> <i>国内机票</i></h2>
    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between" class="search-banner">
   <!-- s搜索表单组件 -->
    <searchForm />
   <!-- 右边广告图 -->
   <div class="banner">
       <img src="http://157.122.54.189:9093/images/pic_sale.jpeg">
   </div>


    </el-row>
    <!-- 中部标语 -->
      <el-row type="flex" class="adver">
       <el-col :span="8">
       <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
       <span>100%航海验证</span>
       </el-col>

        <el-col :span="8">
       <i class="iconfont iconbaozheng" style="color:green;"></i>
       <span>出行保证</span>
       </el-col>

        <el-col :span="8">
       <i class="iconfont icondianhua" style="color:#409EFF;"></i>
       <span>7x24小时服务</span>
       </el-col>
      </el-row>

<h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <!-- 特价机票 -->
    <div class="air-sale">
        <!-- <el-row type="flex" class="air-sale-pic" justify="space-between">
          <el-col :span="6">
           <nuxt-link >
            <img src=""/>
            <el-row class="layer-bar" type="flex" justify="space-between">
             <span></span>
             <span></span>
            </el-row>
            </nuxt-link>
          </el-col>
        </el-row> -->
    </div>

  </div>
</template>

<script>
import searchForm from "@/components/air/searchForm"
export default {
  components: {
    searchForm
  },
  data(){
    return{

    }
  },
  // mounted () {
  //   this.$axios({
  //     url:"/airs/sale",
  //     method:"GET"

  //   }).then(res=>{
  //     console.log(res);
      
  //   })

  // }
}
</script>


<style lang="less" scoped>
.container{
  width:1000px;
  margin:0 auto;
}
.air-title{
  font-size:20px ;
  font-weight: 700;
  color:orange;
  margin: 15px 0;
}
.adver{
  border: 1px solid #666;
  background-color: #ccc;
  font-size: 16px;
  color: black;
  height: 58px;
  margin: 15px 0;
  > div{
    line-height: 58px;
     text-align: center;
     border-right: 1px solid #ccc;
     &:last-child{
      border-right: none
     }
     
    i{
      font-size: 30px;
    }
  }

}

</style>

