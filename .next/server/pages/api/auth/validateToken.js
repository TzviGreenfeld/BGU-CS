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
exports.id = "pages/api/auth/validateToken";
exports.ids = ["pages/api/auth/validateToken"];
exports.modules = {

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "(api)/./pages/api/auth/validateToken.js":
/*!*****************************************!*\
  !*** ./pages/api/auth/validateToken.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nasync function handler(req, res) {\n    const { token  } = req.body;\n    try {\n        // Verify the token using the same SECRET used during token signing\n        const decodedToken = jwt.verify(token, process.env.SECRET);\n        // Fetch the user based on the decoded token\n        const user = await prisma.user.findFirst({\n            where: {\n                id: decodedToken.id\n            }\n        });\n        // Return the user if found\n        res.status(200).json({\n            user: user\n        });\n    } catch (error) {\n        // Return null if token is invalid or any other error occurs\n        console.log(\"tokenError:\", token);\n        res.status(200).json({\n            user: null\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC92YWxpZGF0ZVRva2VuLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxNQUFNQyxtQkFBT0EsQ0FBQyxrQ0FBYztBQUVuQixlQUFlQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUM5QyxNQUFNLEVBQUVDLE1BQUFBLEVBQU8sR0FBR0YsSUFBSUcsSUFBSTtJQUMxQixJQUFJO1FBQ0Y7UUFDQSxNQUFNQyxlQUFlUCxJQUFJUSxNQUFNLENBQUNILE9BQU9JLFFBQVFDLEdBQUcsQ0FBQ0MsTUFBTTtRQUV6RDtRQUNBLE1BQU1DLE9BQU8sTUFBTUMsT0FBT0QsSUFBSSxDQUFDRSxTQUFTLENBQUM7WUFDdkNDLE9BQU87Z0JBQUVDLElBQUlULGFBQWFTLEVBQUFBO1lBQUc7UUFDL0I7UUFFQTtRQUNBWixJQUFJYSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVOLE1BQU1BO1FBQUs7SUFDcEMsRUFBRSxPQUFPTyxPQUFPO1FBQ2Q7UUFDQUMsUUFBUUMsR0FBRyxDQUFDLGVBQWVoQjtRQUMzQkQsSUFBSWEsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFTixNQUFNO1FBQUs7SUFDcEM7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2hlbGxvLW5leHQvLi9wYWdlcy9hcGkvYXV0aC92YWxpZGF0ZVRva2VuLmpzPzAyNTQiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgand0ID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICBjb25zdCB7IHRva2VuIH0gPSByZXEuYm9keTtcclxuICB0cnkge1xyXG4gICAgLy8gVmVyaWZ5IHRoZSB0b2tlbiB1c2luZyB0aGUgc2FtZSBTRUNSRVQgdXNlZCBkdXJpbmcgdG9rZW4gc2lnbmluZ1xyXG4gICAgY29uc3QgZGVjb2RlZFRva2VuID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuU0VDUkVUKTtcclxuXHJcbiAgICAvLyBGZXRjaCB0aGUgdXNlciBiYXNlZCBvbiB0aGUgZGVjb2RlZCB0b2tlblxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRGaXJzdCh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBkZWNvZGVkVG9rZW4uaWQgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJldHVybiB0aGUgdXNlciBpZiBmb3VuZFxyXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB1c2VyOiB1c2VyIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyBSZXR1cm4gbnVsbCBpZiB0b2tlbiBpcyBpbnZhbGlkIG9yIGFueSBvdGhlciBlcnJvciBvY2N1cnNcclxuICAgIGNvbnNvbGUubG9nKFwidG9rZW5FcnJvcjpcIiwgdG9rZW4pO1xyXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyB1c2VyOiBudWxsIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiand0IiwicmVxdWlyZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJ0b2tlbiIsImJvZHkiLCJkZWNvZGVkVG9rZW4iLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiU0VDUkVUIiwidXNlciIsInByaXNtYSIsImZpbmRGaXJzdCIsIndoZXJlIiwiaWQiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/validateToken.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/validateToken.js"));
module.exports = __webpack_exports__;

})();