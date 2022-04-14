//Niks localstorage js cacheing system  --note i think i could acheive all of this with a webworker but i dont have valid https rn :(
//Created 4-13-2022 5:30 PM

const NCache = {
    _cache_prefix:'_CACHE_',
    _query_cache(file){
        return window.localStorage.getItem(`${this._cache_prefix}${file}`);
    },
    _cache_exist(file){
        return (window.localStorage.getItem(`${this._cache_prefix}${file}`) != null) ? true : false;
    },
    _cache(file){
        this._fetch(file).then(f => {
            window.localStorage.setItem(`${this._cache_prefix}${file}`, f);
        })
    },
    _load_to_page(file){
        var data = this._query_cache(file);
        if(data == null){
            this._cache(file);
        }else{
            document.body.append(this._create_script_el(data));
        }
    },
    _load_pages(arr){
        var trip = false;
        var i = 0;
        arr.forEach(p => {
            i++
            if(this._cache_exist(p) == false){trip = true;}
            this._load_to_page(p)
            if(i == arr.length){
                if(trip == true){
                    setTimeout(() => {
                    window.location.reload();
                    }, 500);
                }
                console.log(`%c[%cNCache%c] %cScripts %c[%c${arr}%c] %cLoaded!`,'color:#5f27cd','color:#0abde3','color:#5f27cd', 'color: #2980b9', 'color: #3498db','color:white','color:#3498db','color:#2ecc71');
            }
        });
    },
    _create_script_el(data){
        var b_64 = btoa(data)
        var sc = document.createElement('script');
        sc.setAttribute('src', `data:text/javascript;base64,${b_64}`)
        return sc;
    },
    _fetch(file){
        return new Promise(resolve => {
            fetch(`/${file}`).then(response => {
                return response.text();
            }).then(data => {
                resolve(data)
            })
        })
    },
    _clear(file){
        if(file){
            window.localStorage.removeItem(`${this._cache_prefix}${file}`)
        }else{
            window.localStorage.clear();
        }
        window.location.reload();
    }
}
