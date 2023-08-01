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
exports.id = "pages/api/editImage";
exports.ids = ["pages/api/editImage"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

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

/***/ "(api)/./pages/api/editImage.tsx":
/*!*********************************!*\
  !*** ./pages/api/editImage.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var _CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../CSRF/csrf_setup */ \"(api)/./CSRF/csrf_setup.ts\");\n//import { User } from \"@prisma/client\";\n// import prisma from '../../lib/prisma'\n\n\n/**\r\n * allow use to edit his profile image in prisma\r\n */ //POST /api/editImage\nconst handler = async (req, res)=>{\n    if (req.method === \"POST\") {\n        const body = JSON.parse(req.body);\n        const { username , newImage  } = body;\n        // validation\n        if (!newImage) {\n            res.status(400).send({\n                message: \"no image provided\"\n            });\n        } else if (!newImage.includes(\"cloudinary\")) {\n            res.status(400).send({\n                message: \"invalid image link\"\n            });\n        } else {\n            // all good\n            try {\n                const updateUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.update({\n                    where: {\n                        userName: username\n                    },\n                    data: {\n                        image: newImage\n                    }\n                });\n                res.json(updateUser);\n            } catch (e) {\n                res.status(400).send({\n                    e\n                });\n            }\n        }\n    } else {\n        res.status(401).send({\n            message: \"this endpint only allows POST requests\"\n        });\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__.csrf)(handler));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZWRpdEltYWdlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ3FDO0FBQ087QUFHNUM7O0NBRUEsR0FDQTtBQUNBLE1BQU1FLFVBQVUsT0FDZEMsS0FDQUMsTUFDRTtJQUNGLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLE1BQU1DLE9BQU9DLEtBQUtDLEtBQUssQ0FBQ0wsSUFBSUcsSUFBSTtRQUVoQyxNQUFNLEVBQUVHLFNBQUFBLEVBQVVDLFNBQUFBLEVBQVUsR0FBR0o7UUFFL0I7UUFDQSxJQUFJLENBQUNJLFVBQVU7WUFDYk4sSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFvQjtRQUN0RCxPQUNLLElBQUksQ0FBQ0gsU0FBU0ksUUFBUSxDQUFDLGVBQWU7WUFDekNWLElBQUlPLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBcUI7UUFDdkQsT0FBTztZQUFFO1lBQ1AsSUFBSTtnQkFDRixNQUFNRSxhQUFhLE1BQU1mLCtEQUFrQixDQUFDO29CQUMxQ2tCLE9BQU87d0JBQ0xDLFVBQVVWO29CQUNaO29CQUNBVyxNQUFNO3dCQUNKQyxPQUFPWDtvQkFDVDtnQkFDRjtnQkFDQU4sSUFBSWtCLElBQUksQ0FBQ1A7WUFDWCxFQUFFLE9BQU9RLEdBQUc7Z0JBQ1ZuQixJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO29CQUFFVztnQkFBRTtZQUMzQjtRQUNGO0lBQ0YsT0FBTztRQUNMbkIsSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxTQUFTO1FBQXlDO0lBQzNFO0FBQ0Y7QUFFQSxpRUFBZVosc0RBQUlBLENBQUNDLFFBQVFBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWxsby1uZXh0Ly4vcGFnZXMvYXBpL2VkaXRJbWFnZS50c3g/Yjg1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xyXG4vL2ltcG9ydCB7IFVzZXIgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuLy8gaW1wb3J0IHByaXNtYSBmcm9tICcuLi8uLi9saWIvcHJpc21hJ1xyXG5pbXBvcnQgcHJpc21hIGZyb20gJy4uLy4uL2xpYi9wcmlzbWEnXHJcbmltcG9ydCB7IGNzcmYgfSBmcm9tIFwiLi4vLi4vQ1NSRi9jc3JmX3NldHVwXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIGFsbG93IHVzZSB0byBlZGl0IGhpcyBwcm9maWxlIGltYWdlIGluIHByaXNtYVxyXG4gKi9cclxuLy9QT1NUIC9hcGkvZWRpdEltYWdlXHJcbmNvbnN0IGhhbmRsZXIgPSBhc3luYyAoXHJcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcclxuICByZXM6IE5leHRBcGlSZXNwb25zZVxyXG4pPT4ge1xyXG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xyXG4gICAgY29uc3QgYm9keSA9IEpTT04ucGFyc2UocmVxLmJvZHkpO1xyXG5cclxuICAgIGNvbnN0IHsgdXNlcm5hbWUsIG5ld0ltYWdlIH0gPSBib2R5O1xyXG5cclxuICAgIC8vIHZhbGlkYXRpb25cclxuICAgIGlmICghbmV3SW1hZ2UpIHtcclxuICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoeyBtZXNzYWdlOiAnbm8gaW1hZ2UgcHJvdmlkZWQnIH0pXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghbmV3SW1hZ2UuaW5jbHVkZXMoXCJjbG91ZGluYXJ5XCIpKSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogJ2ludmFsaWQgaW1hZ2UgbGluaycgfSlcclxuICAgIH0gZWxzZSB7IC8vIGFsbCBnb29kXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XHJcbiAgICAgICAgICB3aGVyZToge1xyXG4gICAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBpbWFnZTogbmV3SW1hZ2UsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmVzLmpzb24odXBkYXRlVXNlcik7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IGUgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IG1lc3NhZ2U6ICd0aGlzIGVuZHBpbnQgb25seSBhbGxvd3MgUE9TVCByZXF1ZXN0cycgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNzcmYoaGFuZGxlcik7ICJdLCJuYW1lcyI6WyJwcmlzbWEiLCJjc3JmIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwicGFyc2UiLCJ1c2VybmFtZSIsIm5ld0ltYWdlIiwic3RhdHVzIiwic2VuZCIsIm1lc3NhZ2UiLCJpbmNsdWRlcyIsInVwZGF0ZVVzZXIiLCJ1c2VyIiwidXBkYXRlIiwid2hlcmUiLCJ1c2VyTmFtZSIsImRhdGEiLCJpbWFnZSIsImpzb24iLCJlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/editImage.tsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/editImage.tsx"));
module.exports = __webpack_exports__;

})();