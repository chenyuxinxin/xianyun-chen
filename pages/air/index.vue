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
        <el-row type="flex" class="air-sale-pic" justify="space-between">
          <el-col :span="6" v-for="(item,index) in sales" :key="index"> 
           <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
            <img :src="item.cover"/>
            <el-row class="layer-bar" type="flex" justify="space-between" >
             <span>{{item.departCity}}-{{item.destCity}}</span>
             <span>￥{{Number(item.price).toFixed(2)}}</span>
            </el-row>
            </nuxt-link>
          </el-col>
        </el-row>
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
    sales:[]
    }
  },
  mounted () {
    this.$axios({
      url:"/airs/sale",
      method:"GET"

    }).then(res=>{
      // console.log(res);
      const {data}=res.data
      this.sales=data
      
    })

  }
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
.air-sale{
  border: 1px #ddd solid;
  padding:20px;
  margin-bottom:50px;

  .air-sale-pic{
    > div{
      width:225px;
      height:140px;
      position: relative;
      overflow: hidden;

      img{
        width:100%;
      }

      .layer-bar{
        position:absolute;
        bottom:0;
        left:0;
        background: rgba(0,0,0,0.5);
        color:#fff;
        height:30px;
        line-height: 30px;
        width:100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child{
          font-size:18px;
        }
      }
    }
  }
}

</style>

