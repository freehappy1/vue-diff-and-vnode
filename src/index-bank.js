/**
 * 测试snabbdom
 */
import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";
  
  //创建patch 函数
  const patch = init([classModule, propsModule, styleModule, styleModule, eventListenersModule]);
  //创建虚拟节点
  const VNode1 = h("a", {props: {href: "http://baidu.com", target: "_blank"}}, "百度");
  console.log(VNode1);

  const VNode2 = h("div", "我是一个盒子");

  //h函数的嵌套使用
 const VNode3 =  h("ul", [
    h("li", "香蕉"),
    h("li", {}, "苹果"),
    h("li", "火龙果"),
    h("li", [h("span", "葡萄"), h("span", "蹄子")])
  ])
  console.log(VNode3);
  //
  const dom = document.getElementById("container");
  patch(dom, VNode2);