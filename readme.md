Start the server using `node server` and you have a playground for all of the custom components. within this library consists custom HTML elements and a template for getting started with the custom routing sytem and view manager.


in `/public/index.html` you will see the main html file loaded for this whole webapp. This HTML page ultimately will host every custom page we make ourselves. all the body consists of is this.
```html
 <menu-bar-top></menu-bar-top>
 <main-content></main-content>
 <menu-bar-bottom>
     <div class="header-center-button-container">
         <span class="material-icons header-center-button" onclick='window.history.pushState("","","/OtherMagic")'>auto_awesome</span>
     </div>
     <div class="header-center-button-container">
         <span class="material-icons header-center-button" onclick='window.history.pushState("","","/Components")'>auto_awesome_motion</span>                                        
     </div>
     <div class="header-center-button-container">
         <span class="material-icons header-center-button" onclick='window.history.pushState("","","/About")'>info</span>                                        
     </div>
 </menu-bar-bottom>
 <loading-spinner></loading-spinner>
```

it is up to you to define pages for your user. you can see an example of this in `/public/js/main.js`

here is an example of the using the router

```javascript
var routes = {
    "":{
        title: 'Components',
        view:`<components-view></components-view>`
    },
    "Components":{
        title:'Components',
        view:'<components-view></components-view>'
    },
    "OtherMagic":{
        title:'Other Magic',
        view:`<other-magic-view></other-magic-view>`
    },
    "About":{
        title:"Other Info",
        view:`<other-info-view></other-info-view>`,
        subViews:{
            //this is a subview so the route would be /About/subView
            "subView":{
                title:"this is a subview",
                view:`<about-sub-view></about-sub-view>`
            }
        }
    }
}

window.VM.register(routes)
```

The `title` attribute denotes the text displayed in the `<menu-bar-top>` of every page.

The `view` attribute denotes the view element name. as denoted at the bottom of every custom view using
```javascript
window.customElements.define('element-name', ElementClass)
```

to create a new page for your app simply create a new file in `/public/views/` ensure you import your custom element at the top of your `/public/js/main.js` file
```javascript
import{ElementClass} from '/js/components/ElementFile.js';
```
Pages are just custom elements with `class="view"` the `/public/css/main.css/` file will handle the styling for the page. all you need to do is use the custom elements in the `innerHTML`

all of the predefined components are in `/public/components/` of this example 