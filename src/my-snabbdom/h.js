import vnode from "./vnode";

export default function (sel, data, c) {
    if(arguments.length !== 3)
        throw new Error("必须传入3个参数");
    if(typeof c == "string" || typeof c == "number") {
        return vnode(sel, data, undefined, c, undefined);
    //数组    
    }else if (Array.isArray(c)) {
        let children = [];
        for(let i = 0; i < c.length; i++) {
            if((typeof c[i] == "object" && c.hasOwnProperty("sel")))
                throw new Error("传入函数误");
            children.push(c[i]);
        }
        return vnode(sel, data, children, undefined, undefined);
    //h()
    }else if (typeof c == "object" && c.hasOwnProperty("sel")) {
        let children = [c];
        return vnode(sel, data, children, undefined, undefined);
    }else {
        throw new Error("传入的第三个参数有误");
    }
}