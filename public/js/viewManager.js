var main_content_div = document.getElementsByTagName('main-content')[0]
var top_nav_bar = document.getElementsByTagName('menu-bar-top')[0]
var bottom_nav_bar = document.getElementsByTagName('menu-bar-bottom')[0]
var routes = {};
var current_url = location.href;
var global_el_division = 12;
var current_view;


function setTheme(){
    //_set_theme_property('--theme-primary-color', '#706fd3');
    //_set_theme_property('--theme-secondary-color', '#c0392b')
}

function _set_theme_property(property, value){
    document.documentElement.style.setProperty(property, value);
}

function _set_title(title){
    top_nav_bar.setAttribute('title', title)
    document.getElementsByTagName('title')[0].textContent = title
}

function _set_view(view_path){
    var view;
    var title;
    if(view_path.length == 1){
        //first level route
        if(!routes[view_path[0]]){
            window.history.back();
        }else{

            view = routes[view_path[0]].view;
            title = routes[view_path[0]].title;
            _set_title(title)
        }
    }else{
        var entry = routes[view_path[0]]
        var entry_stack = [];
        var previous_entry;
        for(var i = 0; i < view_path.length; i++){
            previous_entry = entry;
            if(i == 0){
                entry = previous_entry;
            }else{
                if(entry == undefined){
                    console.log(entry_stack)
                    entry = entry_stack[1].subViews['*'].subViews[view_path[i]]
                }else{
                    entry = entry.subViews[view_path[i]]
                }
            }
            entry_stack.push(entry)
        }

        if(entry == undefined){
            if(previous_entry.subViews['*']){
                view = previous_entry.subViews['*'].view;
                title = previous_entry.subViews['*'].title;
            }else if(previous_entry.subViews['*']){
                
            }else{
                window.history.back();
            }
        }else{
            view = entry.view;
            title = entry.title;
        }


    }
    _set_title(title)
    main_content_div.innerHTML = view;
    _cache_last_view(view);
    if(window.API2.getMobileOperatingSystem() == "iOS"){
        if(window.navigator.standalone == true){
            document.body.style.paddingTop = "40px";
            main_content_div.style.marginTop = "40px";
        }
    }

}

function _cache_last_view(view){
    window.localStorage.lastView = view;
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
    }, 100)
}

function _get_view_from_url(){
    var view = current_url.split('/')[3];
    var sub_view = current_url.split('/')[4];
    var view_path = current_url.slice(current_url.indexOf('/') + 1, current_url.length).split('/');
    var final_paths = [];

    for(var i = 2; i < view_path.length; i++){
        final_paths.push(view_path[i])
    }

    _set_view(final_paths);
}

function _add_bottom_button(icon, url){
    bottom_nav_bar.add_item(icon, url);
}

function _resize_components(){
    document.getElementsByClassName('view')[0].resizeComponents()
}

const ViewManager = {
    main_content_div: main_content_div,
    global_el_division: global_el_division,
    current_view: current_view,
    get routes(){
        return routes;

    },
    
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
    },

    add_bottom_button(icon, url){
        _add_bottom_button(icon, url);
    },

    begin(){
        _url_listener();
        _get_view_from_url();
        setTheme();
        window.onresize = () => {
            _resize_components()
        };
    },

    resize_components(){
        _resize_components();
    }
}

const VMSingleton = ViewManager;

window.VM = VMSingleton // web

export default window.VM // this will initialise the singleton instantly