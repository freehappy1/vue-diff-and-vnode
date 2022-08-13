import createElement from "./createElement";
import patchVNode from "./patchVNode"

export default function updateChildren(parentElm, oldChildren, newChildren) {
    let checkSameNode = function(VNode1, VNode2) {
        return VNode1.sel == VNode2.sel && VNode1.key == VNode2.key;
    }
    let oldStartIdx = 0;
    let oldEndIdx = oldChildren.length - 1;
    let oldStartNode = oldChildren[0];
    let oldEndNode = oldChildren[oldChildren.length - 1];
    let newStartIdx = 0;
    let newEndIdx = newChildren.length - 1;
    let newStartNode = newChildren[0];
    let newEndNode = newChildren[newChildren.length - 1];
    let keyMap = null;
    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if(oldStartNode == null || oldStartNode == undefined) {
            oldStartNode = oldChildren[++oldStartIdx];
        }else if(oldEndNode == null || oldEndNode == undefined) {
            oldEndNode = oldChildren[--oldEndIdx]; 
        }else if(newStartNode == null || newStartNode == undefined) {
            newStartNode = newChildren[++newStartIdx];
        }else if(newEndNode == null && newEndNode == undefined) {
            newEndNode = newChildren[++newEndNode];
        }else if(checkSameNode(oldStartNode, newStartNode)) {
            console.log("情况1")
            patchVNode(oldStartNode, newStartNode);
            oldStartNode = oldChildren[++oldStartIdx];
            newStartNode = newChildren[++newStartIdx];
        } else if (checkSameNode(oldEndNode, newEndNode)) {
            console.log("情况2")
            patchVNode(oldStartNode, newStartNode);
            oldEndNode = oldChildren[--oldEndIdx];
            newEndNode = newChildren[--newEndIdx];
        } else if (checkSameNode(oldStartNode, newEndNode)) {
            console.log("情况3")
            patchVNode(oldStartNode, newStartNode);
            parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)
            oldStartNode = oldChildren[++oldStartIdx];
            newEndNode = newChildren[--newEndIdx]; 
        } else if (checkSameNode(oldEndNode, newStartNode)) {
            console.log("情况4")
            patchVNode(oldStartNode, newStartNode);
            parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm);
            oldEndNode = oldChildren[--oldEndIdx]; 
            newStartNode = newChildren[++newStartIdx];
        }else {
            if(!keyMap) {
                keyMap = {};
                for(let i = oldStartIdx; i <= oldEndIdx; i++) {
                    let key = oldChildren[i].key;
                    if(key !== undefined) {
                        keyMap[key] = i;
                    }
                }
            }
            let idxInOld = keyMap[newStartIdx];
            //说明有
            if(idxInOld == undefined) {
                parentElm.insertBefore(createElement(newStartNode), oldStartNode.elm);
            }else {
                const oldToMove = oldChildren[idxInOld];
                patchVNode(oldToMove, newStartNode);
                oldChildren[idxInOld] = undefined;
                parentElm.insertBefore(oldToMove.elm, oldStartNode.elm);
            }
            newStartNode = newChildren[++newStartIdx];
        }
    }
    if(newStartIdx <= newEndIdx) {
        for(let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElement(newChildren[i]), oldChildren[oldStartIdx].elm);
        }
    }else if (oldStartIdx < oldEndIdx) {
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
            if(oldChildren[i]) {
                parentElm.removeChild(oldChildren[i].elm);
            }            
        }
    }

}