const headers={
    headers:{
        'content-type':"text/html;charset=utf-8"
    }
};
const cacheName="CacheAPP";

var pageHC= "<h2>Fonctionnement en mode hors connexion</h2> <div>Vous n'êtes pas connecté à internet</div>"

self.addEventListener('install', evt=>{
   caches.open(cacheName).then(cache=>{
       cache.addAll([
           'index.html',
            'css/bootstrap.min.css',
            'css/style.css'
           ])
       })
});
self.addEventListener('activate', evt=>{
    console.log(evt);
});

self.addEventListener('fetch', evt=>{    
    /*
    if (!navigator.onLine){        
        evt.respondWith( new Response(pageHC, headers))         
    }
    */
    evt.respondWith(
        caches.match(evt.request).then(rep=>{
           if(rep){
               return rep;
        } 
        return fetch(evt.request).then(
        newResponse=>{
        caches.open(cacheName).then(
            cache=>cache.put(evt.request, newResponse
            ));  
            return newResponse.clone();
        })
})
)
});


