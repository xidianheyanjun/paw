<template>
  <div id="map" class="map">
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  let HYMap = {}; 
  export default {
    name: 'map',
    computed: mapGetters([
      'gdmap'
    ]),
    components: {},
    mounted(){
      let self = this;
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            history.back(-1);
            // window.location.href = "#/home/index";
          }
        },
        center: {
          img: "",
          title: "地图",
          callback: null
        }
        // right: {
        //   img: "",
        //   title: "地图",
        //   callback: function () {
        //   }
        // }
      });
      this.userLocation = this.gdmap.userLocation;
      this.nearbank = this.gdmap.nearbank;
      this.initMap();

      // console.log("create map");
      // let map = new AMap.Map('map', {
      //   resizeEnable: true
      // });

      // console.warn(self.gdmap);
      // map.plugin(["AMap.Geolocation"], function () {
      //   let geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //     timeout: 100000,          //超过10秒后停止定位，默认：无穷大
      //     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      //     buttonPosition: 'RB'
      //   });
      //   console.log('AMap.Geolocation %o', geolocation);
      //   map.addControl(geolocation);
      //   geolocation.getCurrentPosition();
      //   AMap.event.addListener(geolocation, 'error', function (err) {
      //     console.log('AMap.Geolocation err %o', err);
      //     self.$store.dispatch('box_set_toast', {
      //       show: true,
      //       toastText: '定位失败'
      //     });
      //     return;
      //   });
      //   AMap.event.addListener(geolocation, 'complete', function (result) {
      //     console.log('AMap.Geolocation complete %o', result);
      //     self.$store.dispatch('gdmap_setUserLocation', result);
      //     AMap.service(['AMap.PlaceSearch', 'AMap.Walking'], function () {//回调函数
      //       let placeSearch = new AMap.PlaceSearch({
      //         pageSize: 50,
      //         pageIndex: 1,
      //         city: result.city, //城市
      //         map: map,
      //         panel: ""
      //       });

            // placeSearch.searchNearBy('银行', new AMap.LngLat(result.position.getLng(), result.position.getLat()), 5000, function (statusSearch, resultSearch) {
            //   console.log(statusSearch);
            //   console.log(resultSearch);
              
            //   self.$store.dispatch('gdmap_setNearbank', resultSearch.poiList);
            //   self.$emit('fetchMapNearbanks', resultSearch.poiList.pois);
            //   let walking = new AMap.Walking({
            //     map: map,
            //     panel: ""
            //   });

            //   console.log("search location");
            //   walking.search(new AMap.LngLat(result.position.getLng(), result.position.getLat()), new AMap.LngLat(resultSearch.poiList.pois[0].location.lng, resultSearch.poiList.pois[0].location.lat));
            // });
          // });
      //   });
      // });
    },
    methods: {
      initMap() {
        console.log("create map");
        HYMap = new AMap.Map('map', {
          resizeEnable: true
        });
        console.warn('userLocation o%', this.userLocation)
        console.warn('nearbank o%', this.nearbank)
        if (!this.userLocation.position) {
          this.geolocationUserLocation();
        } else {
          if (!this.nearbank.pois.length) {
            this.placeSearchMap(this.userLocation);
            return;
          }
        }
        let lat = this.$route.query['lat'];
        let lng = this.$route.query['lng'];
        if (lat) {
          this.walkingMap(this.userLocation, {
            lat: lat,
            lng: lng
          });
        }
      },
      geolocationUserLocation() {
        console.warn('geolocationUserLocation');
        let self = this;
        HYMap.plugin(['AMap.Geolocation'], function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 100000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });
          console.log('AMap.Geolocation %o', geolocation);
          HYMap.addControl(geolocation);
          geolocation.getCurrentPosition();

          AMap.event.addListener(geolocation, 'error', function (err) {
            console.log('AMap.Geolocation err %o', err);
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '定位失败'
            });
            return;
          });

          AMap.event.addListener(geolocation, 'complete', function (result) {
            console.log('AMap.Geolocation complete %o', result);
            self.$store.dispatch('gdmap_setUserLocation', result);
            self.placeSearchMap(result);
          });
        });
      },
      placeSearchMap(result) {
        console.warn('placeSearchMap');
        let self = this;
        AMap.service(['AMap.PlaceSearch'], function () {//回调函数
          let placeSearch = new AMap.PlaceSearch({
            pageSize: 50,
            pageIndex: 1,
            city: result.city, //城市
            map: HYMap,
            panel: ''
          });
          placeSearch.searchNearBy('银行', new AMap.LngLat(result.position.getLng(), result.position.getLat()), 5000, function (statusSearch, resultSearch) {
            console.log(statusSearch);
            console.log(resultSearch);
            
            self.$store.dispatch('gdmap_setNearbank', resultSearch.poiList);
            self.$emit('fetchMapNearbanks', resultSearch.poiList);
            // self.walkingMap(result, resultSearch.poiList.pois[0]);// 定位最近的一个银行
          });
        });
      },
      walkingMap(result, resultSearchPoi) {
        console.warn('walkingMap');
        console.warn('result o%', result);
        console.warn('resultSearchPoi o%', resultSearchPoi);
        AMap.service(['AMap.Walking'], function () {
          let walking = new AMap.Walking({
            map: HYMap,
            panel: ''
          });
          walking.search(
            new AMap.LngLat(result.position.lng, result.position.lat),
            new AMap.LngLat(resultSearchPoi.lng, resultSearchPoi.lat)
          );
        });
      },
      searchNearBanks() {
        
      }
    }
  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
