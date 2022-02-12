//api2.js
const root_url = '/API'
var store_items = [];

function _setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function _getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function http_fetch(url, data, method){
    return new Promise(resolve => {
        var opts = {
            	method: method,
                headers: {'Content-Type': 'application/json'}
            }

        if(method == "POST"){
            opts.body = JSON.stringify(data);
        }
        fetch(`${url}`, opts).then(response => response.json())
                .then((data) => {
                    resolve(data)
            })
    })
}

function _purgeCookies(){
    var cookies = document.cookie.split(";");
    for(var i = 0; i <= cookies.length; i++){
        var cookie_name = String(cookies[i]).split("=")[0]
        eraseCookie(cookie_name);
    }
}

function _eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0'
}

function _evaluate(expression){
    return new Promise(resolve => {
        var e = encodeURIComponent(expression)

        http_fetch(`http://api.mathjs.org/v4`, {expr:expression}, "POST").then(res => {
            console.log(res)
            resolve(res);
        })
    })
}

function reloadAPI(){

}

function loadAPI(){
    window.DP.dispatch('API_LOAD');
    
    
}

setTimeout(() => {
    loadAPI();
}, 350);


const API2 = {
    getCookie(cookie){
        return _getCookie(cookie)
    },

    setCookie(cookie, value){
        _setCookie(cookie, value)
    },
 
    loadAPI(){
        loadAPI()
    },

    reloadAPI(){
        reloadAPI();
    },

    uniqid(prefix = "", random = false) {
        const sec = Date.now() * 1000 + Math.random() * 1000;
        const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
        return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
    },

    in_array(check, arr){
        for(var key in arr){
            if(arr[key] = check){
                return true
            }
        }
        return false
    },

    add_to_cart(item_public_uniqid){
        return new Promise(resolve => {
            window.API2.get_user().then(res => {
                if(!res.cart){
                    var cart = [`${item_public_uniqid}`]    
                }else{
                    var cart = res.cart;
                    console.log(this.in_array(item_public_uniqid, cart))
                    if(this.in_array(item_public_uniqid, cart)){
                        resolve({'error' : 'item exists'})
                    }else{
                        cart.push(item_public_uniqid);
                    }
                }

                window.API2.update_user({cart: cart}).then(res => {
                    resolve(res);
                    window.API2.reloadAPI();
                })

            })
        })
    },

    evaluate(expression){
        return new Promise(resolve => {
            _evaluate(expression).then(res => {
                resolve(res)
            })
        })
    }
}

const API2Singleton = API2;

window.API2 = API2Singleton // web

export default window.API2 // this will initialise the singleton instantly