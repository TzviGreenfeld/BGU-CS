"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/metadata";
exports.ids = ["pages/api/metadata"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./models/metadataModel.ts":
/*!*********************************!*\
  !*** ./models/metadataModel.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst videoMetadataSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    user: String,\n    uploadDate: String,\n    postId: String,\n    cloudinaryLink: String\n});\nconst VideoMetadata = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.VideoMetadata || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"VideoMetadata\", videoMetadataSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoMetadata);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvbWV0YWRhdGFNb2RlbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBaUQ7QUFFakQsTUFBTUcsc0JBQXNCLElBQUlILDRDQUFNQSxDQUFDO0lBQ3JDSSxNQUFNQztJQUNOQyxZQUFZRDtJQUNaRSxRQUFRRjtJQUNSRyxnQkFBZ0JIO0FBQ2xCO0FBRUEsTUFBTUksZ0JBQ0pQLDBEQUFvQixJQUFJRCwrQ0FBS0EsQ0FBQyxpQkFBaUJFO0FBQ2pELGlFQUFlTSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL21vZGVscy9tZXRhZGF0YU1vZGVsLnRzP2IzOWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hLCBtb2RlbCwgbW9kZWxzIH0gZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCB2aWRlb01ldGFkYXRhU2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgdXNlcjogU3RyaW5nLFxyXG4gIHVwbG9hZERhdGU6IFN0cmluZyxcclxuICBwb3N0SWQ6IFN0cmluZywgXHJcbiAgY2xvdWRpbmFyeUxpbms6IFN0cmluZyxcclxufSk7XHJcblxyXG5jb25zdCBWaWRlb01ldGFkYXRhID1cclxuICBtb2RlbHMuVmlkZW9NZXRhZGF0YSB8fCBtb2RlbChcIlZpZGVvTWV0YWRhdGFcIiwgdmlkZW9NZXRhZGF0YVNjaGVtYSk7XHJcbmV4cG9ydCBkZWZhdWx0IFZpZGVvTWV0YWRhdGE7XHJcbiJdLCJuYW1lcyI6WyJTY2hlbWEiLCJtb2RlbCIsIm1vZGVscyIsInZpZGVvTWV0YWRhdGFTY2hlbWEiLCJ1c2VyIiwiU3RyaW5nIiwidXBsb2FkRGF0ZSIsInBvc3RJZCIsImNsb3VkaW5hcnlMaW5rIiwiVmlkZW9NZXRhZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./models/metadataModel.ts\n");

/***/ }),

/***/ "(api)/./pages/api/metadata/index.ts":
/*!*************************************!*\
  !*** ./pages/api/metadata/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _utils_connectMongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/connectMongo */ \"(api)/./utils/connectMongo.ts\");\n/* harmony import */ var _models_metadataModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/metadataModel */ \"(api)/./models/metadataModel.ts\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\n\n//POST /api/upload/:id\nasync function handle(req, res) {\n    if (req.method === \"POST\") {\n        const body = JSON.parse(req.body);\n        const { user , uploadDate , postId , cloudinaryLink  } = body;\n        console.log(\"parsed body for mongo: \");\n        console.log(JSON.stringify(body));\n        console.log(\"connecting to mongo..\");\n        await (0,_utils_connectMongo__WEBPACK_IMPORTED_MODULE_0__.connectMongo)();\n        console.log(\"connected\");\n        const video = new _models_metadataModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"](body);\n        video.save().then((result)=>{\n            console.log(\"video saved!\");\n            res.json(result);\n        }).catch((err)=>{\n            console.log(\"error saving video to mongodb: \", err);\n            res.status(500).send({\n                message: \"error saving video to mongodb\"\n            });\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbWV0YWRhdGEvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsTUFBTUEsV0FBV0MsbUJBQU9BLENBQUMsMEJBQVU7QUFDdUI7QUFDRDtBQUd6RDtBQUNlLGVBQWVHLE9BQzVCQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDcEI7SUFDQSxJQUFJRCxJQUFJRSxNQUFNLEtBQUssUUFBUTtRQUN6QixNQUFNQyxPQUFPQyxLQUFLQyxLQUFLLENBQUNMLElBQUlHLElBQUk7UUFFaEMsTUFBTSxFQUFFRyxLQUFBQSxFQUFNQyxXQUFBQSxFQUFZQyxPQUFBQSxFQUFRQyxlQUFBQSxFQUFnQixHQUFHTjtRQUVyRE8sUUFBUUMsR0FBRyxDQUFDO1FBQ1pELFFBQVFDLEdBQUcsQ0FBQ1AsS0FBS1EsU0FBUyxDQUFDVDtRQUUzQk8sUUFBUUMsR0FBRyxDQUFDO1FBQ1osTUFBTWQsaUVBQVlBO1FBQ2xCYSxRQUFRQyxHQUFHLENBQUM7UUFFWixNQUFNRSxRQUFRLElBQUlmLDZEQUFhQSxDQUFDSztRQUNoQ1UsTUFDR0MsSUFBSSxHQUNKQyxJQUFJLENBQUMsQ0FBQ0MsU0FBZ0I7WUFDckJOLFFBQVFDLEdBQUcsQ0FBQztZQUNaVixJQUFJZ0IsSUFBSSxDQUFDRDtRQUNYLEdBQ0NFLEtBQUssQ0FBQyxDQUFDQyxNQUFhO1lBQ25CVCxRQUFRQyxHQUFHLENBQUMsbUNBQW1DUTtZQUMvQ2xCLElBQUltQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWdDO1FBQ2xFO0lBQ0o7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5leHQvLi9wYWdlcy9hcGkvbWV0YWRhdGEvaW5kZXgudHM/NjUxZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xyXG5jb25zdCBtb25nb29zZSA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTtcclxuaW1wb3J0IHsgY29ubmVjdE1vbmdvIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2Nvbm5lY3RNb25nb1wiO1xyXG5pbXBvcnQgVmlkZW9NZXRhZGF0YSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL21ldGFkYXRhTW9kZWxcIjtcclxuXHJcblxyXG4vL1BPU1QgL2FwaS91cGxvYWQvOmlkXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZShcclxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxyXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXHJcbikge1xyXG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xyXG4gICAgY29uc3QgYm9keSA9IEpTT04ucGFyc2UocmVxLmJvZHkpO1xyXG5cclxuICAgIGNvbnN0IHsgdXNlciwgdXBsb2FkRGF0ZSwgcG9zdElkLCBjbG91ZGluYXJ5TGluayB9ID0gYm9keTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInBhcnNlZCBib2R5IGZvciBtb25nbzogXCIpO1xyXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYm9keSkpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGluZyB0byBtb25nby4uXCIpO1xyXG4gICAgYXdhaXQgY29ubmVjdE1vbmdvKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZFwiKTtcclxuXHJcbiAgICBjb25zdCB2aWRlbyA9IG5ldyBWaWRlb01ldGFkYXRhKGJvZHkpO1xyXG4gICAgdmlkZW9cclxuICAgICAgLnNhdmUoKVxyXG4gICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZpZGVvIHNhdmVkIVwiKTtcclxuICAgICAgICByZXMuanNvbihyZXN1bHQpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBzYXZpbmcgdmlkZW8gdG8gbW9uZ29kYjogXCIsIGVycik7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoeyBtZXNzYWdlOiBcImVycm9yIHNhdmluZyB2aWRlbyB0byBtb25nb2RiXCIgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsImNvbm5lY3RNb25nbyIsIlZpZGVvTWV0YWRhdGEiLCJoYW5kbGUiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInBhcnNlIiwidXNlciIsInVwbG9hZERhdGUiLCJwb3N0SWQiLCJjbG91ZGluYXJ5TGluayIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmdpZnkiLCJ2aWRlbyIsInNhdmUiLCJ0aGVuIiwicmVzdWx0IiwianNvbiIsImNhdGNoIiwiZXJyIiwic3RhdHVzIiwic2VuZCIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/metadata/index.ts\n");

/***/ }),

/***/ "(api)/./utils/connectMongo.ts":
/*!*******************************!*\
  !*** ./utils/connectMongo.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connectMongo\": () => (/* binding */ connectMongo),\n/* harmony export */   \"disconnectMongo\": () => (/* binding */ disconnectMongo),\n/* harmony export */   \"url\": () => (/* binding */ url)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst url = \"mongodb+srv://tzvigreenfield:tzviGR112@cluster0.1jv4znb.mongodb.net/?retryWrites=true&w=majority\";\nmongoose.set(\"strictQuery\", false);\nconst connectMongo = async ()=>mongoose.connect(url);\nconst disconnectMongo = async ()=>mongoose.connection.close();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9jb25uZWN0TW9uZ28udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsTUFBTUEsV0FBV0MsbUJBQU9BLENBQUMsMEJBQVU7QUFFNUIsTUFBTUMsTUFDWCxtR0FBbUc7QUFFckdGLFNBQVNHLEdBQUcsQ0FBQyxlQUFlLEtBQUs7QUFHMUIsTUFBTUMsZUFBZSxVQUFZSixTQUFTSyxPQUFPLENBQUNILEtBQUs7QUFDdkQsTUFBTUksa0JBQWtCLFVBQVlOLFNBQVNPLFVBQVUsQ0FBQ0MsS0FBSyxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL3V0aWxzL2Nvbm5lY3RNb25nby50cz85YjM2Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVybCA9XHJcbiAgXCJtb25nb2RiK3NydjovL3R6dmlncmVlbmZpZWxkOnR6dmlHUjExMkBjbHVzdGVyMC4xanY0em5iLm1vbmdvZGIubmV0Lz9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHlcIjtcclxuXHJcbm1vbmdvb3NlLnNldChcInN0cmljdFF1ZXJ5XCIsIGZhbHNlKTtcclxuXHJcbiAgICBcclxuZXhwb3J0IGNvbnN0IGNvbm5lY3RNb25nbyA9IGFzeW5jICgpID0+IG1vbmdvb3NlLmNvbm5lY3QodXJsKTtcclxuZXhwb3J0IGNvbnN0IGRpc2Nvbm5lY3RNb25nbyA9IGFzeW5jICgpID0+IG1vbmdvb3NlLmNvbm5lY3Rpb24uY2xvc2UoKTtcclxuXHJcblxyXG4gIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsInVybCIsInNldCIsImNvbm5lY3RNb25nbyIsImNvbm5lY3QiLCJkaXNjb25uZWN0TW9uZ28iLCJjb25uZWN0aW9uIiwiY2xvc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/connectMongo.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/metadata/index.ts"));
module.exports = __webpack_exports__;

})();