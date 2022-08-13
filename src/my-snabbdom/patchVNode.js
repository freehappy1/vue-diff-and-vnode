import updateChildren from "./updateChildren";

export default function patchVNode(oldVnode, newVnode) {
    if (oldVnode === newVnode) return;
        if (newVnode.text !==undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
            oldVnode.elm.innerText = newVnode.text;
        }else {
            if(oldVnode.children != undefined && oldVnode.children.length > 0) {
                //新旧子节点都有childrend时间
                updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
            }else {
                oldVnode.elm.innerText = "";
                for (let i = 0; i < newVnode.children.length; i++) {
                    let dom = createElement(newVnode.children[i]);
                    oldVnode.elm.appendChild(dom);
                } 
            }
        }
}