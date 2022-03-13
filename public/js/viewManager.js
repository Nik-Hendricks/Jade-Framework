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


function _set_view(view_path){
    console.log(view_path)
    var view;

    if(view_path.length == 1){
        if(!routes[view_path[0]]){
            window.history.back();
        }else{
            var view = routes[view_path[0]].view;
            var title = routes[view_path[0]].title;
    
            _set_title(title)
            main_content_div.innerHTML = view;
        }

    }else{
        var view;
        var title;
        var entry = routes[view_path[0]]
        var entry_stack = [];
        var previous_entry;
        for(var i = 1; i < view_path.length; i++){
            entry_stack.push(view_path[i])
            var previous_entry = entry;
            //this.routes[entry].sub_view
            entry = entry.subViews[view_path[i]];
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
        _set_title(title)
        main_content_div.innerHTML = view;
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
    var view_path = current_url.slice(current_url.indexOf('/') + 1, current_url.length).split('/');

    
    var final_paths = [];
    for(var i = 2; i < view_path.length; i++){
        final_paths.push(view_path[i])
    }

    _set_view(final_paths);

    //if(sub_view != undefined){
    //    _set_view(view, sub_view)  
    //}else{
    //    _set_view(view)
    //}
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