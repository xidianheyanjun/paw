import _common_map from "@/entry/common/map";import _home_index from "@/entry/home/index";import _sample_infinite from "@/entry/sample/infinite";export default [{path: "/common/map", name:"/common/map", component: _common_map},{path: "/home/index", name:"/home/index", component: _home_index},{path: "/sample/infinite", name:"/sample/infinite", component: _sample_infinite},{path: "*", redirect: {name: "/home/index"}}]