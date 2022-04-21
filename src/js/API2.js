//api2.js
const root_url = '/API'
var store_items = [];
var user = {}
var _dbs = [];
var events = [];

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
                headers:{'Content-Type': 'application/json'}
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

function _new_db(name){
    _dbs[name] = new Nedb({filename: `${name}.db`, autoload: true})
}

function _get_events(){
    return new Promise(resolve => {
        _dbs['events'].find({}, (err, docs) => {
            resolve(docs);
        })
    })
}

//https://stackoverflow.com/questions/8517089/js-search-in-object-values

function searchFor(obj, toSearch) {
    var results = [];
    toSearch = trimString(toSearch).toLowerCase(); // trim it
    for(var i = 0; i < obj.length; i++){
        for(var key in obj[i]){
            var compare_string = String(obj[i][key]).toLowerCase();
            if(compare_string.indexOf(toSearch)!=-1) {
                if(!itemExists(results, obj[i])) results.push(obj[i]);
            }
        }
    }
    return results;
  }


  function trimString(s) {
    var l=0, r=s.length -1;
    while(l < s.length && s[l] == ' ') l++;
    while(r > l && s[r] == ' ') r-=1;
    return s.substring(l, r+1);
  }
  
  function compareObjects(o1, o2) {
    var k = '';
    for(k in o1) if(o1[k] != o2[k]) return false;
    for(k in o2) if(o1[k] != o2[k]) return false;
    return true;
  }
  
  function itemExists(haystack, needle) {
    for(var i=0; i<haystack.length; i++) if(compareObjects(haystack[i], needle)) return true;
    return false;
  }

function routelist(route){
    console.log(route)
    var route_list = []
    var counter = 0;
    for(var key0 in route){
        counter++
        var item = route[key0]
        if(item.subViews){
            for(var key1 in subViews){
                route_list.push(routelist(item.subViews[key1]))
            }
            
        }else{
            console.log(item)
            route_list.push({url: '', view: item.view})
        }
        if(counter == route.length -1){
            console.log("YES" +  route_list)
            return route_list;
        }
    }
    
}

function get_route_list(routes){
    var route_list = [];
    for(var key in routes){
        console.log(routelist(routes[key]))
    }
   // for(var i = 0; i < routes.length; i++){
   //     var route = route[i]
   //     console.log(routelist(route))
   //     route_list.push(routelist(route))
   //     if(i == routes.length - 1){
   //         return route_list;
   //     }
   // }
}

function searchRoutes(query){
    var routes = window.VM.routes;
    get_route_list(routes)
}

function _global_search(query, filter){
    return new Promise(resolve => {
        searchRoutes(query)
        var query_whitelist = ['events'];
        var i = 0;
        var res = [];
        for(var key in filter){
            if(query_whitelist.includes(filter[key])){
                _dbs[filter[key]].find({}, (err, docs) => {
                    searchFor(docs, query).forEach(item => {
                        res.push(item)
                    })
    
                    console.log(res)
                    if(i == filter.length){
                        console.log('done')
                        resolve(res)
                    }
                })
            }
            i++
        }
    })
}

function _get_news(query){
    return new Promise(resolve => {
        var url = `${root_url}/get_news`;
        http_fetch(url, {query: query}, "POST").then(res => {
            resolve(res);
        })
    })
}


function loadAPI(){
    _get_events().then(res => {
        events = res;
        console.log(res)
        window.DP.dispatch('API_LOAD');
    })   
}

setTimeout(() => {
    loadAPI();
}, 350);


const API2 = {
    get dbs(){
        return _dbs;
    },

    get_db(db){
        return _dbs[db]
    },

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

    new_db(name){
        _new_db(name);
    },
    
    get events_db(){
        return new Promise(resolve => {
            _get_events().then(events => {
                resolve(events);
            })
        })
    },


    get events(){
        return events;
    },

    get_event(_id){
        return new Promise(resolve => {
            this.dbs['events'].findOne({_id:_id}, (err, doc) => {
                resolve(doc);
            })
        })
    },

    new_event(data){
        return new Promise(resolve => {
            data.alarm_sound = (data.alarm_sound == undefined) ? 'none': `/audio${data.alarm_sound}`
            this.dbs['events'].insert(data,  (err, doc) => {
                if(err){
                    resolve({error: err})
                }else{
                    if(doc){
                        resolve(doc);
                    }
                }
            })            
        })
    },

    update_event(data, _id){
        return new Promise(resolve => {
            data.alarm_sound = (data.alarm_sound == undefined) ? 'none': `/audio${data.alarm_sound}`
            this.dbs['events'].update({_id: _id}, {$set: data}, (err, doc) => {
                if(err){
                    resolve({error: err})
                }else{
                    if(doc){
                        resolve(doc);
                    }
                }
            })      
        })
    },

    async get_day_events(_date){
        var date = (_date) ? _date: new Date().getDay();
        return new Promise(resolve => {
            var days_events = [];
            this.events_db.then(events => {
                if(events){
                    events.forEach(event => {
                        if(event.days.includes(Number(date))){
                            days_events.push(event)
                        }
                    })
                    resolve(days_events)
                }else{
                    resolve({error: "no events"})
                }

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

    get_news(query){
        return new Promise(resolve => {
            _get_news(query).then(news => {
                resolve(news);
            })
        })
    }
}

const API2Singleton = API2;

window.API2 = API2Singleton // web

export default window.API2 // this will initialise the singleton instantly