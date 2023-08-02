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
exports.id = "pages/api/video/upload";
exports.ids = ["pages/api/video/upload"];
exports.modules = {

/***/ "cloudinary":
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("cloudinary");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("formidable");

/***/ }),

/***/ "next-csrf":
/*!****************************!*\
  !*** external "next-csrf" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-csrf");

/***/ }),

/***/ "(api)/./CSRF/csrf_setup.ts":
/*!****************************!*\
  !*** ./CSRF/csrf_setup.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"csrf\": () => (/* binding */ csrf),\n/* harmony export */   \"setup\": () => (/* binding */ setup)\n/* harmony export */ });\n/* harmony import */ var next_csrf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-csrf */ \"next-csrf\");\n/* harmony import */ var next_csrf__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_csrf__WEBPACK_IMPORTED_MODULE_0__);\n\nconst { csrf , setup  } = (0,next_csrf__WEBPACK_IMPORTED_MODULE_0__.nextCsrf)({\n    secret: process.env.SECRET\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9DU1JGL2NzcmZfc2V0dXAudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNxQztBQUVyQyxNQUFNLEVBQUVDLEtBQUksRUFBRUMsTUFBSyxFQUFFLEdBQUdGLG1EQUFRQSxDQUFDO0lBQ2hDRyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLE1BQU07QUFDM0I7QUFFdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWxsby1uZXh0Ly4vQ1NSRi9jc3JmX3NldHVwLnRzPzIwYjgiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBuZXh0Q3NyZiB9IGZyb20gXCJuZXh0LWNzcmZcIjtcblxuY29uc3QgeyBjc3JmLCBzZXR1cCB9ID0gbmV4dENzcmYoe1xuIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVULFxufSk7XG5cbmV4cG9ydCB7IGNzcmYsIHNldHVwIH07Il0sIm5hbWVzIjpbIm5leHRDc3JmIiwiY3NyZiIsInNldHVwIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./CSRF/csrf_setup.ts\n");

/***/ }),

/***/ "(api)/./pages/api/video/upload.js":
/*!***********************************!*\
  !*** ./pages/api/video/upload.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"cloudinary\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../CSRF/csrf_setup */ \"(api)/./CSRF/csrf_setup.ts\");\n\n\n\n// Configuration\ncloudinary__WEBPACK_IMPORTED_MODULE_0___default().config({\n    cloud_name: \"dicczqmkf\",\n    api_key: \"925565169647495\",\n    api_secret: \"C8M8mB3L_lWmOpOUwhzlbGzZiEA\"\n});\nconst config = {\n    api: {\n        bodyParser: false\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    const data = await new Promise((resolve, reject)=>{\n        const form = new formidable__WEBPACK_IMPORTED_MODULE_1__.IncomingForm();\n        form.parse(req, (err, fields, files)=>{\n            if (err) return reject(err);\n            resolve({\n                fields,\n                files\n            });\n        });\n    });\n    const file = data?.files?.inputFile.filepath;\n    try {\n        const response = await cloudinary__WEBPACK_IMPORTED_MODULE_0___default().v2.uploader.upload(file, {\n            resource_type: \"auto\",\n            public_id: data?.public_id\n        });\n        return res.json(response);\n    } catch (error) {\n        console.log(\"Error\", error);\n        return res.json(error);\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdmlkZW8vdXBsb2FkLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBbUM7QUFDTTtBQUNNO0FBRS9DO0FBQ0FBLHdEQUFpQixDQUFDO0lBQ2hCSSxZQUFZO0lBQ1pDLFNBQVM7SUFDVEMsWUFBWTtBQUNkO0FBRU8sTUFBTUgsU0FBUztJQUNwQkksS0FBSztRQUNIQyxZQUFZO0lBQ2Q7QUFDRixFQUFDO0FBRUQsaUVBQWUsT0FBT0MsS0FBS0MsTUFBUTtJQUNqQyxNQUFNQyxPQUFPLE1BQU0sSUFBSUMsUUFBUSxDQUFDQyxTQUFTQyxTQUFXO1FBQ2xELE1BQU1DLE9BQU8sSUFBSWQsb0RBQVlBO1FBRTdCYyxLQUFLQyxLQUFLLENBQUNQLEtBQUssQ0FBQ1EsS0FBS0MsUUFBUUMsUUFBVTtZQUN0QyxJQUFJRixLQUFLLE9BQU9ILE9BQU9HO1lBQ3ZCSixRQUFRO2dCQUFFSztnQkFBUUM7WUFBTTtRQUMxQjtJQUNGO0lBRUEsTUFBTUMsT0FBT1QsTUFBTVEsT0FBT0UsVUFBVUMsUUFBUTtJQUM1QyxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNdkIsb0VBQTZCLENBQUNvQixNQUFNO1lBQ3pETyxlQUFlO1lBQ2ZDLFdBQVdqQixNQUFNaUI7UUFDbkI7UUFDQSxPQUFPbEIsSUFBSW1CLElBQUksQ0FBQ047SUFDbEIsRUFBRSxPQUFPTyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRjtRQUNyQixPQUFPcEIsSUFBSW1CLElBQUksQ0FBQ0M7SUFDbEI7QUFDRixHQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL3BhZ2VzL2FwaS92aWRlby91cGxvYWQuanM/YTJmNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvdWRpbmFyeSBmcm9tIFwiY2xvdWRpbmFyeVwiO1xuaW1wb3J0IHsgSW5jb21pbmdGb3JtIH0gZnJvbSBcImZvcm1pZGFibGVcIjtcbmltcG9ydCB7IGNzcmYgfSBmcm9tIFwiLi4vLi4vLi4vQ1NSRi9jc3JmX3NldHVwXCI7XG5cbi8vIENvbmZpZ3VyYXRpb25cbmNsb3VkaW5hcnkuY29uZmlnKHtcbiAgY2xvdWRfbmFtZTogXCJkaWNjenFta2ZcIixcbiAgYXBpX2tleTogXCI5MjU1NjUxNjk2NDc0OTVcIixcbiAgYXBpX3NlY3JldDogXCJDOE04bUIzTF9sV21PcE9Vd2h6bGJHelppRUFcIixcbn0pO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBhcGk6IHtcbiAgICBib2R5UGFyc2VyOiBmYWxzZSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBkYXRhID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgSW5jb21pbmdGb3JtKCk7XG5cbiAgICBmb3JtLnBhcnNlKHJlcSwgKGVyciwgZmllbGRzLCBmaWxlcykgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgcmVzb2x2ZSh7IGZpZWxkcywgZmlsZXMgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IGZpbGUgPSBkYXRhPy5maWxlcz8uaW5wdXRGaWxlLmZpbGVwYXRoO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xvdWRpbmFyeS52Mi51cGxvYWRlci51cGxvYWQoZmlsZSwge1xuICAgICAgcmVzb3VyY2VfdHlwZTogXCJhdXRvXCIsXG4gICAgICBwdWJsaWNfaWQ6IGRhdGE/LnB1YmxpY19pZCxcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZXJyb3IpO1xuICAgIHJldHVybiByZXMuanNvbihlcnJvcik7XG4gIH1cbn07XG5cbiJdLCJuYW1lcyI6WyJjbG91ZGluYXJ5IiwiSW5jb21pbmdGb3JtIiwiY3NyZiIsImNvbmZpZyIsImNsb3VkX25hbWUiLCJhcGlfa2V5IiwiYXBpX3NlY3JldCIsImFwaSIsImJvZHlQYXJzZXIiLCJyZXEiLCJyZXMiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmb3JtIiwicGFyc2UiLCJlcnIiLCJmaWVsZHMiLCJmaWxlcyIsImZpbGUiLCJpbnB1dEZpbGUiLCJmaWxlcGF0aCIsInJlc3BvbnNlIiwidjIiLCJ1cGxvYWRlciIsInVwbG9hZCIsInJlc291cmNlX3R5cGUiLCJwdWJsaWNfaWQiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/video/upload.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/video/upload.js"));
module.exports = __webpack_exports__;

})();