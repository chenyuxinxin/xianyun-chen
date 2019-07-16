// 这里vue X的仓库


export const state=()=>{
  return{
   userInfo:{
    token:"",
    user:{
      username:"",
      nickname:""
    }
  }
  }
  
}


export const mutations={
 setUserInfo(state,data){
    state.userInfo = data
 },
  clearUserInfo(state){
    state.userInfo={
      token:"",
      user:{}
    }
  }
}

export const actions={
  login(store,data){
    return this.$axios({
      url:"/accounts/login",
      method:"POST",
      data
    }).then(res=>{
      console.log(res);
      store.commit('setUserInfo', res.data)
    
    })
  },
  sendCode(store,phoneNumber){
    return this.$axios({
      url:"/captchas",
      method:"POST",
      data: {tel:phoneNumber}    
    }).then(res=>{
      // console.log(res);
      const {code}=res.data
      return code
      
    })
  }
  
}