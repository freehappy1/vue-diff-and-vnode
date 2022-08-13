/**
 * 测试自己写的h函数
 */

import h from "./my-snabbdom/h";
import patch from "./my-snabbdom/patch";

const vnode1 = h("selection", {}, [
    h("div", {key: "A"}, "A"),
    h("div", {key: "B"}, "B"),
    h("div", {key: "C"}, "C"),
    h("div", {key: "D"}, "D"),
    h("div", {key: "E"}, "E"),
]);
const container = document.getElementById("container");
patch(container, vnode1);
const vnode2 = h("selection", {}, [    
    h("div", {key: "C"}, "C"),
]);

let btn = document.getElementById("btn");
btn.onclick = function() {
    patch(vnode1, vnode2);
}