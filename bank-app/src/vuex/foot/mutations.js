/**
 * Created by Administrator on 2017/6/5.
 */
export default{
  foot_setActive(state, position){
    let list = state.foot.menuList;
    for (let index = 0; index < list.length; ++index) {
      list[index]["isActive"] = index == position;
    }
  }
};
