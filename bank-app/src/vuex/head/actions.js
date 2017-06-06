/**
 * Created by Administrator on 2017/6/5.
 */
export default{
  head_setHead(context, head){
    let headInfo = {
      left: {
        img: head.left.img || "",
        title: head.left.title || "返回",
        callback: head.left.callback || null
      },
      center: {
        img: head.center.img || "",
        title: head.center.title || "首页",
        callback: head.center.callback || null
      },
      right: {
        img: head.right.img || "",
        title: head.right.title || "去登陆",
        callback: head.right.callback || null
      }
    };
    context.commit("head_setHead", headInfo);
  }
};
