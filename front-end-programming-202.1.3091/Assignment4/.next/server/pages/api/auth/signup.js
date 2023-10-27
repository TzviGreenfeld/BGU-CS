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
exports.id = "pages/api/auth/signup";
exports.ids = ["pages/api/auth/signup"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "(api)/./pages/api/auth/signup.ts":
/*!**********************************!*\
  !*** ./pages/api/auth/signup.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function handle(req, res) {\n    const { userName , name , email , password , imageLink  } = req.body;\n    if (req.method === \"POST\") {\n        const saltRounds = 10;\n        const passwordHash = await bcrypt.hash(password, saltRounds);\n        const newUser = {\n            userName: userName,\n            name: name,\n            email: email,\n            password: passwordHash,\n            image: imageLink\n        };\n        try {\n            const resultUser = await prisma.user.create({\n                data: newUser\n            });\n            res.status(200).json(resultUser);\n        } catch (e) {\n            res.status(500).json({\n                error: e.message\n            });\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9zaWdudXAudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJEO0FBRTNELE1BQU1DLFNBQVNDLG1CQUFPQSxDQUFDLHNCQUFRO0FBRy9CLE1BQU1DLFNBQVMsSUFBSUgsd0RBQVlBO0FBRWhCLGVBQWVJLE9BQzVCQyxHQUFtQixFQUNuQkMsR0FBb0IsRUFDcEI7SUFDQSxNQUFNLEVBQUVDLFNBQUFBLEVBQVVDLEtBQUFBLEVBQU1DLE1BQUFBLEVBQU9DLFNBQUFBLEVBQVVDLFVBQUFBLEVBQVcsR0FBR04sSUFBSU8sSUFBSTtJQUUvRCxJQUFJUCxJQUFJUSxNQUFNLEtBQUssUUFBUTtRQUN6QixNQUFNQyxhQUFhO1FBQ25CLE1BQU1DLGVBQWUsTUFBTWQsT0FBT2UsSUFBSSxDQUFDTixVQUFVSTtRQUNqRCxNQUFNRyxVQUNKO1lBQ0VWLFVBQVVBO1lBQ1ZDLE1BQU1BO1lBQ05DLE9BQU9BO1lBQ1BDLFVBQVVLO1lBQ1ZHLE9BQU9QO1FBQ1Q7UUFFQSxJQUFJO1lBQ0YsTUFBTVEsYUFBbUIsTUFBTWhCLE9BQU9pQixJQUFJLENBQUNDLE1BQU0sQ0FBQztnQkFDaERDLE1BQU1MO1lBQ1I7WUFDQVgsSUFBSWlCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNMO1FBRXZCLEVBQUUsT0FBT00sR0FBTztZQUNkbkIsSUFBSWlCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVFLE9BQU9ELEVBQUVFLE9BQUFBO1lBQVE7UUFDMUM7SUFFSjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGVsbG8tbmV4dC8uL3BhZ2VzL2FwaS9hdXRoL3NpZ251cC50cz83ZjFmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCwgUHJpc21hLCBVc2VyIH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5pbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XG5cblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGUoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgY29uc3QgeyB1c2VyTmFtZSwgbmFtZSwgZW1haWwsIHBhc3N3b3JkLCBpbWFnZUxpbmsgfSA9IHJlcS5ib2R5O1xuXG4gIGlmIChyZXEubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIGNvbnN0IHNhbHRSb3VuZHMgPSAxMFxuICAgIGNvbnN0IHBhc3N3b3JkSGFzaCA9IGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCBzYWx0Um91bmRzKVxuICAgIGNvbnN0IG5ld1VzZXI6IFByaXNtYS5Vc2VyQ3JlYXRlSW5wdXQgPSBcbiAgICAgIHtcbiAgICAgICAgdXNlck5hbWU6IHVzZXJOYW1lLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBlbWFpbDogZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZEhhc2gsXG4gICAgICAgIGltYWdlOiBpbWFnZUxpbmssXG4gICAgICB9XG4gICAgXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHRVc2VyOiBVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuY3JlYXRlKHtcbiAgICAgICAgICBkYXRhOiBuZXdVc2VyLFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0VXNlcik7XG5cbiAgICAgIH0gY2F0Y2ggKGU6YW55KSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IGUubWVzc2FnZSB9KTtcbiAgICAgIH1cblxuICB9XG59XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiYmNyeXB0IiwicmVxdWlyZSIsInByaXNtYSIsImhhbmRsZSIsInJlcSIsInJlcyIsInVzZXJOYW1lIiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJpbWFnZUxpbmsiLCJib2R5IiwibWV0aG9kIiwic2FsdFJvdW5kcyIsInBhc3N3b3JkSGFzaCIsImhhc2giLCJuZXdVc2VyIiwiaW1hZ2UiLCJyZXN1bHRVc2VyIiwidXNlciIsImNyZWF0ZSIsImRhdGEiLCJzdGF0dXMiLCJqc29uIiwiZSIsImVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/signup.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/signup.ts"));
module.exports = __webpack_exports__;

})();