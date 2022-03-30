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
import {PostCardHeader} from '/components/PostCardHeader.js';
import {PostCardFooter} from '/components/PostCardFooter.js';
import {CustomTextInput} from '/components/CustomTextInput.js';
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
import {ManageLeagueMembersView} from '/views/ManageLeagueMembersView.js';
import {ManageLeagueScheduleView} from '/views/ManageLeagueScheduleView.js';
import {ExploreView} from '/views/ExploreView.js';
import {PostView} from '/views/PostView.js';
import {FeedView} from '/views/FeedView.js';
import {SearchView} from '/views/SearchView.js';
import {SubscribersView} from '/views/SubscribersView.js';
import {ManagementView} from '/views/ManagementView.js';
import {ManagementAddGameView} from '/views/ManagementAddGameView.js'


window.onload = () => {
    
    window.API2.register_service_worker();
    register_views();

    window.DP.on("VIEW_LOAD", () => {
        window.loadingSpinner.hide();
    })

    window.DP.on('API_LOAD', () => {
        
            var user = window.API2.user();
            if(user.error){
                console.log('no user found')
                window.history.pushState('','','/Login')
            }
            window.VM.add_bottom_button('public', '/Search');
            window.VM.add_bottom_button('auto_awesome_motion', '/Explore')
            window.VM.add_bottom_button('wysiwyg', '/Feed')
            window.VM.add_bottom_button('person', '/Profile');
            window.VM.begin();
            window.VM.get_view_from_url();
            window.loadingSpinner.hide();
        
    })

    window.DP.on('NO_AUTH', () => {
    })   

    
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
                "*":{
                    title: 'Profile',
                    view: `<profile-view></profile-view>`
                },
                "Manage":{
                    title:"Manage Profile",
                    view: `<manage-profile-view></manage-profile-view>`,
                    subViews:{
                        "LinkAccounts":{
                            title:"Link Accounts",
                            view: `<link-accounts-view></link-accounts-view>`
                        },  
                    }
                },
                "Stats":{
                    title:"Profile Stats",
                    view: `<profile-stats-view></profile-stats-view>`,
                },
                "Subscribers":{
                    title: "Subscribers",
                    view: `<subscribers-view></subscribers-view>`
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
                                "Members":{
                                    title: "Members",
                                    view: `<manage-league-members-view></manage-league-members-view>`
                                },
                                "Schedule":{
                                    title: "League Schedule",
                                    view: `<manage-league-schedule-view></manage-league-schedule-view>`
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
        },
        "Explore":{
            title:"Explore",
            view: `<explore-view></explore-view>`
        },
        "Post":{
            title:'New Post',
            view: `<post-view></post-view>`
        },
        "Feed":{
            title:'Feed',
            view: `<feed-view></feed-view>`
        },
        "Search":{
            title:"Global Search",
            view:`<search-view></search-view>`
        },
        "Management":{
            title:"Management",
            view: `<management-view>`,
            subViews:{
                "AddGame":{
                    title:'Add Game',
                    view: `<management-add-game-view></management-add-game-view>`
                }
            }
        }

    }
    
    window.VM.register(routes)

    
}


