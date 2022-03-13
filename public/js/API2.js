//api2.js
const root_url = '/API'
var store_items = [];
var user = {}

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

function _get_user(uniqid){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_user`, {uniqid: uniqid}, "POST").then(res => {
            resolve(res);
        })
    })
}

function _create_league(name, game, premier_date){
    return new Promise(resolve => {
        http_fetch(`${root_url}/create_league`, {name: name, game: game, premier_date: premier_date}, "POST").then(res => {
            resolve(res)
        })
    })
}

function _get_managed_leagues(){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_managed_leagues`, {}, "POST").then(res => {
            resolve(res)
        })
    })
}

function _get_games(){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_games`, {}, "POST").then(games => {
            resolve(games)
        })
    })
}

function _get_league(league_uniqid){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_league`, {league_uniqid: league_uniqid}, "POST").then(league => {
            resolve(league)
        })
    })
}

function reloadAPI(){

}

function loadAPI(){
    var uniqid = _getCookie('uniqid');
    if(!uniqid){
        uniqid = false;
    }
    _get_user(uniqid).then(res => {
        user = res;
        console.log(res)
        window.DP.dispatch('API_LOAD');
    })
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

    register_user(username, email, password){
        return new Promise(resolve => {
            http_fetch(root_url + '/register', {username: username, email: email, password: password}, "POST").then(res => {
                resolve(res)
            })
        })
    },

    get_user(uniqid){
        return user;
    },

    check_login(username, password){
        console.log(`username ${username} password ${password}`)
        return new Promise(resolve => {
            http_fetch(`${root_url}/check_login`, {username: username, password: password}, "POST").then(res => {
                resolve(res);
            })
        })
    },

    evaluate(expression){
        return new Promise(resolve => {
            _evaluate(expression).then(res => {
                resolve(res)
            })
        })
    },

    get_managed_leagues(uniqid){
        return new Promise(resolve => {
            _get_managed_leagues(uniqid).then(leagues => {
                resolve(leagues)
            })
        })
    },

    create_league(name, game, premier_date){
        return new Promise(resolve => {
            _create_league(name, game, premier_date).then(league => {
                resolve(league);
            })
        })
    },

    get_league(league_uniqid){
        return new Promise(resolve => {
            _get_league(league_uniqid).then(league => {
                resolve(league);
            })
        })
    },

    get_games(){
        return new Promise(resolve => {
            _get_games().then(games => {
                resolve(games);
            })
        })
    }
}

const API2Singleton = API2;

window.API2 = API2Singleton // web

export default window.API2 // this will initialise the singleton instantly