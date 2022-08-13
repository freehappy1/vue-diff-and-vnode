import vnode from "./vnode"
import createElement from "./createElement"
import patchVNode from "./patchVNode";

export default function patch (oldVnode, newVnode) {
    //如果不是虚拟节点，则包装为虚拟节点
    if(oldVnode.sel == "" || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }
    //判断oldVnode 和 newVnode 是不是同一个节点
    if(oldVnode.key == newVnode.key && oldVnode.sel === newVnode.sel) { 
        //console.log("是同一个节点，进行精细化比较");
        patchVNode(oldVnode, newVnode);
    //不是同一个节点，暴力插入新的，删除旧的
    }else {        
        let newDom = createElement(newVnode);   
        if(oldVnode.elm.parentNode && newDom) {
            oldVnode.elm.parentNode.insertBefore(newDom, oldVnode.elm);
        }     
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}