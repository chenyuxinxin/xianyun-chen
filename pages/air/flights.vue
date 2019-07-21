<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightData" @changeDateList="changeDateList"/>
                
                <!-- 航班头部布局 -->
               
                    <FlightsListHead />
                
                
               
                <!-- 航班信息 -->
                    <FlightsItems v-for="(item,index) in dataList" :key="index" :data="item" />
                   <!-- 分页 -->
        <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page='pageIndex'
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside />
            </div>
        </el-row>
    </section>
</template>

<script>
// import FlightsListHead from "@components/air/flightsListHead.vue"
import FlightsListHead from "@/components/air/flightsListHead.vue"
import FlightsItems from "@/components/air/flightsitems.vue"
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsAside from "@/components/air/flightsAside.vue"
import moment from "moment";

export default {
    data(){
        return {
            // 储存后台返回额数据。数据庞大，直接用大对象进行储存
            flightData:{
                flights:[],
                info:{},
                options:{}
            },

            // 深拷贝一份数据
            cacheFlightData:{
                flights:[],
                info:{},
                options:{}
            },
            // dataList:[],
             // 当前第几页
             pageIndex:1,
         // 每页显示条数
            pageSize:5,
           total:0

        }
    },
    // 监听路由的变化，在同一的页面进行跳转，不会从新加载相关组件，这里使用watch进行路由的监听
    watch: {
        $route(){
            this.getFlightsDate()
        }
    },
    computed: {
        dataList(){
          return  this.flightData.flights.slice(
                (this.pageIndex-1)*this.pageSize,this.pageSize*this.pageIndex
            )
        }
    },
    components: {
        FlightsListHead,
        FlightsItems,
        FlightsFilters,
        FlightsAside
    },
    methods: {
    //    传给子组件，用于修改相关数据。
         changeDateList(arr){
             this.flightData.flights=arr
      },
        // 获取航班总的数据
        getFlightsDate(){
            this.$axios({
                url:"/airs",
                params:this.$route.query
            }).then(res=>{
                console.log(res);
                // const {data} =res.data
                this.flightData=res.data
                this.total=res.data.total
                // 从新建立一个新的对象
                this.cacheFlightData={...res.data}
                
            })
        },
        handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize=val
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex=val
      }
    },
    mounted () {
        //在页面加载的时候，获取数据
        this.getFlightsDate()
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>