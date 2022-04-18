import Dispatcher from '/js/dispatcher.js';
import API2 from '/js/API2.js'
import ViewManager from '/js/viewManager.js';
import Builder from '/js/Builder.js';
import Utils from '/js/Utils.js';

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
import {MusicPlayer} from '/components/MusicPlayer.js';
import {SliderInput} from '/components/SliderInput.js';
import {SQLEditor} from '/components/SQLEditor.js';
import {Calculator} from '/components/Calculator.js';
import {Calendar} from '/components/Calendar.js';
import {PostCardHeader} from '/components/PostCardHeader.js';
import {PostCardFooter} from '/components/PostCardFooter.js';
import {CustomInput} from '/components/CustomInput.js';
import {PieChart} from '/components/PieChart.js';
//import all views
import {HomeView} from '/views/HomeView.js';
import {MyDayView} from '/views/MyDayView.js';
import {DataView} from '/views/DataView.js';
import {ScheduleView} from '/views/ScheduleView.js';
import {DailyBriefView} from '/views/DailyBriefView.js';
import {EventView} from '/views/EventView.js';
import {EventsView} from '/views/EventsView.js';
import {EditEventView} from '/views/EditEventView.js';
import {ExpenseView} from '/views/ExpenseView.js';
import {IncomeView} from '/views/IncomeView.js';
import {SettingsView} from '/views/SettingsView.js';

window.onload = () => {
    window.API2.register_service_worker();
    register_views();
    window.API2.new_db('events');
    window.API2.new_db('views');



    window.DP.on("VIEW_LOAD", () => {
        console.log("VIEW LOAD")
        window.VM.resize_components();
        window.loadingSpinner.hide();
    })

    window.DP.on('API_LOAD', () => {
            console.log("API LOAD")
            window.VM.begin();
            append_bottom_buttons();
            track_events();
    })

    window.DP.on('NO_AUTH', () => {
    })

    
}

function append_bottom_buttons(){
    window.VM.add_bottom_button('public', '/DailyBrief');
    window.VM.add_bottom_button('account_circle', '/MyDay')
    window.VM.add_bottom_button('calendar_month', '/Schedule')
    window.VM.add_bottom_button('source','/Data');
}

function track_events(){
    let date = new Date(), sec = date.getSeconds();
    setTimeout(()=>{
        setInterval(()=>{
            // get events and check if any match current date
            window.API2.events_db.then(events => {
                console.log(events)
                var d = new Date(); 
                var st = d.getHours()+""+d.getMinutes()
                console.log(st)
                events.forEach(event => {
                    if(event.start_time == String(st)){
                        console.log(event.alarm_sound)
                        new Audio(event.alarm_sound).play();
                    }
                })

            })
        }, 60 * 1000);
    }, (60 - sec) * 1000);
}

function register_views(){
    var last_visited_view = (window.localStorage.lastView !== undefined) ? window.localStorage.lastView: `<my-day-view></my-day-view>`;
    var routes = {
        "":{
            title: 'Life Manager X',
            view: last_visited_view
        },
        "MyDay":{
            title:"My Day",
            view:"<my-day-view></my-day-view>"
        },
        "Data":{
            title:"Data",
            view:`<data-view></data-view>`,
            subViews:{
                Events:{
                    title: `Events`,
                    view: `<events-view></events-view>`,
                },
                Finances:{
                    title:'Finances',
                    view:'<finances-view></finances-view>',
                    subViews:{
                        Expenses:{
                            title:'Expenses',
                            view:`<expenses-view></expenses-view>`,
                            subViews:{
                                New:{
                                    title:'New Expense',
                                    view: `<expenses-view></expenses-view>`
                                }
                            }
                        },
                        Income:{
                            title:"Income",
                            view:`<income-view></income-view>`,
                            subViews:{
                                New:{
                                    title:'New Income',
                                    view:`<income-view></income-view>`
                                }
                            }
                        }
                    }
                },
                Event:{
                    title:'Event',
                    view: '<event-view></event-view>',
                    subViews:{
                        "*":{
                            title:'Event',
                            view:`<event-view></event-view>`
                        },
                        "New":{
                            title:'New Event',
                            view:'<edit-event-view></edit-event-view>',
                        },
                        "Edit":{
                            title:'Edit Event',
                            view:`<edit-event-view></edit-event-view>`,
                        }
                    }
                }
            }
        },
        "Schedule":{
            title:"Schedule",
            view: `<schedule-view></schedule-view>`
        },
        "DailyBrief":{
            title:"Daily Brief",
            view:`<daily-brief-view></daily-brief-view>`
        },
        "Settings":{
            title:"Setting",
            view:`<settings-view></settings-view>`
        }
    }
    
    window.VM.register(routes)

    
}


