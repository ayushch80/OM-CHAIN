(function(u, x, t, w, e, a, k, s) {
    a = function(v) {
        try {
            u.setItem(t + e, v)
        } catch (e) {}
        v = JSON.parse(v);
        for (k = 0; k < v.length; k++) {
            s = x.createElement("script");
            s.text = "(function(u,x,t,w,e,a,k){a=u[e]=function(){a.q.push(arguments)};a.q=[];a.t=+new Date;a.c=w;k=x.createElement('script');k.async=1;k.src=t;x.getElementsByTagName('head')[0].appendChild(k)})(window,document,'" + v[k].u + "'," + JSON.stringify(v[k].c) + ",'" + v[k].g + "')";
            x.getElementsByTagName("head")[0].appendChild(s)
        }
    };
    try {
        k = u.getItem(t + e)
    } catch (e) {}
    if (k) {
        return a(k)
    }
    k = new XMLHttpRequest;
    k.onreadystatechange = function() {
        if (k.readyState == 4 && k.status == 200) a(k.responseText)
    };
    k.open("POST", w + e);
    k.send(x.URL)
})(sessionStorage, document, "uxt:", "https://api.uxtweak.com/snippet/", "279ea4de-5d6d-4247-a775-7093c47d7feb");