(()=>{"use strict";var n,t,r,a,i,o,e,l,p,d,c,g,s,h,m={556:(n,t,r)=>{r.d(t,{Z:()=>l});var a=r(81),i=r.n(a),o=r(645),e=r.n(o)()(i());e.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);"]),e.push([n.id,'*{\n    font-family: \'Roboto\', sans-serif;\n    -webkit-touch-callout: none; /* iOS Safari */\n    -webkit-user-select: none; /* Safari */\n    -khtml-user-select: none; /* Konqueror HTML */\n    -moz-user-select: none; /* Old versions of Firefox */\n    -ms-user-select: none; /* Internet Explorer/Edge */\n    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */\n    -moz-box-sizing: border-box;    /* Firefox, other Gecko */\n    box-sizing: border-box;         /* Opera/IE 8+ */\n    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */\n}\n\n:root{\n    --white:#EEEEEE;\n    --light-grey:#3A3B3C;\n    --lightish-grey:#202122;\n    --dark-grey:#18191A;\n    --global-border-radius:10px;\n    --global-margin:10px;\n    --global-padding:20px;\n    --global-input-height:35px;\n    --global-input-font-size:16px;\n    --header-height:60px;\n    --global-animation-length:.1s;\n    --theme-primary-color:#706fd3;\n    --theme-secondary-color:#574b90;\n    --theme-tertiary-color:#1d7ebe;\n    --theme-card-color:#1f2122;\n    --theme-background-color:#131414;\n    --theme-hover-color:#3A3B3C;\n    --theme-text-primary-color:#E4E6EB;\n    --theme-text-secondary-color:#B0B3B8;\n}\n\n.prevent-ios-focus-scrolling {\n  position: fixed;\n  left: 0;\n  right: 0;\n}\n\n.brand-primary-color{\n    color:var(--theme-primary-color);\n}\n\nhtml{\n    scroll-behavior: smooth;\n    height  : 100%;\n    overflow: hidden;\n    position: relative;\n}\n\nbody{\n    background: var(--theme-background-color);\n    overflow: hidden;\n    margin:0;\n    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);\n    height  : 100%;\n    overflow: auto;\n    position: relative;\n}\n\ninput, input:before, input:after, .list-item {\n    -webkit-user-select: initial;\n    -khtml-user-select: initial;\n    -moz-user-select: initial;\n    -ms-user-select: initial;\n    user-select: initial;\n    -webkit-appearance: none;\n   } \n\n::-webkit-scrollbar {\n    background: transparent;\n    width:0px;\n    display:none;\n  }\n   \n ::-webkit-scrollbar-track {\n    background: transparent;\n    width:0px;\n    display:none;\n  }\n   \n::-webkit-scrollbar-thumb {\n    background: transparent;\n    width:0px;\n    display:none;\n  }\n\n.overflow-scroll{\n    overflow:scroll !important;\n    -webkit-overflow-scrolling: touch !important;\n}\n\nmenu-bar-bottom{\n    position: absolute;\n    bottom:0px;\n    left:0px;\n    right:0px;\n    height:60px;\n    padding:0;\n    margin:0;\n    background:transparent;\n}\n\n.menu-bar-top{\n    width:100%;\n    height:60px;\n    display:block;\n}\n\n.menu-bar-top h1{\n    color:var(--theme-primary-color);\n    margin:0;\n    line-height:60px;\n    font-size:16px;\n    float:left;\n    margin-left:auto;\n    text-align:center;\n    width:100%;\n    position:absolute;\n    z-index:-1;\n}\n\n\n\n.menu-bar-top .back{\n    float:left;\n    margin-left:var(--global-margin);\n    color:var(--theme-primary-color);\n    line-height: 60px;\n}\n\n.menu-bar-top .search{\n    float:right;\n    margin-right:var(--global-margin);\n    color:var(--theme-primary-color);\n    line-height: 60px;\n}\n.header-center-button-container{\n    float:left;\n    width:33%;\n    height:var(--header-height);\n    padding:0;\n    margin:0;\n    padding: auto;\n}\n\n\n.header-center-button{\n    font-size:35px;\n    color: var(--theme-primary-color);\n    background:transparent;\n    border-radius: 17.5px;\n    margin-top:calc(calc(var(--header-height) - 35px) / 2);\n    margin-left:calc(50% - 35px / 2);\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n    cursor:pointer;\n}\n\n.header-center-button img{\n    width:35px;\n    height:35px;\n    padding:0;\n    margin:0;\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n}\n\n.header-center-button:hover img{\n    filter: invert(87%) sepia(16%) saturate(860%) hue-rotate(102deg) brightness(96%) contrast(93%);\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n}\n\n\n.header-center-buttons-container .header-center-button:hover{\n    color:var(--brand-tertiary-color);\n    background:var(--light-grey);\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n}\n\n.header a{\n    text-decoration: none;\n    float:right;\n    line-height: 60px;\n    vertical-align: middle;\n    margin:0;\n    padding:0;\n    margin-right:20px;\n    color:var(--white);\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n}\n\nmain-content{\n    z-index: 1;\n    position: absolute;\n    display:block;\n    top:60px;\n    right:0px;\n    left:0px;\n    bottom:65px;\n    overflow-y:hidden;\n    -webkit-overflow-scrolling: touch;\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n}\n\n.view{\n    position: absolute;\n    width:100%;\n    height: 100%;\n    overflow:hidden;\n    padding:0;\n    margin:0;\n    overflow-y:scroll;\n}\n\n.rater{\n    display:block;\n    width:105px;\n    height:25px;\n    border-radius:var(--global-border-radius);\n    background:var(--dark-grey);\n    overflow:hidden;\n}\n\n.rater img{\n    height: 15px !important;\n    width:15px !important;\n    margin-top:5px !important;\n    margin-bottom:5px !important;\n    margin-left:5px !important;\n    position: relative !important;\n    top:0px !important;\n    left:0px !important;\n}\n\n.red{\n    color:#e74c3c !important;\n}\n\n#loading {\n    display: inline-block;\n    width: 50px;\n    height: 50px;\n    border: 3px solid rgba(255,255,255,.3);\n    border-radius: 50%;\n    border-top-color: var(--theme-primary-color);\n    animation: spin 1s ease-in-out infinite;\n    -webkit-animation: spin 1s ease-in-out infinite;\n    z-index: 99;\n  }\n  \n  /*\n  @keyframes spin {\n    to { -webkit-transform: rotate(360deg); }\n  }\n  @-webkit-keyframes spin {\n    to { -webkit-transform: rotate(360deg); }\n  }\n  */\n\n\n.loading-spinner{\n    position:absolute;\n    left:50%;\n    margin-left:-25px;\n    top:50%;\n    margin-top:-25px;\n    z-index:99;\n}\n\nh1,h2,h3,h4, h5, h6, li,p,a{\n    color:var(--theme-text-primary-color);\n    margin:var(--global-margin);\n    margin-bottom:20px;\n    display:block;\n}\n\ntextarea{\n    margin-left:var(--global-margin);\n    margin-top:var(--global-margin);\n    border-radius: var(--global-border-radius);\n    border:none;\n    background:var(--theme-card-color);\n    color:var(--theme-text-primary-color);\n    position: relative;\n    font-size: var(--global-input-font-size);\n    width:calc(100% - calc(var(--global-margin)  * 2));\n    outline:none;\n    padding-left:10px;\n    padding-top:10px;\n    resize:none;\n}\n\n\n.sidescroller{\n    display:block;\n    position:relative;\n    height: auto;\n    margin:0px;\n    cursor: grab;\n    overflow: auto;\n    border-radius: var(--global-border-radius);\n    -webkit-overflow-scrolling: touch;\n}\n\n.sidescroller-content{\n    height: auto;\n    -webkit-overflow-scrolling: touch;\n    border-radius: var(--global-border-radius);\n    margin-right: 10px;\n}\n\n.sidescroller-content:last-child{\n    margin-right:var(--global-margin); \n}\n\n.post-card{\n    display:block;\n    position:relative;\n    margin:var(--global-margin);\n    height:auto;\n    background:#2c2c2c;\n    border-radius: var(--global-border-radius);\n}\n\n\n.post-card .post-card-header{\n    margin-top:20px;\n}\n\n.post-card hr{\n    margin-top:0px;\n    margin-bottom:10px;\n    padding:0px;\n}\n\n.post-card h1{\n    font-size:20px;\n    position:relative;\n    display:block;\n    margin-bottom:0px;\n    text-transform: capitalize;\n}\n\n.post-card-footer{\n    display:block;\n    right:0px;\n    left:0px;\n    bottom:0px;\n    height:50px;\n    background:#202020;\n    margin-top:10px;\n    border-bottom-left-radius: var(--global-border-radius);\n    border-bottom-right-radius: var(--global-border-radius);\n}\n\n.post-card-footer .custom-button{\n    height:30px;\n    padding: 0;\n    padding-left:10px;\n}\n\n.post-card-footer .custom-button p, .post-card-footer span{\n    line-height: 30px;\n    \n}\n\n.post-card-header{\n    display:block;\n    position:relative;\n    background:#202020;\n    border-top-left-radius: var(--global-border-radius);\n    border-top-right-radius: var(--global-border-radius);\n}\n\n.post-card-header img{\n    --profile-card-small-image-size: 40px;\n    height:var(--profile-card-small-image-size);\n    width:var(--profile-card-small-image-size);\n    border-radius:calc(var(--profile-card-small-image-size) / 2);\n    margin:var(--global-margin);\n}\n\n.post-card-header .username{\n    margin:unset;\n    position: absolute;\n    left:85px;\n    top:10px;\n}\n\n.post-card-header .trophy-chip{\n    margin:unset;\n    position: absolute;\n    top:20px;\n    left:80px;\n    width:120px;\n    height:20px;\n}\n\n.post-card-header .trophy-chip .mini-trophy-item{\n    width:40px;\n    height:20px;\n}\n\n.post-card-header .trophy-chip .mini-trophy-item p{\n    font-size:10px;\n}\n\n.post-card-header .trophy-chip .mini-trophy-item .material-icons{\n    font-size:10px;\n}\n\n.card{\n    height:auto;\n    margin-left:var(--global-margin);\n    margin-bottom:var(--global-margin);\n    padding:0px;\n    padding-top:var(--global-margin);\n    background:var(--theme-card-color);\n    border-radius:var(--global-border-radius);\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n    overflow-wrap:break-word;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n\n.icon-card{\n    position: relative;\n    margin:0;\n    padding:0;\n    margin-top:var(--global-margin);\n    margin-left:var(--global-margin);\n    height:auto;\n    min-height: 150px;\n    max-width: 500px;\n    padding:var(--global-padding);\n    background:var(--theme-card-color);\n    border-radius:var(--global-border-radius);\n    display:block;\n    float:left;\n}\n\n.icon-card span{\n    font-size: 50%;\n}\n\n.card-2{\n    position:relative;\n    margin-left:0px;\n    margin-right:0px;\n    margin-top:0px;\n    margin-bottom:0px;\n    height:auto;\n\n\n}\n\n.card-2 p{\n    position:absolute;\n    left:10px;\n    margin:0px;\n    padding:0px;\n    color:var(--theme-text-primary-color);\n    bottom:10px;\n    font-size:15px;\n    max-width: 130px;\n    white-space:nowrap;\n    text-overflow: ellipsis;\n    height:17px;\n    overflow:hidden;\n}\n\n.card-2 .secondary{\n    right:var(--global-margin);\n    left:unset;\n    color:var(--theme-primary-color);\n    line-height: unset;\n    font-size:15px;\n}\n\n.card-2 h1{\n    position:absolute;\n    color:var(--theme-text-primary-color);\n    padding:0;\n    margin:0px;\n    font-size:18px;\n    z-index:3;\n    text-transform: capitalize;\n    bottom:var(--global-margin);\n    width:100%;\n    text-align:center;\n}\n\n.card-2 img{\n    width:calc(100% - 5px * 2);\n    height: calc(50vw - 5px * 2);\n    margin-left:5px;\n    margin-right:5px;\n    margin-bottom:calc(calc(var(--global-margin) * 2) + 5px);\n    border-radius: var(--global-border-radius);\n    max-width: 350px;\n    max-height: 350px;\n    float:left;\n  \n}\n\n.card .icon-button{\n    position:absolute;\n    bottom:15px;\n    left:var(--global-margin);\n}\n\n\n.card img{\n    border-radius:var(--global-border-radius);\n    width:100%;\n}\n\n.p-right{\n\n    float:right;\n    position:relative;\n    width:calc(50vw - var(--global-margin) * 2);\n    margin:var(--global-margin);\n    font-size:15px;\n    line-height: auto;\n    text-align: justify;\n}\n\n.img-left{ \n    width:calc(50vw - var(--global-margin) * 2) !important;\n    border-radius:var(--global-border-radius);\n    margin:var(--global-margin) !important;\n    position:relative;\n\n}\n\n.custom-dropdown-button-content{\n    display:none;\n    position:absolute;\n    top:calc(var(--global-input-height) + 5px);\n    width:100%;\n    background:var(--theme-hover-color);\n    border-radius:var(--global-border-radius);\n    z-index:99;\n}\n\n.custom-dropdown-button-content.opened{\n    display:block !important;\n    overflow:scroll;\n}\n\n.custom-dropdown-button-content .list-item{\n    height:var(--global-input-height);\n    background:transparent;\n    border-bottom: 1px solid var(--theme-card-color);\n    overflow:hidden;\n}\n\n.custom-dropdown-button-content .list-item span{\n    font-size:var(--global-input-font-size);\n    line-height:var(--global-input-height);\n}\n\n.custom-dropdown-button-content .list-item p{\n    height:var(--global-input-height);\n    line-height:var(--global-input-height);\n}\n\n.custom-dropdown-button{\n    margin-left:var(--global-margin);\n    margin-bottom:var(--global-margin);\n}\n\n.custom-button{\n    margin-bottom:var(--global-margin);\n    margin-left:var(--global-margin);\n    height:var(--global-input-height);\n    margin-right:0px;\n    background:var(--theme-card-color);\n    border-radius:var(--global-border-radius);\n    max-width:500px;\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n}\n\n.custom-button.clicked-animation{\n    background: var(--theme-primary-color) !important;\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n}\n\n.custom-button.hovered{\n    background: var(--theme-hover-color);\n    transition: ease-in-out var(--global-animation-length);\n}\n\n.custom-button span{\n    color:var(--theme-primary-color);\n    width:16px;\n    height:16px;\n    position:absolute;\n    vertical-align: middle;\n    padding:0px;\n    margin:0px;\n    font-size:16px;\n    margin-top:calc(calc(var(--global-input-height) - var(--global-input-font-size)) / 2);\n    margin-left:var(--global-margin);\n}\n\n.custom-button p{\n    text-align: center !important;\n    margin:0px;\n    padding:0px;\n    float:left;\n    height: var(--global-input-font-size);\n    line-height: var(--global-input-font-size);\n    color:var(--white);\n    width:100%;\n    font-size:var(--global-input-font-size);\n    text-transform: capitalize;\n    overflow:hidden;\n    margin-top:calc(calc(var(--global-input-height) - var(--global-input-font-size)) / 2);\n}\n\n.custom-button i{\n    color:var(--theme-primary-color);\n    vertical-align: middle;\n    float:left;\n    padding:0px;\n    margin:0px;\n    font-size:16px;\n}\n\n.custom-text-input{\n    margin:0px;\n    margin-left:var(--global-margin);\n    margin-bottom:var(--global-margin);\n    height:var(--global-input-height);\n    padding:8px;\n    background:var(--lightish-grey);\n    border-radius:var(--global-border-radius);\n    max-width:500px;\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n    outline:none;\n    color:var(--theme-primary-color);\n    overflow-y:scroll;\n    -webkit-user-select: initial;\n    -khtml-user-select: initial;\n    -moz-user-select: initial;\n    -ms-user-select: initial;\n    user-select: initial;\n    -webkit-appearance: none;\n}\n\n[contenteditable] {\n    padding:8px; \n}\n[placeholder]:empty:before {\n     content: attr(placeholder);\n     font-size:var(--global-input-font-size);\n     color: #888;\n}\n\n\n.primary-text-color{\n    color:var(--theme-text-primary-color) !important;\n}\n\n\n.color-picker-container{\n    display:none;\n    position:absolute;\n    width:100%;\n    padding:0px;\n    top:calc(var(--global-input-height) + 5px);\n    z-index:99;\n}\n\n.color-picker-container.opened{\n    display:block !important;\n    overflow:scroll;\n}\n\n.grid-container{\n    position:relative;\n    display:inline-block;\n    width:100%;\n    height:auto;\n}\n\n.grid-container .card-2{\n    width:calc(50%);\n    float:left;\n    height:auto !important;\n    background:transparent;\n    margin:0px;\n    padding:0px;\n}\n\n.grid-container .card{\n    --width:calc(50% - var(--global-margin) * 2);\n    width: var(--width);\n    height:100px;\n    margin:0;\n    float:left;\n    margin-left:var(--global-margin);\n    margin-top:var(--global-margin);\n}\n\n\n.image-slider{\n    display:block;\n    height: auto;\n    margin:0;\n    cursor: grab;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n}\n\n.image-slider .images{\n    height: auto;\n    display:block;\n    width:9999px;\n    -webkit-overflow-scrolling: touch;\n\n}\n\n.image-slider img{\n    width:calc(100vw - var(--global-margin) * 2);\n    height:calc(100vw - var(--global-margin) * 2);;\n    max-height: calc(700px - var(--global-margin) * 2);\n    max-width: calc(700px - var(--global-margin) * 2);\n    border-radius:var(--global-border-radius);\n    margin:var(--global-margin);\n    margin-top:0px;\n    margin-bottom:0px;\n}\n\n.list-item{\n    background:var(--theme-card-color);\n    --list-item-height:60px;\n    position:relative;\n    display: block;\n    width:100%;\n    height:var(--list-item-height);\n    /*border-bottom:1px solid var(--theme-card-color);*/\n}\n\n.list-item p{\n    position:absolute;\n    width:100%;\n    text-align:center;\n    padding:0;\n    margin:0;\n    font-size:15px;\n    line-height: var(--list-item-height);\n}\n\n.list-item span{\n    line-height:var(--list-item-height);\n    float:left;\n    height:var(--list-item-height);\n    width:auto;\n    top:0;\n    color:var(--theme-primary-color);\n    margin-left:var(--global-margin);\n    font-size:25px;\n    text-align: center;\n}\n\n.list-item span.right{\n    float:right;\n    color:var(--theme-hover-color);\n    margin-right:var(--global-margin);\n}\n\n.primary{\n    width:auto;\n    display:inline-block;\n}\n\n.secondary{\n    width:auto;\n    display:inline-;\n    float:right;\n    color:var(--theme-primary-color);\n    font-size:15px;\n    line-height:38px;\n    width:auto;\n}\n\n.description{\n    display:block;\n    float:left;\n    margin:var(--global-margin);\n    margin-top:unset;\n}\n\nhr{\n    margin:var(--global-margin);\n    height: 1px;\n    background-color: var(--theme-card-color);\n    border: none;\n}\n\n.code-format{\n    background:var(--theme-card-color);\n    padding:5px;\n    border-radius: 5px;\n    font-size:15px;\n    font-weight: normal;\n}\n\n.music-player{\n    --music-player-height:80px;\n    position:absolute !important;\n    bottom:0px;\n    right:0px;\n    left:0px;\n    height:var(--music-player-height);\n    background:var(--theme-card-color);\n}\n\n.music-player .material-icons{\n    line-height: calc(var(--music-player-height) - 30px);\n    font-size:40px;\n    width:33%;\n    float:left;\n    text-align:center;\n    color:var(--theme-primary-color);\n}\n\n.slider-input{\n    display:block;\n    margin-left:var(--global-margin);\n    margin-right:var(--global-margin);\n}\n\n.slider-input input[type="range"] {\n    -webkit-appearance: none;\n    width: 100%;\n    height: 5px;\n    background: #d3d3d3;\n    outline: none;\n    opacity: 0.7;\n    -webkit-transition: ease-in-out var(--global-animation-length);\n    transition: ease-in-out var(--global-animation-length);\n    border-radius: 2.5px;\n  }\n  \n  .slider-input input[type="range"]:hover {\n    opacity: 1;\n  }\n  \n  .slider-input input[type="range"]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 15px;\n    height: 15px;\n    background: var(--theme-secondary-color);\n    cursor: pointer;\n    border-radius:7.5px;\n  }\n  \n  .slider-input input[type="range"]::-moz-range-thumb, .slider-input input[type="range"]::-webkit-slider-thumb {\n    width: 15;\n    height: 15px;\n    background: var(--theme-secondary-color);\n    cursor: pointer;\n    border-radius:7.5px;\n  }\n\n  .sql-editor .line-number-container{\n    position:absolute;\n    top:2px;\n    left:2px;\n    bottom:2px;\n    width:28px;\n    background:var(--theme-background-color);\n    border-bottom-left-radius:var(--global-border-radius);\n    border-top-left-radius:var(--global-border-radius);\n}\n\n\n.sql-editor .line-number-container p{\n    padding:0px;\n    margin:0px;\n    line-height: 30px;\n    text-align: center;\n    color:var(--theme-primary-color);\n}\n.sql-editor .textarea-container{\n    position:absolute;\n    left:30px;\n    right:0px;\n    bottom:0px;\n    top:0px;\n    border-radius:var(--global-border-radius);\n    padding:2px;\n}\n\n.sql-editor .textarea-container textarea{\n    all:unset;\n    background:var(--theme-background-color);\n    width:calc(100% - 5px);\n    height:100%;\n    border-top-right-radius:var(--global-border-radius);\n    border-bottom-right-radius:var(--global-border-radius);\n    line-height: 30px;\n    color:var(--theme-primary-color);\n    padding-left:5px;\n    -webkit-user-select: text;\n}\n\n.sql-editor .card{\n    height:calc(6 * 30px) !important;\n    overflow:none !important;\n\n}\n\n.sql-editor .output{\n    height:auto !important;\n    overflow-y:scroll;\n    \n}\n\n.calculator{\n    width:100%;\n    max-width: 350px;\n    height:440px;\n    margin:auto;\n}\n\n.calculator-btn{\n    --calculator-btn-size:calc(calc(350px / 4) - 5px * 2);\n    width:var(--calculator-btn-size);\n    height:var(--calculator-btn-size);\n    float:left;\n    margin:5px;\n    background:var(--theme-primary-color);\n    border-radius: var(--global-border-radius);\n}\n\n.calculator-btn.double{\n    background:var(--theme-card-color);\n    width: calc(calc(var(--calculator-btn-size) * 2) + 10px) !important;\n}\n\n.calculator-btn p{\n    width:100%;\n    height:var(--calculator-btn-size);\n    line-height: var(--calculator-btn-size);\n    text-align: center;\n    padding:0px;\n    margin:0px;\n    vertical-align: middle;\n}\n\n.calculator-output{\n    width:calc(100% - 5px) !important;\n    max-width:350px;\n    margin-left:50% !important;\n    position:relative;\n    left:-175px !important;\n    height:55px !important;\n    margin-bottom:10px !important;\n    margin-left:var(--global-margin);\n    background: var(--theme-card-color) !important;\n    outline:none;\n    padding-left:10px;\n    font-size:20px;\n}\n\n.calculator-history{\n    margin-top:var(--global-margin);\n    width:100%;\n\n}\n\n\n.calculator-history .history-item{\n    position:relative;\n    height:auto;\n}\n\n.calculator-history .calculator-mode{\n    position:relative;\n    right:0px;\n    top:0px;\n    float:right;\n    padding:0px;\n    margin:0px;\n    margin-right:var(--global-margin);\n    margin-top:-35px;\n}\n\n\n\n.calculator-history .secondary, .calculator-history .primary{\n    font-size:20px !important;\n    padding:0px !important;\n    margin:0px !important;\n    line-height: 20px;\n    float:unset !important;\n    margin-left:var(--global-margin) !important;\n    margin-top:10px !important;\n}\n\n.calculator-history .secondary{\n    width:100%;\n    margin-top:var(--global-margin);\n}\n\n.calculator-history .primary{\n    width:100%;\n}\n\n.calculator-history hr{\n    margin-top:var(--global-margin) !important;\n}\n\n.calendar{\n    --calendar-size: 350px;\n    width:100%;\n    float:left;\n    height:auto;\n    margin:auto;\n    display:block;\n    padding:0;\n}\n\n.calendar .day-container{\n    width:350px;\n    margin:auto;\n}\n\n.calendar-day{\n    --calendar-btn-size:calc(calc(var(--calendar-size) / 7) - 5px * 2);\n    width:var(--calendar-btn-size);\n    min-height:var(--calendar-btn-size);\n    float:left;\n    margin:5px;\n    background:var(--theme-primary-color);\n    border-radius: 10px;\n}\n\n.calendar-day p{\n    width:100%;\n    height:var(--calendar-btn-size);\n    line-height: var(--calendar-btn-size);\n    text-align: center;\n    padding:0px;\n    margin:0px;\n    vertical-align: middle;\n}\n\n.calendar-day.outline{\n    border:1px solid var(--theme-text-primary-color);\n    width:calc(var(--calendar-btn-size) - 2px);\n    height:calc(var(--calendar-btn-size) - 2px);\n}\n\n.calendar-day.secondary{\n    background:var(--theme-card-color);\n}\n\n.calendar .title{\n    text-align: center;\n    margin:0px;\n    width:calc(100% - calc(39px * 2));\n    text-transform: capitalize;\n    display: inline-block;\n}\n\n.prev-month{\n    display: inline-block;\n    margin:0px;\n    padding:0px;\n    margin-left:var(--global-margin);\n    color:var(--theme-primary-color);\n}\n\n.next-month{\n    display: inline-block;\n    margin:0px;\n    padding:0px;\n    margin-right:var(--global-margin);\n    color:var(--theme-primary-color);\n}\n\n.calendar-cols{\n    height:20px;\n    width:350px;\n    margin:auto;\n    position:relative;\n}\n\n.calendar-controls{\n    width:350px;\n    margin:auto;\n}\n\n.calendar-cols p{\n    width:40px;\n    margin:5px;\n    padding:0px;\n    float:left;\n    font-size:auto;\n    text-align: center;\n    color:var(--theme-text-secondary-color);\n    text-transform: capitalize;\n}\n\n/*@media only screen and (min-width: 500px) {\n    main-content{\n        width:500px;\n        margin:auto;\n    }\n}*/\n',""]);const l=e},645:n=>{n.exports=function(n){var t=[];return t.toString=function(){return this.map((function(t){var r="",a=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),a&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=n(t),a&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(n,r,a,i,o){"string"==typeof n&&(n=[[null,n,void 0]]);var e={};if(a)for(var l=0;l<this.length;l++){var p=this[l][0];null!=p&&(e[p]=!0)}for(var d=0;d<n.length;d++){var c=[].concat(n[d]);a&&e[c[0]]||(void 0!==o&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=o),r&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=r):c[2]=r),i&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=i):c[4]="".concat(i)),t.push(c))}},t}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var t=[];function r(n){for(var r=-1,a=0;a<t.length;a++)if(t[a].identifier===n){r=a;break}return r}function a(n,a){for(var o={},e=[],l=0;l<n.length;l++){var p=n[l],d=a.base?p[0]+a.base:p[0],c=o[d]||0,g="".concat(d," ").concat(c);o[d]=c+1;var s=r(g),h={css:p[1],media:p[2],sourceMap:p[3],supports:p[4],layer:p[5]};if(-1!==s)t[s].references++,t[s].updater(h);else{var m=i(h,a);a.byIndex=l,t.splice(l,0,{identifier:g,updater:m,references:1})}e.push(g)}return e}function i(n,t){var r=t.domAPI(t);return r.update(n),function(t){if(t){if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap&&t.supports===n.supports&&t.layer===n.layer)return;r.update(n=t)}else r.remove()}}n.exports=function(n,i){var o=a(n=n||[],i=i||{});return function(n){n=n||[];for(var e=0;e<o.length;e++){var l=r(o[e]);t[l].references--}for(var p=a(n,i),d=0;d<o.length;d++){var c=r(o[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}o=p}}},569:n=>{var t={};n.exports=function(n,r){var a=function(n){if(void 0===t[n]){var r=document.querySelector(n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(n){r=null}t[n]=r}return t[n]}(n);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(r)}},216:n=>{n.exports=function(n){var t=document.createElement("style");return n.setAttributes(t,n.attributes),n.insert(t,n.options),t}},565:(n,t,r)=>{n.exports=function(n){var t=r.nc;t&&n.setAttribute("nonce",t)}},795:n=>{n.exports=function(n){var t=n.insertStyleElement(n);return{update:function(r){!function(n,t,r){var a="";r.supports&&(a+="@supports (".concat(r.supports,") {")),r.media&&(a+="@media ".concat(r.media," {"));var i=void 0!==r.layer;i&&(a+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),a+=r.css,i&&(a+="}"),r.media&&(a+="}"),r.supports&&(a+="}");var o=r.sourceMap;o&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(a,n,t.options)}(t,n,r)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)}}}},589:n=>{n.exports=function(n,t){if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}}},b={};function u(n){var t=b[n];if(void 0!==t)return t.exports;var r=b[n]={id:n,exports:{}};return m[n](r,r.exports,u),r.exports}u.n=n=>{var t=n&&n.__esModule?()=>n.default:()=>n;return u.d(t,{a:t}),t},u.d=(n,t)=>{for(var r in t)u.o(t,r)&&!u.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},u.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),n=u(379),t=u.n(n),r=u(795),a=u.n(r),i=u(569),o=u.n(i),e=u(565),l=u.n(e),p=u(216),d=u.n(p),c=u(589),g=u.n(c),s=u(556),(h={}).styleTagTransform=g(),h.setAttributes=l(),h.insert=o().bind(null,"head"),h.domAPI=a(),h.insertStyleElement=d(),t()(s.Z,h),s.Z&&s.Z.locals&&s.Z.locals})();