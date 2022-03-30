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

function _register_service_worker(){
    console.log('service worker registration')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/worker').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

function removeItemOnce(arr, value) {
    arr = arr.filter(function(item) {
        return item !== value
    })

    return arr;
  }

function _toggle_array(_array, toggle){
    var ret_arr = _array;
    var forDeletion = [toggle]
    if(_array.length == 0){
        ret_arr.push(toggle)
        return ret_arr;
    }else{
        if(_array.includes(toggle)){
            ret_arr = ret_arr.filter(item => !forDeletion.includes(item))
        }else{
            ret_arr.push(toggle)
        }
        return ret_arr;
    }
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function _getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "unknown";
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

function _get_user(public_uniqid){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_user`, {public_uniqid: public_uniqid}, "POST").then(res => {
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

function _get_teams(){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_teams`, {}, "POST").then(teams => {
            resolve(teams)
        })
    })
}

function _get_leagues(){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_leagues`, {}, "POST").then(leagues => {
            resolve(leagues)
        })
    })
}

function _get_league(league_uniqid){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_league`, {league_uniqid: league_uniqid}, "POST").then(league => {
            resolve(league);
        })
    })
}

function _get_league_applicants(league_uniqid){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_league_applicants`, {league_uniqid: league_uniqid}, "POST").then(applicants => {
            resolve(applicants);
        })
    })
}

function _get_user_posts(){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_posts`, {}, "POST").then(posts => {
            resolve(posts);
        })
    })
}

function _create_post(title, content){
    return new Promise(resolve => {
        http_fetch(`${root_url}/create_post`, {title: title, content: content, author_public_uniqid: user.public_uniqid}, "POST").then(post => {
            resolve(post)
        })
    })
}

function _global_search(query, filter){
    console.log(filter)
    return new Promise(resolve => {
        http_fetch(`${root_url}/global_search`, {query: query, filter: filter}, "POST").then(res => {
            resolve(res);
        })
    })
}

function _subscribe(to, from){
    http_fetch(`${root_url}/subscribe`, {to: to, from: from}, "POST").then(res => {
        console.log(res)
    })
}

function _get_post_feed(){
    return new Promise(resolve => {
        http_fetch(`${root_url}/get_post_feed`, {}, "POST").then(feed => {
            resolve(feed)
        })
    })
}

function _create_game(name, description, image_url){
    return new Promise(resolve => {
        http_fetch(`${root_url}/create_game`, {name: name, description: description, image_url: image_url}, "POST").then(res => {
            resolve(res);
        })
    })
}

function reloadAPI(){

}

function loadAPI(){
    var public_uniqid = _getCookie('public_uniqid');
    if(!public_uniqid){
        public_uniqid = false;
    }
    _get_user(public_uniqid).then(res => {
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

    remote_log(title, data){
        http_fetch(`${root_url}/remote_log`, {title: title, data: data}, "POST").then(res => {

        })
    },

    register_user(username, email, password){
        return new Promise(resolve => {
            http_fetch(root_url + '/register', {username: username, email: email, password: password}, "POST").then(res => {
                resolve(res)
            })
        })
    },

    user(){
        return user;
    },

    async get_user(public_uniqid){
        return new Promise(resolve => {
            _get_user(public_uniqid).then(user => {
                resolve(user);
            })
        })
    },

    check_login(username, password){
        console.log(`username ${username} password ${password}`)
        return new Promise(resolve => {
            http_fetch(`${root_url}/check_login`, {username: username, password: password}, "POST").then(res => {
                resolve(res);
            })
        })
    },

    register_service_worker(){
        _register_service_worker();
    },

    getMobileOperatingSystem(){
        return _getMobileOperatingSystem();
    },

    toggle_array(_array, toggle){
        return _toggle_array(_array, toggle);
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

    get_leagues(){
        return new Promise(resolve => {
            _get_leagues().then(leagues => {
                resolve(leagues);
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

    get_league_applicants(league_uniqid){
        return new Promise(resolve => {
            _get_league_applicants(league_uniqid).then(applicants => {
                resolve(applicants);
            })
        })
    },

    get_games(){
        return new Promise(resolve => {
            _get_games().then(games => {
                resolve(games);
            })
        })
    },

    global_search(query, filter){
        return new Promise(resolve => {
            _global_search(query, filter).then(res => {
                resolve(res);
            })
        })
    },

    subscribe(to, from){
        _subscribe(to, from)
    },

    get_subscribers(public_uniqid){
        return new Promise(resolve => {
            _get_subscribers(public_uniqid).then(subscribers => {
                
            })
        })
    },

    create_post(title, content){
        return new Promise(resolve => {
            _create_post(title, content).then(res => {
                resolve(res)
            })
        })
    },

    get_post_feed(){
        return new Promise(resolve => {
            _get_post_feed().then(feed => {
                resolve(feed)
            })
        })
    },

    create_game(name, description, image_url){
        return new Promise(resolve => {
            _create_game(name, description, image_url).then(game => {
                resolve(game);
            })
        })
    },

    get_teams(){
        return new Promise(resolve => {
            _get_teams().then(teams => {
                resolve(teams);
            })
        })
    },

}

const API2Singleton = API2;

window.API2 = API2Singleton // web

export default window.API2 // this will initialise the singleton instantly