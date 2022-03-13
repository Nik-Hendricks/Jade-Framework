import Dispatcher from '/js/dispatcher.js';
import API2 from '/js/API2.js'
import ViewManager from '/js/viewManager.js';


//import all components
import {MenuBarBottom} from '/components/MenuBarBottom.js';
import {MenuBarTop} from '/components/MenuBarTop.js';
import {MainContent} from '/components/MainContent.js';
import {LoadingSpinner} from '/components/loadingSpinner.js';
import {SideScroller} from '/components/sidescroller.js';
import {Card} from '/components/Card.js';
import {IconButton} from '/components/iconbutton.js';
import {GridContainer} from '/components/GridContainer.js';
import {ImageSlider} from '/components/ImageSlider.js';
import {ListItem} from '/components/ListItem.js';
import {PostCard} from '/components/PostCard.js';
import {ContextMenu} from '/components/ContextMenu.js';
import {CodeFormat} from '/components/CodeFormat.js';
import{ColorPicker} from '/components/ColorPicker.js';
import {MusicPlayer} from '/components/MusicPlayer.js';
import {SliderInput} from '/components/SliderInput.js';
import {SQLEditor} from '/components/SQLEditor.js';
import {CustomButton} from '/components/CustomButton.js'
import {Calculator} from '/components/Calculator.js';
import {Calendar} from '/components/Calendar.js';
import {TrophyChip} from '/components/TrophyChip.js';
import {DropDownButton} from '/components/DropDownButton.js';
//import all views
import {HomeView} from '/views/HomeView.js';
import {RegisterView} from '/views/RegisterView.js';
import {ProfileView} from '/views/ProfileView.js';
import {ManageProfileView} from '/views/ManageProfileView.js'
import {LoginView} from '/views/LoginView.js';
import {LinkAccountsView} from '/views/LinkAccountsView.js';
import {ManageLeaguesView} from '/views/ManageLeaguesView.js';
import {ManageLeagueView} from '/views/ManageLeagueView.js';
import {ProfileStatsView} from '/views/ProfileStatsView.js';
import {NewLeagueView} from '/views/NewLeagueView.js';
import {ManageLeagueApplicantsView} from '/views/ManageLeagueApplicantsView.js';


window.onload = () => {
    register_service_worker();
    register_views();

    window.DP.on("VIEW_LOAD", () => {
        window.loadingSpinner.hide();
    })
    
    window.DP.on('API_LOAD', () => {
        var user = window.API2.get_user();
        console.log(user)
        if(user.error){
            console.log('no user found')
            window.history.pushState('','','/Login')
        }else{
            
        }
        window.VM.get_view_from_url();
        window.loadingSpinner.hide();
        if(getMobileOperatingSystem() == "iOS"){
            if(window.navigator.standalone == true){
                document.body.style.paddingTop = "40px";
                console.log(document.getElementsByTagName("menu-bar-top")[0])
                document.getElementsByTagName("main-content")[0].style.top = "100px"
            }
        }


    })

    window.DP.on('NO_AUTH', () => {

    })   


}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
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

function register_service_worker(){
    console.log('service worker registration')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/worker').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}



function register_views(){

    var routes = {
        "":{
            title: 'Register',
            view:`<register-view></register-view>`
        },
        "Home":{
            title: 'Gamer Esports League',
            view: `<home-view></home-view>`,
        },
        "Register":{
            title: 'Register',
            view: `<register-view></register-view>`
        },
        "Profile":{
            title: 'Profile',
            view: `<profile-view></profile-view>`,
            subViews:{
                "LinkAccounts":{
                    title:"Link Accounts",
                    view: `<link-accounts-view></link-accounts-view>`
                },
                "Manage":{
                    title:"Manage Profile",
                    view: `<manage-profile-view></manage-profile-view>`
                },
                "Stats":{
                    title:"Profile Stats",
                    view: `<profile-stats-view></profile-stats-view>`,
                }
            }
        },
        "Login":{
            title:"Login",
            view: `<login-view></login-view>`
        },
        "League":{
            title:"League",
            view:`<league-view></league-view>`,
            subViews:{
                "Manage":{
                    title: "Manage Leagues",
                    view: "<manage-leagues-view></manage-leagues-view>",
                    subViews:{
                        "*":{
                            title: "Manage League",
                            view: `<manage-league-view>`,
                            subViews:{
                                "Applicants":{
                                    title: "Applicants",
                                    view: `<manage-league-applicants-view></manage-league-applicants-view>`
                                }
                            }
                        }
                    }
                },
                "New":{
                    title:"New League",
                    view:"<new-league-view></new-league-view>",
                }
            }
        }

    }
    
    window.VM.register(routes)

    
}


