<template>
  <div class="search_form">
    <!-- 头部tab 栏切换 -->
    <el-row
      type="flex"
      class="search_tab"
    >
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:currentTab===index}"
        @click="handleClick(index)"
      >
        <i :class="item.icon"></i>{{item.name}}
      </span>
    </el-row>
    <!-- 中间内容显示 -->
    <el-form
      :model="searchForm"
      :rules="rules"
      ref="searchForm"
      label-width="80px"
      class="demo-searchForm"
    >
      <el-form-item
        label="出发城市"
        prop="departCity"
      >
        <el-autocomplete
          class="input_departCity"
          v-model="searchForm.departCity"
          :fetch-suggestions="querySearchDepartCity"
          placeholder="请输入出发的城市"
          @select="handleSelectDepartCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item
        label="到达城市"
        prop="destCity"
      >
        <el-autocomplete
          class="input_destCity"
          v-model="searchForm.destCity"
          :fetch-suggestions="querySearchDestCity"
          placeholder="请输入到达的城市"
          @select="handleSelectDestCity"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item
        prop="date1"
        label="出发城市"
      >
        <el-date-picker
          @change="handleDate"
          type="date"
          placeholder="选择出发日期"
          v-model="searchForm.departDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="">
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>

      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>

  </div>
</template>


<script>
import moment from "moment";
export default {

  data() {
    return {
      // state1: "",
      // state2: "",
      searchForm: {
        departCity: "",
        destCity: "",
        departCode: "",
        destCode: "",
        departDate: ""
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      rules: {},
     
    }
  },
  methods: {
    handleClick(index) {
      this.currentTab = index
      if (index === 1) {
        this.$message.warning("往返的数据库暂时没有数据")
      }
    },
    querySearchDepartCity(queryString, cb) {
      this.querySearchCity(queryString).then(res=>{
           if(res.length>0){
              this.searchForm.departCity = res[0].value;
                this.searchForm.departCity = res[0].sort;
           }
           cb(res)
     })
     
      
    },
    querySearchDestCity(queryString,cb) {
     this.querySearchCity(queryString).then(res=>{
           if(res.length>0){
              this.searchForm.destCity = res[0].value;
                this.searchForm.destCode = res[0].sort;
           }
           cb(res)
     })
    },
    querySearchCity(queryString){
       //  如果是空，就不发器请求和下拉框
       return new Promise((resolve,reject)=>{
      if (!queryString.trim()) {
        resolve([])

      }
      this.$axios({
        url: '/airs/city',
        method: "GET",
        params: { name: queryString }
      }).then(res => {
        // console.log(res);
        // 解构获得真正的数据
        const { data } = res.data
        const newData = data.map(v => {
          return {
            ...v,
            value: v.name.replace("市", "")
          }
        })
        resolve(newData)
        // cb(newData)
      }
      )
             })
    },

    handleSelectDepartCity(item) {
      // console.log(item);

      this.searchForm.departCity = item.value
      this.searchForm.departCode = item.sort

    },
    handleSelectDestCity(item) {
      this.searchForm.destCity = item.value
      this.searchForm.destCode = item.sort
    },
    handleDate(value) {
      // console.log(value);
      this.searchForm.departDate = moment(value).format("YYYY-MM-DD")

    },
    handleSubmit() {
      //为什么在这里不用这个，是一开始时级没有做rules 的数据验证码？
      // this.$refs.searchForm
      const rules = {
        departCity: {
          value: this.searchForm.departCity,
          message: "请输入出发的城市"
        },
        destCity: {
          value: this.searchForm.destCity,
          message: "请输入到达的目的地"
        },
        departDate: {
          value: this.searchForm.departDate,
          message: "请选择出发日期"
        }
      }
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return
        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message)
        }
      })

      if (valid) {
        this.$router.push({
          path: "/air/flights",
          query: this.searchForm
        })
      }
      // 添加记录到本地储存
      
      const airs=JSON.parse(localStorage.getItem("airs") ||`[]`)
      
      airs.unshift(this.searchForm)
          if(airs.length>5){
            airs.length=5
          }
      localStorage.setItem("airs",JSON.stringify(airs));
      // 
    },

    handleReverse() {
      // console.log(this.searchForm);

      const { departCity, departCode, destCity, destCode } = this.searchForm;

      this.searchForm.departCity = destCity;
      this.searchForm.departCode = destCode;
      this.searchForm.destCity = departCity;
      this.searchForm.destCode = departCode;
    }




  }
}
</script>

<style lang="less" scoped>
.search_form {
  border: 1px solid #666;
  border-top: none;
  background-color: white;

  .search_tab {
    margin-bottom: 20px;
    span {
      display: block;
      flex: 1;
      justify-content: space-between;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      background-color: #ccc;
      border-top: 3px solid #ccc;
      i {
        margin-right: 10px;
      }
    }
    .active {
      background-color: white;
      border-top-color: orange;
    }
  }
  .demo-searchForm {
    margin-right: 10px;
    position: relative;
  }
  .reverse {
    position: absolute;
    top: 35px;
    right: 15px;
    &:after,
    &::before {
      display: block;
      content: "";
      position: absolute;
      left: -35px;
      width: 25px;
      height: 1px;
      background-color: #ccc;
    }
    &:after {
      top: 0;
    }

    &:before {
      top: 60px;
    }
    span {
      display: block;
      position: absolute;
      top: 20px;
      right: 0;
      font-size: 12px;
      background: #999;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;

      &:after,
      &:before {
        display: block;
        content: "";
        position: absolute;
        left: 10px;
        width: 1px;
        height: 20px;
        background: #ccc;
      }

      &:after {
        top: -20px;
      }

      &:before {
        top: 20px;
      }
    }
  }
}
</style>
