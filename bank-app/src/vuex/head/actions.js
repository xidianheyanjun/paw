/**
 * Created by Administrator on 2017/6/5.
 */
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
