<template>
  <div class="vv-tab">
    <ul class="tabs">
      <li class="tab" v-for="(pick, index) in pickList" :key="index" :style="{width: tabWidth}">
        <div :class="['value', {'current': isShow}]" @click="openPick(pick)">{{pick.list[pick.curIdx].name}}</div>
        <ul class="items" v-show="isShow">
          <li :class="['item', {'cur': idx === pick.curIdx}]" @click.stop="pickClick(item)" v-for="(item, idx) in curPickItem" :key="idx">{{item.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'commonPicker',
  props: {
    pickList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isShow: false,
      curPickItem: {}
    };
  },
  computed: {
    tabWidth() {
      return 100 / this.pickList.length + '%';
    }
  },
  methods: {
    openPick(item) {
      this.isShow = true;
      this.curPickItem = item.list;
    },
    pickClick(item) {

    }
  }
}
</script>
<style scoped>
.vv-tab {
  position: relative;
  box-sizing: border-box;
  height: 48px;
  padding: 5px 5%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.vv-tab .tab{
  float:left;
  line-height: 38px;
  text-align: center;
}
.vv-tab .value {
  font-size: 13px;
}
.vv-tab .value:after {
  content: '.';
  overflow: hidden;
  display: inline-block;
  width:0;
  height:0;
  border:5px dashed transparent;
  border-top: 5px solid #ddd;
  margin-left:5px;
  margin-top:5px;
  vertical-align: middle;
}
.vv-tab .items {
  position: absolute;
  top:48px;
  left:0;
  width:100%;
  text-align:left;
  background:#fff;
  z-index:100;
}
.vv-tab .item{
  text-align:left;
  box-sizing:border-box;
  padding:0 5%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
}
.vv-tab .item.cur {
  color: #2196f3;
}
</style>