/**
 * Created by Administrator on 2017/6/5.
 */

import native from "@/util/native";
export default{
  head_setHead(context, head){
    let headInfo = {
      center: {
        img: head.center.img || "",
        title: head.center.title || "惠银",
        callback: head.center.callback || null
      }
    };
    if (head.left) {
      headInfo.left = {
        img: head.left.img || "",
        // title: head.left.title || "",
        callback: head.left.callback || null
      };
      window.backpress = head.left.callback || native.closeApp // 给安卓客户端调用（返回）
    } else {
      window.backpress = native.closeApp // 给安卓客户端调用（退出app）
    }
    if (head.right) {
      headInfo.right = {
        img: head.right.img || "",
        // title: head.left.title || "",
        callback: head.right.callback || null
      };
    }
    context.commit("head_setHead", headInfo);
  }
};
