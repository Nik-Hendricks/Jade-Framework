//Niks localstorage js cacheing system  --note i think i could acheive all of this with a webworker but i dont have valid https rn :(
//Created 4-13-2022 5:30 PM

const NCache = {
    _cache_prefix:'_CACHE_',
    _trip:false,
    _query_cache(file){
        return JSON.parse(window.localStorage.getItem(`${this._cache_prefix}${file}`));
    },
    _cache_exist(file){
        return (window.localStorage.getItem(`${this._cache_prefix}${file}`) != null) ? true : false;
    },
    _cache(file){
        this._fetch(file).then(f => {
            window.localStorage.setItem(`${this._cache_prefix}${file}`, JSON.stringify(f));
        })
    },
    _load_scripts(arr){
        var i = 0;
        arr.forEach(p => {
            i++
            if(!this._cache_exist(p)){
                this._trip = true;
                this._cache(p);
            }else{
                    document.head.appendChild(this._create_script_el(this._query_cache(p).raw, this._query_cache(p).contentType));
            }
            if(i == arr.length){
                if(this._trip == true){
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
                console.log(`%c[%cNCache%c] %cScripts %c[%c${arr}%c] %cLoaded!`,'color:#5f27cd','color:#0abde3','color:#5f27cd', 'color: #2980b9', 'color: #3498db','color:white','color:#3498db','color:#2ecc71');
            }
        });
    },

    _check_update(latest_version){
        var client_version = window.localStorage.getItem('_update_version');
        if(client_version < latest_version || client_version == null){
            window.localStorage.setItem('_update_version', latest_version)    
            setTimeout(() => {
                this._clear();
            }, 100);
        }else{
            console.log(`%c[%cNCache%c] %cRunning the latest version %c${localStorage.getItem('_update_version')}`,'color:#5f27cd','color:#0abde3','color:#5f27cd', 'color: #2980b9', 'color:#2ecc71');
        }
    },

    _create_script_el(data, type){
        if(type.includes('javascript')){
            var sc = document.createElement('script')
            sc.setAttribute('src',`data:text/javascript;base64,${btoa(data)}`)
        }else{
            var sc = document.createElement('style')
            sc.appendChild(document.createTextNode(data))
        }
        return sc;
    },
    _fetch(file){
        
        return new Promise(resolve => {
            fetch(`${file}`).then((response) => {
                    var header = response.headers.get("Content-Type");
                    return response.text().then(t => {
                        return {contentType: header, raw: t};
                    });
            }).then(data => {
                resolve(data)
            })
        })
        
    },
    _clear(file){
        if(file){
            window.localStorage.removeItem(`${this._cache_prefix}${file}`)
        }else{
            for (x in localStorage){
                if(x.includes(this._cache_prefix)){
                    localStorage.removeItem(x)
                }
            }
        }
        window.location.reload();
    }
}