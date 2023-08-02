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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst videoMetadataSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    user: String,\n    uploadDate: String,\n    postId: String,\n    cloudinaryLink: String\n});\nconst VideoMetadata = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.VideoMetadata || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"VideoMetadata\", videoMetadataSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideoMetadata);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbHMvbWV0YWRhdGFNb2RlbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBaUQ7QUFFakQsTUFBTUcsc0JBQXNCLElBQUlILDRDQUFNQSxDQUFDO0lBQ3JDSSxNQUFNQztJQUNOQyxZQUFZRDtJQUNaRSxRQUFRRjtJQUNSRyxnQkFBZ0JIO0FBQ2xCO0FBRUEsTUFBTUksZ0JBQ0pQLDBEQUFvQixJQUFJRCwrQ0FBS0EsQ0FBQyxpQkFBaUJFO0FBQ2pELGlFQUFlTSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL21vZGVscy9tZXRhZGF0YU1vZGVsLnRzP2IzOWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hLCBtb2RlbCwgbW9kZWxzIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IHZpZGVvTWV0YWRhdGFTY2hlbWEgPSBuZXcgU2NoZW1hKHtcbiAgdXNlcjogU3RyaW5nLFxuICB1cGxvYWREYXRlOiBTdHJpbmcsXG4gIHBvc3RJZDogU3RyaW5nLCBcbiAgY2xvdWRpbmFyeUxpbms6IFN0cmluZyxcbn0pO1xuXG5jb25zdCBWaWRlb01ldGFkYXRhID1cbiAgbW9kZWxzLlZpZGVvTWV0YWRhdGEgfHwgbW9kZWwoXCJWaWRlb01ldGFkYXRhXCIsIHZpZGVvTWV0YWRhdGFTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgVmlkZW9NZXRhZGF0YTtcbiJdLCJuYW1lcyI6WyJTY2hlbWEiLCJtb2RlbCIsIm1vZGVscyIsInZpZGVvTWV0YWRhdGFTY2hlbWEiLCJ1c2VyIiwiU3RyaW5nIiwidXBsb2FkRGF0ZSIsInBvc3RJZCIsImNsb3VkaW5hcnlMaW5rIiwiVmlkZW9NZXRhZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./models/metadataModel.ts\n");

/***/ }),

/***/ "(api)/./pages/api/metadata/index.ts":
/*!*************************************!*\
  !*** ./pages/api/metadata/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _utils_connectMongo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/connectMongo */ \"(api)/./utils/connectMongo.ts\");\n/* harmony import */ var _models_metadataModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/metadataModel */ \"(api)/./models/metadataModel.ts\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\n\n//POST /api/upload/:id\nasync function handle(req, res) {\n    if (req.method === \"POST\") {\n        const body = JSON.parse(req.body);\n        const { user , uploadDate , postId , cloudinaryLink  } = body;\n        console.log(\"parsed body for mongo: \");\n        console.log(JSON.stringify(body));\n        console.log(\"connecting to mongo..\");\n        await (0,_utils_connectMongo__WEBPACK_IMPORTED_MODULE_0__.connectMongo)();\n        console.log(\"connected\");\n        const video = new _models_metadataModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"](body);\n        video.save().then((result)=>{\n            console.log(\"video saved!\");\n            res.json(result);\n        }).catch((err)=>{\n            console.log(\"error saving video to mongodb: \", err);\n            res.status(500).send({\n                message: \"error saving video to mongodb\"\n            });\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbWV0YWRhdGEvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsTUFBTUEsV0FBV0MsbUJBQU9BLENBQUMsMEJBQVU7QUFDdUI7QUFDRDtBQUd6RDtBQUNlLGVBQWVHLE9BQzVCQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDcEI7SUFDQSxJQUFJRCxJQUFJRSxNQUFNLEtBQUssUUFBUTtRQUN6QixNQUFNQyxPQUFPQyxLQUFLQyxLQUFLLENBQUNMLElBQUlHLElBQUk7UUFFaEMsTUFBTSxFQUFFRyxLQUFBQSxFQUFNQyxXQUFBQSxFQUFZQyxPQUFBQSxFQUFRQyxlQUFBQSxFQUFnQixHQUFHTjtRQUVyRE8sUUFBUUMsR0FBRyxDQUFDO1FBQ1pELFFBQVFDLEdBQUcsQ0FBQ1AsS0FBS1EsU0FBUyxDQUFDVDtRQUUzQk8sUUFBUUMsR0FBRyxDQUFDO1FBQ1osTUFBTWQsaUVBQVlBO1FBQ2xCYSxRQUFRQyxHQUFHLENBQUM7UUFFWixNQUFNRSxRQUFRLElBQUlmLDZEQUFhQSxDQUFDSztRQUNoQ1UsTUFDR0MsSUFBSSxHQUNKQyxJQUFJLENBQUMsQ0FBQ0MsU0FBZ0I7WUFDckJOLFFBQVFDLEdBQUcsQ0FBQztZQUNaVixJQUFJZ0IsSUFBSSxDQUFDRDtRQUNYLEdBQ0NFLEtBQUssQ0FBQyxDQUFDQyxNQUFhO1lBQ25CVCxRQUFRQyxHQUFHLENBQUMsbUNBQW1DUTtZQUMvQ2xCLElBQUltQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWdDO1FBQ2xFO0lBQ0o7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5leHQvLi9wYWdlcy9hcGkvbWV0YWRhdGEvaW5kZXgudHM/NjUxZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKFwibW9uZ29vc2VcIik7XG5pbXBvcnQgeyBjb25uZWN0TW9uZ28gfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29ubmVjdE1vbmdvXCI7XG5pbXBvcnQgVmlkZW9NZXRhZGF0YSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL21ldGFkYXRhTW9kZWxcIjtcblxuXG4vL1BPU1QgL2FwaS91cGxvYWQvOmlkXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGUoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgY29uc3QgYm9keSA9IEpTT04ucGFyc2UocmVxLmJvZHkpO1xuXG4gICAgY29uc3QgeyB1c2VyLCB1cGxvYWREYXRlLCBwb3N0SWQsIGNsb3VkaW5hcnlMaW5rIH0gPSBib2R5O1xuXG4gICAgY29uc29sZS5sb2coXCJwYXJzZWQgYm9keSBmb3IgbW9uZ286IFwiKTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShib2R5KSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RpbmcgdG8gbW9uZ28uLlwiKTtcbiAgICBhd2FpdCBjb25uZWN0TW9uZ28oKTtcbiAgICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZFwiKTtcblxuICAgIGNvbnN0IHZpZGVvID0gbmV3IFZpZGVvTWV0YWRhdGEoYm9keSk7XG4gICAgdmlkZW9cbiAgICAgIC5zYXZlKClcbiAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInZpZGVvIHNhdmVkIVwiKTtcbiAgICAgICAgcmVzLmpzb24ocmVzdWx0KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3Igc2F2aW5nIHZpZGVvIHRvIG1vbmdvZGI6IFwiLCBlcnIpO1xuICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCh7IG1lc3NhZ2U6IFwiZXJyb3Igc2F2aW5nIHZpZGVvIHRvIG1vbmdvZGJcIiB9KTtcbiAgICAgIH0pO1xuICB9XG59XG5cbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJjb25uZWN0TW9uZ28iLCJWaWRlb01ldGFkYXRhIiwiaGFuZGxlIiwicmVxIiwicmVzIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJwYXJzZSIsInVzZXIiLCJ1cGxvYWREYXRlIiwicG9zdElkIiwiY2xvdWRpbmFyeUxpbmsiLCJjb25zb2xlIiwibG9nIiwic3RyaW5naWZ5IiwidmlkZW8iLCJzYXZlIiwidGhlbiIsInJlc3VsdCIsImpzb24iLCJjYXRjaCIsImVyciIsInN0YXR1cyIsInNlbmQiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/metadata/index.ts\n");

/***/ }),

/***/ "(api)/./utils/connectMongo.ts":
/*!*******************************!*\
  !*** ./utils/connectMongo.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connectMongo\": () => (/* binding */ connectMongo),\n/* harmony export */   \"disconnectMongo\": () => (/* binding */ disconnectMongo),\n/* harmony export */   \"url\": () => (/* binding */ url)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst url = \"mongodb+srv://tzvigreenfield:tzviGR112@cluster0.1jv4znb.mongodb.net/?retryWrites=true&w=majority\";\nmongoose.set(\"strictQuery\", false);\nconst connectMongo = async ()=>mongoose.connect(url);\nconst disconnectMongo = async ()=>mongoose.connection.close();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9jb25uZWN0TW9uZ28udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsTUFBTUEsV0FBV0MsbUJBQU9BLENBQUMsMEJBQVU7QUFFNUIsTUFBTUMsTUFDWCxtR0FBbUc7QUFFckdGLFNBQVNHLEdBQUcsQ0FBQyxlQUFlLEtBQUs7QUFHMUIsTUFBTUMsZUFBZSxVQUFZSixTQUFTSyxPQUFPLENBQUNILEtBQUs7QUFDdkQsTUFBTUksa0JBQWtCLFVBQVlOLFNBQVNPLFVBQVUsQ0FBQ0MsS0FBSyxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL3V0aWxzL2Nvbm5lY3RNb25nby50cz85YjM2Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuXG5leHBvcnQgY29uc3QgdXJsID1cbiAgXCJtb25nb2RiK3NydjovL3R6dmlncmVlbmZpZWxkOnR6dmlHUjExMkBjbHVzdGVyMC4xanY0em5iLm1vbmdvZGIubmV0Lz9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHlcIjtcblxubW9uZ29vc2Uuc2V0KFwic3RyaWN0UXVlcnlcIiwgZmFsc2UpO1xuXG4gICAgXG5leHBvcnQgY29uc3QgY29ubmVjdE1vbmdvID0gYXN5bmMgKCkgPT4gbW9uZ29vc2UuY29ubmVjdCh1cmwpO1xuZXhwb3J0IGNvbnN0IGRpc2Nvbm5lY3RNb25nbyA9IGFzeW5jICgpID0+IG1vbmdvb3NlLmNvbm5lY3Rpb24uY2xvc2UoKTtcblxuXG4gIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsInVybCIsInNldCIsImNvbm5lY3RNb25nbyIsImNvbm5lY3QiLCJkaXNjb25uZWN0TW9uZ28iLCJjb25uZWN0aW9uIiwiY2xvc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/connectMongo.ts\n");

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