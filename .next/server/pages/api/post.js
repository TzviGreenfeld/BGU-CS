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
exports.id = "pages/api/post";
exports.ids = ["pages/api/post"];
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

/***/ "(api)/./pages/api/post/index.ts":
/*!*********************************!*\
  !*** ./pages/api/post/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var _CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../CSRF/csrf_setup */ \"(api)/./CSRF/csrf_setup.ts\");\n\n\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n// POST /api/post\n// Required fields in body: title\n// Optional fields in body: content\nconst handler = async (req, res)=>{\n    const { title , content , email , id , link  } = req.body;\n    const cookie = req.cookies.cookie;\n    if (cookie) {\n        const token = JSON.parse(cookie).token;\n        const decodedToken = jwt.verify(token, process.env.SECRET);\n        const user = decodedToken;\n        //console.log( req.body);\n        if (decodedToken.id) {\n            // WAS SESSION\n            const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.findUnique({\n                where: {\n                    id: decodedToken.id\n                }\n            });\n            const result = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post.create({\n                data: {\n                    title: title,\n                    content: content,\n                    author: {\n                        connect: {\n                            email: user.email\n                        }\n                    },\n                    videoId: id,\n                    videoLink: link\n                }\n            });\n            res.json(result);\n        } else {\n            res.status(401).send({\n                message: \"Unauthorized\"\n            });\n        }\n    } else {\n        res.status(401).send({\n            message: \"Unauthorized\"\n        });\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__.csrf)(handler));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcG9zdC9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDd0M7QUFDTztBQUMvQyxNQUFNRSxNQUFNQyxtQkFBT0EsQ0FBQyxrQ0FBYztBQUdsQztBQUNBO0FBQ0E7QUFDQSxNQUFNQyxVQUFVLE9BQ2RDLEtBQ0FDLE1BQ0c7SUFDSCxNQUFNLEVBQUVDLE1BQUFBLEVBQU9DLFFBQUFBLEVBQVNDLE1BQUFBLEVBQU9DLEdBQUFBLEVBQUlDLEtBQUFBLEVBQU0sR0FBR04sSUFBSU8sSUFBSTtJQUVwRCxNQUFNQyxTQUFTUixJQUFJUyxPQUFPLENBQUNELE1BQU07SUFDakMsSUFBSUEsUUFBUTtRQUNWLE1BQU1FLFFBQVFDLEtBQUtDLEtBQUssQ0FBQ0osUUFBUUUsS0FBSztRQUN0QyxNQUFNRyxlQUFlaEIsSUFBSWlCLE1BQU0sQ0FBQ0osT0FBT0ssUUFBUUMsR0FBRyxDQUFDQyxNQUFNO1FBQ3pELE1BQU1DLE9BQU9MO1FBRWI7UUFDQSxJQUFJQSxhQUFhUixFQUFFLEVBQUU7WUFFbkI7WUFDQSxNQUFNYSxPQUFPLE1BQU12QixtRUFBc0IsQ0FBQztnQkFDeEN5QixPQUFPO29CQUNMZixJQUFJUSxhQUFhUixFQUFBQTtnQkFDbkI7WUFDRjtZQUVBLE1BQU1nQixTQUFTLE1BQU0xQiwrREFBa0IsQ0FBQztnQkFDdEM2QixNQUFNO29CQUNKdEIsT0FBT0E7b0JBQ1BDLFNBQVNBO29CQUNUc0IsUUFBUTt3QkFBRUMsU0FBUzs0QkFBRXRCLE9BQU9jLEtBQUtkLEtBQUFBO3dCQUFNO29CQUFFO29CQUN6Q3VCLFNBQVN0QjtvQkFDVHVCLFdBQVd0QjtnQkFDYjtZQUNGO1lBQ0FMLElBQUk0QixJQUFJLENBQUNSO1FBQ1gsT0FBTztZQUNMcEIsSUFBSTZCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBZTtRQUNqRDtJQUNGLE9BQU87UUFDTC9CLElBQUk2QixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBZTtJQUNqRDtBQUNGO0FBRUEsaUVBQWVwQyxzREFBSUEsQ0FBQ0csUUFBUUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5leHQvLi9wYWdlcy9hcGkvcG9zdC9pbmRleC50cz84M2Y1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XHJcbmltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uLy4uL2xpYi9wcmlzbWFcIjtcclxuaW1wb3J0IHsgY3NyZiB9IGZyb20gXCIuLi8uLi8uLi9DU1JGL2NzcmZfc2V0dXBcIjtcclxuY29uc3Qgand0ID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcclxuXHJcblxyXG4vLyBQT1NUIC9hcGkvcG9zdFxyXG4vLyBSZXF1aXJlZCBmaWVsZHMgaW4gYm9keTogdGl0bGVcclxuLy8gT3B0aW9uYWwgZmllbGRzIGluIGJvZHk6IGNvbnRlbnRcclxuY29uc3QgaGFuZGxlciA9IGFzeW5jKFxyXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXHJcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2VcclxuKSA9PiB7XHJcbiAgY29uc3QgeyB0aXRsZSwgY29udGVudCwgZW1haWwsIGlkLCBsaW5rIH0gPSByZXEuYm9keTtcclxuXHJcbiAgY29uc3QgY29va2llID0gcmVxLmNvb2tpZXMuY29va2llO1xyXG4gIGlmIChjb29raWUpIHtcclxuICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShjb29raWUpLnRva2VuO1xyXG4gICAgY29uc3QgZGVjb2RlZFRva2VuID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuU0VDUkVUKTtcclxuICAgIGNvbnN0IHVzZXIgPSBkZWNvZGVkVG9rZW47XHJcbiAgXHJcbiAgICAvL2NvbnNvbGUubG9nKCByZXEuYm9keSk7XHJcbiAgICBpZiAoZGVjb2RlZFRva2VuLmlkKSB7XHJcblxyXG4gICAgICAvLyBXQVMgU0VTU0lPTlxyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgIGlkOiBkZWNvZGVkVG9rZW4uaWRcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByaXNtYS5wb3N0LmNyZWF0ZSh7XHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgY29udGVudDogY29udGVudCxcclxuICAgICAgICAgIGF1dGhvcjogeyBjb25uZWN0OiB7IGVtYWlsOiB1c2VyLmVtYWlsIH0gfSxcclxuICAgICAgICAgIHZpZGVvSWQ6IGlkLFxyXG4gICAgICAgICAgdmlkZW9MaW5rOiBsaW5rLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXMuanNvbihyZXN1bHQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoeyBtZXNzYWdlOiBcIlVuYXV0aG9yaXplZFwiIH0pO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IG1lc3NhZ2U6IFwiVW5hdXRob3JpemVkXCIgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjc3JmKGhhbmRsZXIpOyAiXSwibmFtZXMiOlsicHJpc21hIiwiY3NyZiIsImp3dCIsInJlcXVpcmUiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwidGl0bGUiLCJjb250ZW50IiwiZW1haWwiLCJpZCIsImxpbmsiLCJib2R5IiwiY29va2llIiwiY29va2llcyIsInRva2VuIiwiSlNPTiIsInBhcnNlIiwiZGVjb2RlZFRva2VuIiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVCIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJyZXN1bHQiLCJwb3N0IiwiY3JlYXRlIiwiZGF0YSIsImF1dGhvciIsImNvbm5lY3QiLCJ2aWRlb0lkIiwidmlkZW9MaW5rIiwianNvbiIsInN0YXR1cyIsInNlbmQiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/post/index.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/post/index.ts"));
module.exports = __webpack_exports__;

})();