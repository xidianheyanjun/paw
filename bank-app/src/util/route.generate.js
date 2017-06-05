/**
 * Created by Administrator on 2017/6/4.
 */
"use strict"
let fs = require("fs");
let path = require("path");
let sourceDir = process.argv[2];
let targetFile = path.join(path.dirname(__dirname), process.argv[3]);

// ----------------解析映射----------------
let listFilePath = (path, pathRegular)=> {
  let filePaths = [];
  if (!fs.existsSync(path)) {
    return filePaths;
  }

  let stat = fs.lstatSync(path);
  if (stat.isDirectory()) {
    // 如果是目录则获取文件列表继续递归
    let files = fs.readdirSync(path);
    files.forEach(function (file) {
      let controllerPaths = listFilePath(path + "/" + file, pathRegular);
      filePaths = filePaths.concat(controllerPaths);
    });
  } else {
    if (pathRegular) {
      if (pathRegular.test(path)) {
        filePaths.push(path);
      }
    } else {
      filePaths.push(path);
    }
  }

  return filePaths;
};

// 获取所有组件路径
let componentsDir = path.join(path.dirname(__dirname), sourceDir);
let componentsPathRegular = new RegExp("\\w+.vue$");
let componentsPaths = listFilePath(componentsDir, componentsPathRegular);
let routeConfigData = [];
let dirName = "entry";
componentsPaths.forEach((path)=> {
  let indexStart = path.indexOf(dirName) + dirName.length;
  let indexPoint = path.indexOf(".");
  let filePath = path.substring(indexStart, indexPoint);
  let routeData = `path:"${filePath}",name:"${filePath}",component:resolve => require(["@/entry${filePath}"], resolve)`;
  routeConfigData.push("{" + routeData + "}");
});
fs.writeFileSync(targetFile, "export default [" + routeConfigData.join(",") + "]");
