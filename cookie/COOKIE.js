let cacheCookies = '';
let cookies = {};

const encode = window.encodeURIComponent;
const decode = window.decodeURIComponent;
const getDateString = offset => {
    let d = new Date();
    d.setTime(+d + offset * 1000);
    return d.toGMTString();
}

const getCookies = () => {
    let cookie = cacheCookies = document.cookie || '';
    let cks = {};
    cookie.split(/;\s?/).forEach(item => {
        const _sub = item.split('=');
        cks[_sub[0]] = _sub[1];
    })
    return cks;
}

refresh = () => {
    if (cacheCookies != document.cookie) {
        cookies = getCookies();
    }
    return cookies;
}

// 获取名为key的cookie值
const get = key => refresh()[key];

const has = key => !!get(key);

// 可以在二级域名设置一级域名的cookie，但是不能设置其他二级域名的cookie
// www.baidu.com ->  baidu.com  可以
// www.baidu.com -> map.baidu.com 不可以
// path，可以设置上层路径的cookie，
// 例如当前路径为 /news/333，则可以设置 /, /news, /news/333 的路径，不能设置其他
const set = (key, value, expires, path, domain, secure) => {
    let _cookie = `${encode(key)}=${encode(value)}`;

    if (expires) {
        _cookie += `;expires=${getDateString(expires)}`;
    }
    if (path) {
        _cookie += `;path=${path}`;
    }
    if (domain && domain != window.location.hostname) {
        _cookie += `;domain=${domain}`
    }
    // boolean
    if (secure) {
        _cookie += ';secure';
    }

    document.cookie = _cookie;
    return has(key);
} // 返回true/false来表示是否设置成功

// 仍然无法删除其他域名，以及设置了httponly的cookie值
const remove = (key, path, domain) => {
    let paths = [], domains = [], arr;

    if (path) {
        paths = [path]
    } else {
        arr = window.location.pathname.match(/.*?\/|.+$/g);
        arr.forEach((item, i) => {
            const a = arr.slice(0, i + 1).join('');
            paths.push(a);
            if (/[^\/]+\/$/.test(a)) {
                paths.push(a.slice(0, -1))
            }
            if (/[^\/]$/.test(a)) {
                paths.push(a + '/')
            }
        })
    }

    if (domain) {
        domains = [domain];
    } else {
        arr = window.location.hostname.split('.');
        arr.forEach((item, i) => {
            domains.push(arr.slice(-i).join('.'));
        })
        domains.push('.' + domains[0]);
    }

    paths.forEach((path, i) => {
        domains.forEach(domain => {
            set(key, '', -1000, path, domain);
        })
    })

    return !has(key);
}

const clear = (path, domain) => {
    let key, cookies = refresh();
    for(key in cookies) {
        remove(key, path, domain);
    }

    for(let _key in refresh()) {
        return false;
    }
    return true;
}


export default {
    get,
    set,
    has,
    remove,
    clear
}
