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
exports.id = "pages/api/publish/[id]";
exports.ids = ["pages/api/publish/[id]"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

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

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"prisma\": () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// PrismaClient is attached to the `global` object in development to prevent\n// exhausting your database connection limit.\n//\n// Learn more:\n// https://pris.ly/d/help/next-js-best-practices\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBNkM7QUFFN0MsNEVBQTRFO0FBQzVFLDZDQUE2QztBQUM3QyxFQUFFO0FBQ0YsY0FBYztBQUNkLGdEQUFnRDtBQUVoRCxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQTtBQUVwRSxpRUFBZUEsTUFBTUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5leHQvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXHJcblxyXG4vLyBQcmlzbWFDbGllbnQgaXMgYXR0YWNoZWQgdG8gdGhlIGBnbG9iYWxgIG9iamVjdCBpbiBkZXZlbG9wbWVudCB0byBwcmV2ZW50XHJcbi8vIGV4aGF1c3RpbmcgeW91ciBkYXRhYmFzZSBjb25uZWN0aW9uIGxpbWl0LlxyXG4vL1xyXG4vLyBMZWFybiBtb3JlOlxyXG4vLyBodHRwczovL3ByaXMubHkvZC9oZWxwL25leHQtanMtYmVzdC1wcmFjdGljZXNcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbCBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfVxyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCgpXHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hXHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWwiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/publish/[id].ts":
/*!***********************************!*\
  !*** ./pages/api/publish/[id].ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var _CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../CSRF/csrf_setup */ \"(api)/./CSRF/csrf_setup.ts\");\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\n// PUT /api/publish/:id\nconst handler = async (req, res)=>{\n    const postId = req.query.id;\n    // const session = await getSession({ req }) // WAS SESSION\n    const cookie = req.cookies.cookie;\n    if (cookie) {\n        const token = JSON.parse(cookie).token;\n        const decodedToken = jwt.verify(token, process.env.SECRET);\n        if (decodedToken.id) {\n            // WAS SESSION\n            const post = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post.update({\n                where: {\n                    id: Number(postId)\n                },\n                data: {\n                    published: true\n                }\n            });\n            res.json(post);\n        } else {\n            res.status(401).send({\n                message: \"Unauthorized\"\n            });\n        }\n    } else {\n        res.status(401).send({\n            message: \"Unauthorized\"\n        });\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__.csrf)(handler));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcHVibGlzaC9baWRdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUN3QztBQUN4QyxNQUFNQyxNQUFNQyxtQkFBT0EsQ0FBQyxrQ0FBYztBQUNhO0FBRS9DO0FBQ0EsTUFBTUUsVUFBVyxPQUNmQyxLQUNBQyxNQUNHO0lBQ0gsTUFBTUMsU0FBU0YsSUFBSUcsS0FBSyxDQUFDQyxFQUFFO0lBQzNCO0lBRUEsTUFBTUMsU0FBU0wsSUFBSU0sT0FBTyxDQUFDRCxNQUFNO0lBRWpDLElBQUlBLFFBQVE7UUFDVixNQUFNRSxRQUFRQyxLQUFLQyxLQUFLLENBQUNKLFFBQVFFLEtBQUs7UUFFdEMsTUFBTUcsZUFBZWQsSUFBSWUsTUFBTSxDQUFDSixPQUFPSyxRQUFRQyxHQUFHLENBQUNDLE1BQU07UUFFekQsSUFBSUosYUFBYU4sRUFBRSxFQUFFO1lBQ25CO1lBRUEsTUFBTVcsT0FBTyxNQUFNcEIsK0RBQWtCLENBQUM7Z0JBQ3BDc0IsT0FBTztvQkFBRWIsSUFBSWMsT0FBT2hCO2dCQUFRO2dCQUM1QmlCLE1BQU07b0JBQUVDLFdBQVc7Z0JBQUs7WUFDMUI7WUFDQW5CLElBQUlvQixJQUFJLENBQUNOO1FBQ1gsT0FBTztZQUNMZCxJQUFJcUIsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFlO1FBQ2pEO0lBQ0YsT0FBTztRQUNMdkIsSUFBSXFCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFlO0lBQ2pEO0FBQ0Y7QUFDQSxpRUFBZTFCLHNEQUFJQSxDQUFDQyxRQUFRQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL3BhZ2VzL2FwaS9wdWJsaXNoL1tpZF0udHM/ZWRhNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xyXG5pbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi9saWIvcHJpc21hXCI7XHJcbmNvbnN0IGp3dCA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XHJcbmltcG9ydCB7IGNzcmYgfSBmcm9tIFwiLi4vLi4vLi4vQ1NSRi9jc3JmX3NldHVwXCI7XHJcblxyXG4vLyBQVVQgL2FwaS9wdWJsaXNoLzppZFxyXG5jb25zdCBoYW5kbGVyID0gIGFzeW5jIChcclxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxyXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXHJcbikgPT4ge1xyXG4gIGNvbnN0IHBvc3RJZCA9IHJlcS5xdWVyeS5pZDtcclxuICAvLyBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2Vzc2lvbih7IHJlcSB9KSAvLyBXQVMgU0VTU0lPTlxyXG5cclxuICBjb25zdCBjb29raWUgPSByZXEuY29va2llcy5jb29raWU7XHJcbiAgXHJcbiAgaWYgKGNvb2tpZSkge1xyXG4gICAgY29uc3QgdG9rZW4gPSBKU09OLnBhcnNlKGNvb2tpZSkudG9rZW47XHJcbiBcclxuICAgIGNvbnN0IGRlY29kZWRUb2tlbiA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LlNFQ1JFVCk7XHJcblxyXG4gICAgaWYgKGRlY29kZWRUb2tlbi5pZCkge1xyXG4gICAgICAvLyBXQVMgU0VTU0lPTlxyXG5cclxuICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IHByaXNtYS5wb3N0LnVwZGF0ZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgaWQ6IE51bWJlcihwb3N0SWQpIH0sXHJcbiAgICAgICAgZGF0YTogeyBwdWJsaXNoZWQ6IHRydWUgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJlcy5qc29uKHBvc3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoeyBtZXNzYWdlOiBcIlVuYXV0aG9yaXplZFwiIH0pO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IG1lc3NhZ2U6IFwiVW5hdXRob3JpemVkXCIgfSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNzcmYoaGFuZGxlcik7ICJdLCJuYW1lcyI6WyJwcmlzbWEiLCJqd3QiLCJyZXF1aXJlIiwiY3NyZiIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJwb3N0SWQiLCJxdWVyeSIsImlkIiwiY29va2llIiwiY29va2llcyIsInRva2VuIiwiSlNPTiIsInBhcnNlIiwiZGVjb2RlZFRva2VuIiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVCIsInBvc3QiLCJ1cGRhdGUiLCJ3aGVyZSIsIk51bWJlciIsImRhdGEiLCJwdWJsaXNoZWQiLCJqc29uIiwic3RhdHVzIiwic2VuZCIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/publish/[id].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/publish/[id].ts"));
module.exports = __webpack_exports__;

})();