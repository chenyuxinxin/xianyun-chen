<template>
    <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info" >
                <div class="member-info-item" v-for="(item,index) in users" :key="index">

                    <el-form-item label="乘机人类型" >
                        <el-input placeholder="姓名" class="input-with-select" v-model="users[index].username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="users[index].id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index"> 
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
                    @change="handleInsurance(item)"
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        <!--计算属性在页面使用才有效 -->
        <input type="hidden" :value="allPrice">
    </div>
</template>

<script>
export default {
  data(){
    return{
    users:[
      {username:"",id:""}
      ],
      insurances:[],
      contactName:"",
      contactPhone:"",
      invoice:false,
      captcha: "",            // 手机验证码 （文档没有说明的）
      seat_xid: "",           // 座位id
      air: "" , 
      infoData:{
          insurances:[],

      }
      
    }
  },
  computed: {
      allPrice(){
        //   console.log(this.infoData);
        if(!this.infoData.airport_tax_audlet)return ""
          let price=0;
         price+=this.infoData.seat_infos.org_settle_price
         price+=this.infoData.airport_tax_audlet;
         price+=this.insurances.length*30;
         price*=this.users.length;
        //  把当前的数据传给仓库
        this.$store.commit("air/setAllPrice",price)
           return price
      }
  },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({username:"",id:""})
        },
        
        // 移除乘机人
        handleDeleteUser( index){
         this.users.splice(index,1)
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            // 调用仓库里面的方法
            // 在发送验证码前，判断是否输入手机号码
            if( !this.contactPhone.trim()){
               this.$alert("请先输入手机号码","提示",{
                   type:"warning"
              })
              return
            }
            this.$store.dispatch("user/sendCode",this.contactPhone).then(code=>{
              this.$alert(`"你的验证码为${code}"`,"提示",{
                   type:"warning"
              })
            })
        },

        // 提交订单
        handleSubmit(){
            const data={
              users:this.users,
              insurances:this.insurances,
              contactName:this.contactName,
              contactPhone:this.contactPhone,
              invoice:this.invoice,
              captcha:this.captcha,
              seat_xid: this.$route.query.seat_xid,
              air: this.$route.query.id
            }
            console.log(data);
          //  自定义验证
          const rules={
          users: {
              value:this.users,
              message:"乘机人不能为空"
            },
            constactName:{
              value:this.contactName,
              message:"联系人不能为空"
            },
            contactPhone:{
              value:this.contactName,
             message:"联系人不能为空"},
              captcha:{
                value:this.captcha,
                message:"验证码不能为空"
              }

             }
                let invalid=true;
            Object.keys(rules).forEach(v=>{
              if(!invalid) return;
            //  针对处理用户列表为空，设置的判断
            if(v==="users"){
                // 循环判断是不是每个用户username 和id 都是有值得
                rules[v].value.map(user=>{
                    if(!invalid) return
                     if(!(user.username &&user.id)){
                         invalid=false
                         this.$message.warning(rules[v].message)
                     }
                })
            }

              if(!rules[v].value){
                invalid=false
                 this.$message.warning(rules[v].message)
              }

            })
            if(!invalid) return;
              this.$axios({
                url: "/airorders",
                method: "POST",
                data,
                //  添加授权的头信息
                headers: {
                    // 下面请求头信息不是通用的，针对当前的项目的（基于JWT token标准）
                    Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                }
            }).then(res=>{
                // 跳转付款页面
                console.log(res,1223);
                const{id}=res.data.data
                this.$router.push("/air/pay?id="+id)
                console.log(res);
              
            })
        },
        // 获取保险id
        handleInsurance(item){
          // 判断数组中是否已经存在id ,存在，删除该ID，不存在则加上id 
          const index=this.insurances.indexOf(item.id)
          if(index>-1){
            this.insurances.splice(index,1)
          }else{
            this.insurances.push(item.id)
          }
          // console.log(this.insurances);
        
        }
    },
    mounted () {
      // 获取选择机票的信息
      const {id,seat_xid} =this.$route.query
      console.log(id,seat_xid);
      
      this.$axios({
        url:"/airs/"+id,
        params:{
         seat_xid
        }
      }).then(res=>{
        console.log(res.data);
        this.infoData=res.data

         this.$store.commit("air/setInfoData",res.data)
        //   this.$store.commit("air/setInfoData", res.data);
        
      })
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>