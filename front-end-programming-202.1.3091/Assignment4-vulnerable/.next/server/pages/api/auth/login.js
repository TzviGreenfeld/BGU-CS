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
exports.id = "pages/api/auth/login";
exports.ids = ["pages/api/auth/login"];
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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "(api)/./pages/api/auth/login.ts":
/*!*********************************!*\
  !*** ./pages/api/auth/login.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handle)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function handle(req, res) {\n    const { username , password  } = req.body;\n    if (req.method === \"POST\") {\n        const user = await prisma.user.findFirst({\n            where: {\n                userName: username\n            }\n        });\n        const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password);\n        if (!(user && passwordCorrect)) {\n            return res.status(401).json({\n                error: \"invalid username or password\"\n            });\n        }\n        const userForToken = {\n            username: user.userName,\n            id: user.id\n        };\n        const token = jwt.sign(userForToken, process.env.SECRET, {\n            expiresIn: 60 * 60\n        });\n        const body = {\n            token: token,\n            username: user.userName,\n            name: user.name,\n            email: user.email\n        };\n        res.setHeader(\"Set-Cookie\", `cookie=${JSON.stringify({\n            token: token\n        })}; Max-Age=3600; Path=/;`).status(200).json(body);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxNQUFNQyxtQkFBT0EsQ0FBQyxrQ0FBYztBQUNsQyxNQUFNQyxTQUFTRCxtQkFBT0EsQ0FBQyxzQkFBUTtBQUdzQjtBQUdyRCxNQUFNRyxTQUFTLElBQUlELHdEQUFZQTtBQUVoQixlQUFlRSxPQUM1QkMsR0FBbUIsRUFDbkJDLEdBQW9CLEVBQ3BCO0lBQ0EsTUFBTSxFQUFFQyxTQUFBQSxFQUFVQyxTQUFBQSxFQUFVLEdBQUdILElBQUlJLElBQUk7SUFDdkMsSUFBSUosSUFBSUssTUFBTSxLQUFLLFFBQVE7UUFDekIsTUFBTUMsT0FBTyxNQUFNUixPQUFPUSxJQUFJLENBQUNDLFNBQVMsQ0FBQztZQUN2Q0MsT0FBTztnQkFBRUMsVUFBVVA7WUFBUztRQUM5QjtRQUVBLE1BQU1RLGtCQUNKSixTQUFTLElBQUksR0FBRyxLQUFLLEdBQUcsTUFBTVYsT0FBT2UsT0FBTyxDQUFDUixVQUFVRyxLQUFLSCxRQUFRLENBQUM7UUFFdkUsSUFBSSxDQUFFRyxDQUFBQSxRQUFRSSxlQUFBQSxHQUFrQjtZQUM5QixPQUFPVCxJQUFJVyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUMxQkMsT0FBTztZQUNUO1FBQ0Y7UUFFQSxNQUFNQyxlQUFlO1lBQ25CYixVQUFVSSxLQUFLRyxRQUFRO1lBQ3ZCTyxJQUFJVixLQUFLVSxFQUFBQTtRQUNYO1FBRUEsTUFBTUMsUUFBUXZCLElBQUl3QixJQUFJLENBQUNILGNBQWNJLFFBQVFDLEdBQUcsQ0FBQ0MsTUFBTSxFQUFFO1lBQUVDLFdBQVcsS0FBRztRQUFHO1FBRzVFLE1BQU1sQixPQUFPO1lBQUVhLE9BQU1BO1lBQU9mLFVBQVVJLEtBQUtHLFFBQVE7WUFBRWMsTUFBTWpCLEtBQUtpQixJQUFJO1lBQUVDLE9BQU1sQixLQUFLa0IsS0FBQUE7UUFBTTtRQUN2RnZCLElBQ0N3QixTQUFTLENBQUMsY0FBYyxVQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBQ1YsT0FBTUE7UUFBSyxHQUFHLHdCQUF3QixFQUNsREwsTUFBTSxDQUFDLEtBQ1BDLElBQUksQ0FBQ1Q7SUFDN0M7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5leHQvLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi50cz83NDRkIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGp3dCA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7XHJcbmNvbnN0IGJjcnlwdCA9IHJlcXVpcmUoXCJiY3J5cHRcIik7XHJcblxyXG5cclxuaW1wb3J0IHsgUHJpc21hQ2xpZW50LCBQcmlzbWEgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XHJcblxyXG5jb25zdCBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGUoXHJcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcclxuICByZXM6IE5leHRBcGlSZXNwb25zZVxyXG4pIHtcclxuICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gcmVxLmJvZHk7XHJcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XHJcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZEZpcnN0KHtcclxuICAgICAgd2hlcmU6IHsgdXNlck5hbWU6IHVzZXJuYW1lIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBwYXNzd29yZENvcnJlY3QgPVxyXG4gICAgICB1c2VyID09PSBudWxsID8gZmFsc2UgOiBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcblxyXG4gICAgaWYgKCEodXNlciAmJiBwYXNzd29yZENvcnJlY3QpKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7XHJcbiAgICAgICAgZXJyb3I6IFwiaW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZFwiLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VyRm9yVG9rZW4gPSB7XHJcbiAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJOYW1lLFxyXG4gICAgICBpZDogdXNlci5pZCxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih1c2VyRm9yVG9rZW4sIHByb2Nlc3MuZW52LlNFQ1JFVCwgeyBleHBpcmVzSW46IDYwKjYwIH1cclxuICAgICAgKTtcclxuXHJcbiAgICBjb25zdCBib2R5ID0geyB0b2tlbjp0b2tlbiwgdXNlcm5hbWU6IHVzZXIudXNlck5hbWUsIG5hbWU6IHVzZXIubmFtZSwgZW1haWw6dXNlci5lbWFpbCB9O1xyXG4gICAgcmVzXHJcbiAgICAuc2V0SGVhZGVyKFwiU2V0LUNvb2tpZVwiLGBjb29raWU9JHtKU09OLnN0cmluZ2lmeSh7dG9rZW46dG9rZW59KX07IE1heC1BZ2U9MzYwMDsgUGF0aD0vO2ApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpzb24oYm9keSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJqd3QiLCJyZXF1aXJlIiwiYmNyeXB0IiwiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiaGFuZGxlIiwicmVxIiwicmVzIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImJvZHkiLCJtZXRob2QiLCJ1c2VyIiwiZmluZEZpcnN0Iiwid2hlcmUiLCJ1c2VyTmFtZSIsInBhc3N3b3JkQ29ycmVjdCIsImNvbXBhcmUiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJ1c2VyRm9yVG9rZW4iLCJpZCIsInRva2VuIiwic2lnbiIsInByb2Nlc3MiLCJlbnYiLCJTRUNSRVQiLCJleHBpcmVzSW4iLCJuYW1lIiwiZW1haWwiLCJzZXRIZWFkZXIiLCJKU09OIiwic3RyaW5naWZ5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/login.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/login.ts"));
module.exports = __webpack_exports__;

})();