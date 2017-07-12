/**
 * Created by Administrator on 2017/6/5.
 */
import env from "@/env";
export default{
  box_set_toast(context, toast){
    context.commit("box_set_toast", toast);
    window.setTimeout(function () {
      context.commit("box_set_toast", {
        show: false,
        toastText: ""
      });
    }, 3000);
  }
};
