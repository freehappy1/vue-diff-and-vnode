 //体验一下最小量更新
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";

const container = document.getElementById("container");

const vnode1 = h("ul", {}, [
    h("li", {key: "A"}, "A"),
    h("li", {key: "B"}, "B"),
    h("li", {key: "C"}, "C")
]);

const patch = init([classModule,    propsModule,    styleModule,    eventListenersModule,]);

patch(container, vnode1);

const vnode2 = h("ul", {}, [
    h("li", {key: "D"}, "D"),
    h("li", {key: "A"}, "A"),
    h("li", {key: "B"}, "B"),
    h("li", {key: "C"}, "C")
    
]);
//key很重要
//只有是同一个节点时，才会diff算法最小量更新， 标签相同且key相同则判定为同一个节点
//同一层比较
const btn = document.getElementById("btn");
btn.onclick = function() {
    patch(vnode1, vnode2);
}
