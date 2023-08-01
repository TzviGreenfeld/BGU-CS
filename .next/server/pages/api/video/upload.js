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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"csrf\": () => (/* binding */ csrf),\n/* harmony export */   \"setup\": () => (/* binding */ setup)\n/* harmony export */ });\n/* harmony import */ var next_csrf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-csrf */ \"next-csrf\");\n/* harmony import */ var next_csrf__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_csrf__WEBPACK_IMPORTED_MODULE_0__);\n\nconst { csrf , setup  } = (0,next_csrf__WEBPACK_IMPORTED_MODULE_0__.nextCsrf)({\n    secret: process.env.SECRET\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9DU1JGL2NzcmZfc2V0dXAudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNxQztBQUVyQyxNQUFNLEVBQUVDLEtBQUksRUFBRUMsTUFBSyxFQUFFLEdBQUdGLG1EQUFRQSxDQUFDO0lBQ2hDRyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLE1BQU07QUFDM0I7QUFFdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWxsby1uZXh0Ly4vQ1NSRi9jc3JmX3NldHVwLnRzPzIwYjgiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IG5leHRDc3JmIH0gZnJvbSBcIm5leHQtY3NyZlwiO1xyXG5cclxuY29uc3QgeyBjc3JmLCBzZXR1cCB9ID0gbmV4dENzcmYoe1xyXG4gc2VjcmV0OiBwcm9jZXNzLmVudi5TRUNSRVQsXHJcbn0pO1xyXG5cclxuZXhwb3J0IHsgY3NyZiwgc2V0dXAgfTsiXSwibmFtZXMiOlsibmV4dENzcmYiLCJjc3JmIiwic2V0dXAiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./CSRF/csrf_setup.ts\n");

/***/ }),

/***/ "(api)/./pages/api/video/upload.js":
/*!***********************************!*\
  !*** ./pages/api/video/upload.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"cloudinary\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../CSRF/csrf_setup */ \"(api)/./CSRF/csrf_setup.ts\");\n\n\n\n// Configuration\ncloudinary__WEBPACK_IMPORTED_MODULE_0___default().config({\n    cloud_name: \"dicczqmkf\",\n    api_key: \"925565169647495\",\n    api_secret: \"C8M8mB3L_lWmOpOUwhzlbGzZiEA\"\n});\nconst config = {\n    api: {\n        bodyParser: false\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    const data = await new Promise((resolve, reject)=>{\n        const form = new formidable__WEBPACK_IMPORTED_MODULE_1__.IncomingForm();\n        form.parse(req, (err, fields, files)=>{\n            if (err) return reject(err);\n            resolve({\n                fields,\n                files\n            });\n        });\n    });\n    const file = data?.files?.inputFile.filepath;\n    try {\n        const response = await cloudinary__WEBPACK_IMPORTED_MODULE_0___default().v2.uploader.upload(file, {\n            resource_type: \"auto\",\n            public_id: data?.public_id\n        });\n        return res.json(response);\n    } catch (error) {\n        console.log(\"Error\", error);\n        return res.json(error);\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdmlkZW8vdXBsb2FkLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBbUM7QUFDTTtBQUNNO0FBRS9DO0FBQ0FBLHdEQUFpQixDQUFDO0lBQ2hCSSxZQUFZO0lBQ1pDLFNBQVM7SUFDVEMsWUFBWTtBQUNkO0FBRU8sTUFBTUgsU0FBUztJQUNwQkksS0FBSztRQUNIQyxZQUFZO0lBQ2Q7QUFDRixFQUFDO0FBRUQsaUVBQWUsT0FBT0MsS0FBS0MsTUFBUTtJQUNqQyxNQUFNQyxPQUFPLE1BQU0sSUFBSUMsUUFBUSxDQUFDQyxTQUFTQyxTQUFXO1FBQ2xELE1BQU1DLE9BQU8sSUFBSWQsb0RBQVlBO1FBRTdCYyxLQUFLQyxLQUFLLENBQUNQLEtBQUssQ0FBQ1EsS0FBS0MsUUFBUUMsUUFBVTtZQUN0QyxJQUFJRixLQUFLLE9BQU9ILE9BQU9HO1lBQ3ZCSixRQUFRO2dCQUFFSztnQkFBUUM7WUFBTTtRQUMxQjtJQUNGO0lBRUEsTUFBTUMsT0FBT1QsTUFBTVEsT0FBT0UsVUFBVUMsUUFBUTtJQUM1QyxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNdkIsb0VBQTZCLENBQUNvQixNQUFNO1lBQ3pETyxlQUFlO1lBQ2ZDLFdBQVdqQixNQUFNaUI7UUFDbkI7UUFDQSxPQUFPbEIsSUFBSW1CLElBQUksQ0FBQ047SUFDbEIsRUFBRSxPQUFPTyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQyxTQUFTRjtRQUNyQixPQUFPcEIsSUFBSW1CLElBQUksQ0FBQ0M7SUFDbEI7QUFDRixHQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL3BhZ2VzL2FwaS92aWRlby91cGxvYWQuanM/YTJmNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvdWRpbmFyeSBmcm9tIFwiY2xvdWRpbmFyeVwiO1xyXG5pbXBvcnQgeyBJbmNvbWluZ0Zvcm0gfSBmcm9tIFwiZm9ybWlkYWJsZVwiO1xyXG5pbXBvcnQgeyBjc3JmIH0gZnJvbSBcIi4uLy4uLy4uL0NTUkYvY3NyZl9zZXR1cFwiO1xyXG5cclxuLy8gQ29uZmlndXJhdGlvblxyXG5jbG91ZGluYXJ5LmNvbmZpZyh7XHJcbiAgY2xvdWRfbmFtZTogXCJkaWNjenFta2ZcIixcclxuICBhcGlfa2V5OiBcIjkyNTU2NTE2OTY0NzQ5NVwiLFxyXG4gIGFwaV9zZWNyZXQ6IFwiQzhNOG1CM0xfbFdtT3BPVXdoemxiR3paaUVBXCIsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICBhcGk6IHtcclxuICAgIGJvZHlQYXJzZXI6IGZhbHNlLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgZm9ybSA9IG5ldyBJbmNvbWluZ0Zvcm0oKTtcclxuXHJcbiAgICBmb3JtLnBhcnNlKHJlcSwgKGVyciwgZmllbGRzLCBmaWxlcykgPT4ge1xyXG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XHJcbiAgICAgIHJlc29sdmUoeyBmaWVsZHMsIGZpbGVzIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZpbGUgPSBkYXRhPy5maWxlcz8uaW5wdXRGaWxlLmZpbGVwYXRoO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsb3VkaW5hcnkudjIudXBsb2FkZXIudXBsb2FkKGZpbGUsIHtcclxuICAgICAgcmVzb3VyY2VfdHlwZTogXCJhdXRvXCIsXHJcbiAgICAgIHB1YmxpY19pZDogZGF0YT8ucHVibGljX2lkLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLmpzb24ocmVzcG9uc2UpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIsIGVycm9yKTtcclxuICAgIHJldHVybiByZXMuanNvbihlcnJvcik7XHJcbiAgfVxyXG59O1xyXG5cclxuIl0sIm5hbWVzIjpbImNsb3VkaW5hcnkiLCJJbmNvbWluZ0Zvcm0iLCJjc3JmIiwiY29uZmlnIiwiY2xvdWRfbmFtZSIsImFwaV9rZXkiLCJhcGlfc2VjcmV0IiwiYXBpIiwiYm9keVBhcnNlciIsInJlcSIsInJlcyIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZvcm0iLCJwYXJzZSIsImVyciIsImZpZWxkcyIsImZpbGVzIiwiZmlsZSIsImlucHV0RmlsZSIsImZpbGVwYXRoIiwicmVzcG9uc2UiLCJ2MiIsInVwbG9hZGVyIiwidXBsb2FkIiwicmVzb3VyY2VfdHlwZSIsInB1YmxpY19pZCIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/video/upload.js\n");

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