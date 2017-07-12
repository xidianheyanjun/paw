/**
 * Created by Administrator on 2017/6/5.
 */
import env from "@/env";
export default{
  person_set_login_flag(context, isLogin){
    console.log("person_set_login_flag", env.useNative);
    if (env.useNative) {
    } else {
      context.commit("person_set_login_flag", isLogin);
    }
  }
};
