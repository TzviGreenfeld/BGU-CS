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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"csrf\": () => (/* binding */ csrf),\n/* harmony export */   \"setup\": () => (/* binding */ setup)\n/* harmony export */ });\n/* harmony import */ var next_csrf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-csrf */ \"next-csrf\");\n/* harmony import */ var next_csrf__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_csrf__WEBPACK_IMPORTED_MODULE_0__);\n\nconst { csrf , setup  } = (0,next_csrf__WEBPACK_IMPORTED_MODULE_0__.nextCsrf)({\n    secret: process.env.SECRET\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9DU1JGL2NzcmZfc2V0dXAudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNxQztBQUVyQyxNQUFNLEVBQUVDLEtBQUksRUFBRUMsTUFBSyxFQUFFLEdBQUdGLG1EQUFRQSxDQUFDO0lBQ2hDRyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLE1BQU07QUFDM0I7QUFFdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWxsby1uZXh0Ly4vQ1NSRi9jc3JmX3NldHVwLnRzPzIwYjgiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBuZXh0Q3NyZiB9IGZyb20gXCJuZXh0LWNzcmZcIjtcblxuY29uc3QgeyBjc3JmLCBzZXR1cCB9ID0gbmV4dENzcmYoe1xuIHNlY3JldDogcHJvY2Vzcy5lbnYuU0VDUkVULFxufSk7XG5cbmV4cG9ydCB7IGNzcmYsIHNldHVwIH07Il0sIm5hbWVzIjpbIm5leHRDc3JmIiwiY3NyZiIsInNldHVwIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./CSRF/csrf_setup.ts\n");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"prisma\": () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// PrismaClient is attached to the `global` object in development to prevent\n// exhausting your database connection limit.\n//\n// Learn more:\n// https://pris.ly/d/help/next-js-best-practices\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBNkM7QUFFN0MsNEVBQTRFO0FBQzVFLDZDQUE2QztBQUM3QyxFQUFFO0FBQ0YsY0FBYztBQUNkLGdEQUFnRDtBQUVoRCxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQTtBQUVwRSxpRUFBZUEsTUFBTUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5leHQvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbi8vIFByaXNtYUNsaWVudCBpcyBhdHRhY2hlZCB0byB0aGUgYGdsb2JhbGAgb2JqZWN0IGluIGRldmVsb3BtZW50IHRvIHByZXZlbnRcbi8vIGV4aGF1c3RpbmcgeW91ciBkYXRhYmFzZSBjb25uZWN0aW9uIGxpbWl0LlxuLy9cbi8vIExlYXJuIG1vcmU6XG4vLyBodHRwczovL3ByaXMubHkvZC9oZWxwL25leHQtanMtYmVzdC1wcmFjdGljZXNcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsIGFzIHVua25vd24gYXMgeyBwcmlzbWE6IFByaXNtYUNsaWVudCB9XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYVxuXG5leHBvcnQgZGVmYXVsdCBwcmlzbWFcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWwiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./pages/api/editImage.tsx":
/*!*********************************!*\
  !*** ./pages/api/editImage.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var _CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../CSRF/csrf_setup */ \"(api)/./CSRF/csrf_setup.ts\");\n//import { User } from \"@prisma/client\";\n// import prisma from '../../lib/prisma'\n\n\n/**\n * allow use to edit his profile image in prisma\n */ //POST /api/editImage\nconst handler = async (req, res)=>{\n    if (req.method === \"POST\") {\n        const body = JSON.parse(req.body);\n        const { username , newImage  } = body;\n        // validation\n        if (!newImage) {\n            res.status(400).send({\n                message: \"no image provided\"\n            });\n        } else if (!newImage.includes(\"cloudinary\")) {\n            res.status(400).send({\n                message: \"invalid image link\"\n            });\n        } else {\n            // all good\n            try {\n                const updateUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].user.update({\n                    where: {\n                        userName: username\n                    },\n                    data: {\n                        image: newImage\n                    }\n                });\n                res.json(updateUser);\n            } catch (e) {\n                res.status(400).send({\n                    e\n                });\n            }\n        }\n    } else {\n        res.status(401).send({\n            message: \"this endpint only allows POST requests\"\n        });\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_CSRF_csrf_setup__WEBPACK_IMPORTED_MODULE_1__.csrf)(handler));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZWRpdEltYWdlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ3FDO0FBQ087QUFHNUM7O0NBRUEsR0FDQTtBQUNBLE1BQU1FLFVBQVUsT0FDZEMsS0FDQUMsTUFDRTtJQUNGLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLE1BQU1DLE9BQU9DLEtBQUtDLEtBQUssQ0FBQ0wsSUFBSUcsSUFBSTtRQUVoQyxNQUFNLEVBQUVHLFNBQUFBLEVBQVVDLFNBQUFBLEVBQVUsR0FBR0o7UUFFL0I7UUFDQSxJQUFJLENBQUNJLFVBQVU7WUFDYk4sSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFvQjtRQUN0RCxPQUNLLElBQUksQ0FBQ0gsU0FBU0ksUUFBUSxDQUFDLGVBQWU7WUFDekNWLElBQUlPLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVDLFNBQVM7WUFBcUI7UUFDdkQsT0FBTztZQUFFO1lBQ1AsSUFBSTtnQkFDRixNQUFNRSxhQUFhLE1BQU1mLCtEQUFrQixDQUFDO29CQUMxQ2tCLE9BQU87d0JBQ0xDLFVBQVVWO29CQUNaO29CQUNBVyxNQUFNO3dCQUNKQyxPQUFPWDtvQkFDVDtnQkFDRjtnQkFDQU4sSUFBSWtCLElBQUksQ0FBQ1A7WUFDWCxFQUFFLE9BQU9RLEdBQUc7Z0JBQ1ZuQixJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO29CQUFFVztnQkFBRTtZQUMzQjtRQUNGO0lBQ0YsT0FBTztRQUNMbkIsSUFBSU8sTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxTQUFTO1FBQXlDO0lBQzNFO0FBQ0Y7QUFFQSxpRUFBZVosc0RBQUlBLENBQUNDLFFBQVFBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oZWxsby1uZXh0Ly4vcGFnZXMvYXBpL2VkaXRJbWFnZS50c3g/Yjg1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuLy9pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG4vLyBpbXBvcnQgcHJpc21hIGZyb20gJy4uLy4uL2xpYi9wcmlzbWEnXG5pbXBvcnQgcHJpc21hIGZyb20gJy4uLy4uL2xpYi9wcmlzbWEnXG5pbXBvcnQgeyBjc3JmIH0gZnJvbSBcIi4uLy4uL0NTUkYvY3NyZl9zZXR1cFwiO1xuXG5cbi8qKlxuICogYWxsb3cgdXNlIHRvIGVkaXQgaGlzIHByb2ZpbGUgaW1hZ2UgaW4gcHJpc21hXG4gKi9cbi8vUE9TVCAvYXBpL2VkaXRJbWFnZVxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2Vcbik9PiB7XG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIGNvbnN0IGJvZHkgPSBKU09OLnBhcnNlKHJlcS5ib2R5KTtcblxuICAgIGNvbnN0IHsgdXNlcm5hbWUsIG5ld0ltYWdlIH0gPSBib2R5O1xuXG4gICAgLy8gdmFsaWRhdGlvblxuICAgIGlmICghbmV3SW1hZ2UpIHtcbiAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgbWVzc2FnZTogJ25vIGltYWdlIHByb3ZpZGVkJyB9KVxuICAgIH1cbiAgICBlbHNlIGlmICghbmV3SW1hZ2UuaW5jbHVkZXMoXCJjbG91ZGluYXJ5XCIpKSB7XG4gICAgICByZXMuc3RhdHVzKDQwMCkuc2VuZCh7IG1lc3NhZ2U6ICdpbnZhbGlkIGltYWdlIGxpbmsnIH0pXG4gICAgfSBlbHNlIHsgLy8gYWxsIGdvb2RcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci51cGRhdGUoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICB1c2VyTmFtZTogdXNlcm5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpbWFnZTogbmV3SW1hZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgcmVzLmpzb24odXBkYXRlVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNDAwKS5zZW5kKHsgZSB9KVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXMuc3RhdHVzKDQwMSkuc2VuZCh7IG1lc3NhZ2U6ICd0aGlzIGVuZHBpbnQgb25seSBhbGxvd3MgUE9TVCByZXF1ZXN0cycgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjc3JmKGhhbmRsZXIpOyAiXSwibmFtZXMiOlsicHJpc21hIiwiY3NyZiIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInBhcnNlIiwidXNlcm5hbWUiLCJuZXdJbWFnZSIsInN0YXR1cyIsInNlbmQiLCJtZXNzYWdlIiwiaW5jbHVkZXMiLCJ1cGRhdGVVc2VyIiwidXNlciIsInVwZGF0ZSIsIndoZXJlIiwidXNlck5hbWUiLCJkYXRhIiwiaW1hZ2UiLCJqc29uIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/editImage.tsx\n");

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