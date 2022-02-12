var main_content_div = document.getElementsByTagName('main-content')[0]
var top_nav_bar = document.getElementsByTagName('menu-bar-top')[0]
var routes = {};
var current_url = location.href;

    document.body.addEventListener('wheel', (e) => {
        if(e.path[0].tagName == 'BODY'){
            e.preventDefault();
           
        }
    }, {passive:false})

function setTheme(){
    _set_theme_property('--theme-primary-color', '#01a3a4');
    _set_theme_property('--theme-secondary-color', 'darkcyan')
}

function _set_theme_property(property, value){
    document.documentElement.style.setProperty(property, value);
}

function _set_title(title){
    top_nav_bar.setAttribute('title', title)
}

function _set_view(view, sub_view){
        if(!routes[view]){
            window.history.back();
            _set_title(routes['404'].view);
        }else{
            if(sub_view){
                if(routes[view].subViews){
                    console.log('sub_view')
                    var counter = 0;
                    for(var key in routes[view].subViews){
                        if(key == "*"  && counter == 0){
                            _set_title(routes[view].subViews['*'].title)
                            main_content_div.innerHTML = routes[view].subViews['*'].view;
                        }else{
                            if(routes[view].subViews[sub_view]){
                                _set_title(routes[view].subViews[sub_view].title)
                                main_content_div.innerHTML = routes[view].subViews[sub_view].view;
                            }else{
                                if(routes[view].subViews['*']){
                                    _set_title(routes[view].subViews['*'].title)
                                    main_content_div.innerHTML = routes[view].subViews['*'].view;
                                }else{
                                    window.history.back();
                                }
                            }
                        }
                        counter++;
                    }
  
                }else{
                    console.log('no')
                    window.history.back();
                }
            }else{
                _set_title(routes[view].title)
                main_content_div.innerHTML = routes[view].view;
            }

        }
}

function _url_listener(){
    // Store the current page URL on load
    current_url = location.href;
    // listen for changes
    setInterval(function(){
        if (current_url != location.href){
            window.loadingSpinner.show();
            current_url = location.href;
            _get_view_from_url();
        }
    })
}

function _get_view_from_url(){
    var view = current_url.split('/')[3];
    var sub_view = current_url.split('/')[4];
    if(sub_view != undefined){
        _set_view(view, sub_view)  
    }else{
        _set_view(view)
    }
}

setTheme();
setTimeout(() => {
    _url_listener();
}, 350)

const ViewManager = {
    register(_routes){
        routes = _routes;
        console.log(routes)
    },

    _setView(view, sub_view){
         _set_view(view, sub_view)
    },

    _URL_LISTENER(){
        _url_listener();
    },

    get_view_from_url(){ 
        _get_view_from_url();
    },

    set_title(title){
        _set_title(title)
    },

    set_theme_property(property, value){
        _set_theme_property(property, value)
    }
}

const VMSingleton = ViewManager;

window.VM = VMSingleton // web

export default window.VM // this will initialise the singleton instantly