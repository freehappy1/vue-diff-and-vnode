/**
 * 
 */
export default function createElement(vnode) {
    let newDom = document.createElement(vnode.sel);
    if(vnode.text != "" && (vnode.children == undefined || vnode.children.length == 0)) {
        newDom.innerText = vnode.text;        
    }else if (Array.isArray(vnode.children) && (vnode.children.length > 0)) {
        for(let i = 0; i < vnode.children.length; i++) {
            let ch = vnode.children[i];
            let chDom = createElement(ch);
            newDom.appendChild(chDom);
        }
    }
    vnode.elm = newDom;
    return  newDom;
}