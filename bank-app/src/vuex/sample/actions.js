/**
 * Created by Administrator on 2017/6/5.
 */
export default{
  updateName(context, id){
    window.setTimeout(function () {
      context.commit("setName", "name" + Math.random());
    }, 3000);
  }
};
