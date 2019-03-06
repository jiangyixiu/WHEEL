/**
 * 存储localStorage
 * 
 * @param {*} name 
 * @param {*} content 
 */
export const setStore = (name, content) => {
    if(!name) return ;
    if(typeof content !== 'string'){
        content = JSON.stringify(contnet);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 * 
 * @param {*} name 
 */
export const getStore = name => {
    if(!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 * 
 * @param {*} name 
 */
export const removeStore = name => {
    if(!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 获取style样式
 * 
 * @param {*} element 
 * @param {*} attr 
 * @param {*} NumberMode 
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    //scollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if(attr === 'scollTop'){
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr];
    }else{
        target = document.defaultView.getComputedStyle(element, null)[attr];
    }

    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
}