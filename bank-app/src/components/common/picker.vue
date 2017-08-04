<template>
  <div class="vv-tab">
    <ul class="tabs">
      <li  v-for="(pick, index) in pickList" :key="index" :class="['tab', {'current': isShow && (curPickIdx === index)}]" :style="{width: tabWidth}">
        <div class="value" @click="openPick(pick, index)">{{pick.curVal.name}}</div>
        <ul class="items" v-show="isShow && (index === curPickIdx)">
          <li :class="['item', {'cur': idx === pick.curIdx}]" @click.stop="pickClick(item, index)" v-for="(item, idx) in pick.list" :key="idx">{{item.name}}</li>
        </ul>
      </li>
    </ul>
    <div class="mask" v-show="isShow" @click.stop="closePick"></div>
  </div>
</template>
<script>
export default {
  name: 'commonPicker',
  props: {
    picks: {
      type: Array,
      default: []
    },
    curPick: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      curPickIdx: 0
    };
  },
  computed: {
    pickList() {
      let self = this;
      this.picks.forEach((item, index) => {
        item.curIdx = 0;
        for (let i = 0, len = item.list.length; i < len; i++) {
          if (self.curPick === item.list[i].value) {
            item.curVal = item.list[i];
            break;
          }
        }
        if (typeof item.curVal === 'undefined') {
          item.curVal = item.list[0];
        }
      });
      return this.picks;
    },
    tabWidth() {
      return 100 / this.pickList.length + '%';
    }
  },
  methods: {
    openPick(item, index) {
      if (this.curPickIdx == index) {
        this.isShow = !this.isShow;
      } else {
        this.isShow = true;
      }
      this.curPickIdx = index;
    },
    closePick() {
      this.isShow = false;
    },
    pickClick(item, index) {
      this.isShow = false;
      this.picks[index].curVal = item;
      this.$emit('checkedPick', item.value);
    }
  }
}
</script>
<style scoped>
.vv-tab {
  position:relative;
  width:100%;
  box-sizing: border-box;
  height: 48px;
  padding: 5px 20px;
  border-bottom: 1px solid #f0f0f0;
  background:#fff;
  z-index: 999;
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
.vv-tab .tab.current .value{
  color: #2196f3;
}
.vv-tab .tab.current .value:after{
  margin-top:0;
  border-top:0;
  border-bottom: 5px solid #2196f3;
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
  padding:0 20px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}
.vv-tab .item.cur {
  color: #2196f3;
}
.mask {
  position: fixed;
  top: 104px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
}
</style>