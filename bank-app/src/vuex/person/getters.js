/**
 * Created by Administrator on 2017/6/5.
 */
import native from "@/util/native";

export default{
  person(state){
    return state.person;
  },
  person_isLogin(state){
    console.log(native.getUserInfo());
    return !!native.getUserInfo().userId;
  }
}
;
