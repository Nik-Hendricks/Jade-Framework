

const Utils = { 
    format_time(time){
        if(time.length > 3){
            var hour = time.slice(0, 2);
            var mins = time.slice(2,4);
        }else{
            var hour = time.slice(0, 1);
            var mins = time.slice(1,3);
        }
        return (hour > 12) ? String(hour - 12).concat(":",mins," PM"): String(hour).concat(":", mins, " AM") ;
    },

    nth(d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
    }
}

const UtilsSingleton = Utils;

window.Utils = UtilsSingleton // web

export default window.Utils // this will initialise the singleton instantly