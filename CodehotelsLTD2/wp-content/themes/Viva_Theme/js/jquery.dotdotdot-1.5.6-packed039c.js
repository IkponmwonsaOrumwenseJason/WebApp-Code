/*	
 *	jQuery dotdotdot 1.5.6
 *	
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('(6($){4($.F.u){5}$.F.u=6(o){4(s.y==0){1e(D,\'1U 1V 1W 11 "\'+s.1X+\'".\');5 s}4(s.y>1){5 s.1Y(6(){$(s).u(o)})}7 d=s;4(d.T(\'u\')){d.M(\'1z.x\')}d.1A=6(){d.U(\'N.x\',6(e,c){e.12();e.13();r.1f=(8 r.A==\'1Z\')?r.A:1B(d);r.1f+=r.1C;4(8 c!=\'B\'){4(8 c==\'1g\'||c 1D 20){c=$(\'<1h />\').G(c).H()}4(c 1D $){f=c}}$C=d.21(\'<1h 22="u" />\').V();$C.14().G(f.1E(D)).1F({\'A\':\'1G\',\'I\':\'1G\',\'23\':\'24\',\'25\':0,\'26\':0});7 a=9,O=9;4(w.15){a=w.15.1E(D);w.15.E()}4(W($C,r)){4(r.1i==\'V\'){O=V($C,r,a)}v{O=P($C,d,$C,r,a)}}$C.27($C.H());$C=Q;4($.28(r.1j)){r.1j.J(d[0],O,f)}w.t=O;5 O}).U(\'t.x\',6(e,a){e.12();e.13();4(8 a==\'6\'){a.J(d[0],w.t)}5 w.t}).U(\'29.x\',6(e,a){e.12();e.13();4(8 a==\'6\'){a.J(d[0],f)}5 f}).U(\'1z.x\',6(e){e.12();e.13();d.1k().1H().14().G(f).T(\'u\',9)});5 d};d.1H=6(){d.1I(\'.x\');5 d};d.X=6(){d.1k();4(r.X==\'R\'){7 b=$(R),1l=b.I(),1m=b.A();b.U(\'1J.x\'+w.1n,6(){4(1l!=b.I()||1m!=b.A()||!r.1K){1l=b.I();1m=b.A();4(K){1L(K)}K=2a(6(){d.M(\'N.x\')},10)}})}v{Y=16(d);K=2b(6(){7 a=16(d);4(Y.I!=a.I||Y.A!=a.A){d.M(\'N.x\');Y=16(d)}},2c)}5 d};d.1k=6(){$(R).1I(\'1J.x\'+w.1n);4(K){1L(K)}5 d};7 f=d.H(),r=$.2d(D,{},$.F.u.1M,o),w={},Y={},K=Q,$C=Q;w.15=1N(r.1o,d);w.t=9;w.1n=n++;d.T(\'u\',D).1A().M(\'N.x\');4(r.X){d.X()}5 d};$.F.u.1M={\'P\':\'... \',\'1i\':\'2e\',\'1p\':{\'E\':[\' \',\',\',\';\',\'.\',\'!\',\'?\'],\'1O\':[]},\'1C\':0,\'1j\':Q,\'1o\':Q,\'A\':Q,\'X\':9,\'1K\':D,\'1e\':9};7 n=1;6 V(b,o,c){7 d=b.V(),t=9;b.14();11(7 a=0,l=d.y;a<l;a++){7 e=d.1q(a);b.G(e);4(c){b.G(c)}4(W(b,o)){e.E();t=D;1r}v{4(c){c.E()}}}5 t}6 P(b,c,d,o,f){7 g=b.H(),t=9;b.14();7 h=\'2f, 2g, 2h, 2i, 2j, 2k, 2l, 1P, 2m, 2n, 2o, 2p, 2q, 2r, 2s, 2t, 2u, 2v, 2w\';11(7 a=0,l=g.y;a<l;a++){4(t){1r}7 e=g[a],$e=$(e);4(8 e==\'B\'){2x}b.G($e);4(f){b[(b.2y(h))?\'1o\':\'G\'](f)}4(e.2z==3){4(W(d,o)){t=1s($e,c,d,o,f)}}v{t=P($e,c,d,o,f)}4(!t){4(f){f.E()}}}5 t}6 1s(a,b,c,o,d){7 f=9,e=a[0];4(8 e==\'B\'){5 9}7 g=(o.1i==\'2A\')?\'\':\' \',S=1t(e).2B(g),17=-1,L=-1,18=0,19=S.y-1;1Q(18<=19){7 m=2C.2D((18+19)/2);4(m==L){1r}L=m;1a(e,S.Z(0,L+1).1R(g)+o.P);4(!W(c,o)){17=L;18=L}v{19=L}}4(17!=-1&&!(S.y==1&&S[0].y==0)){7 h=1u(S.Z(0,17+1).1R(g),o);f=D;1a(e,h)}v{7 i=a.2E();a.E();7 j=(d)?d.y:0;4(i.H().2F()>j){7 k=i.H().1q(-1-j);f=1s(k,b,c,o,d)}v{7 e=i.2G().H().1q(-1)[0];4(8 e!=\'B\'){7 h=1u(1t(e),o);1a(e,h);i.E();f=D}}}5 f}6 W(a,o){5 a.1v()>o.1f}6 1u(a,o){1Q($.1S(a.Z(-1),o.1p.E)>-1){a=a.Z(0,-1)}4($.1S(a.Z(-1),o.1p.1O)<0){a+=o.P}5 a}6 16(a){5{\'I\':a.2H(),\'A\':a.1v()}}6 1a(e,a){4(e.1b){e.1b=a}v 4(e.1c){e.1c=a}v 4(e.1d){e.1d=a}}6 1t(e){4(e.1b){5 e.1b}v 4(e.1c){5 e.1c}v 4(e.1d){5 e.1d}v{5""}}6 1N(e,a){4(8 e==\'B\'){5 9}4(!e){5 9}4(8 e==\'1g\'){e=$(e,a);5(e.y)?e:9}4(8 e==\'1P\'){5(8 e.2I==\'B\')?9:e}5 9}6 1B(b){7 h=b.1v(),a=[\'2J\',\'2K\'];11(7 z=0,l=a.y;z<l;z++){7 m=2L(b.1F(a[z]),10);4(2M(m)){m=0}h-=m}5 h}6 1e(d,m){4(!d){5 9}4(8 m==\'1g\'){m=\'u: \'+m}v{m=[\'u:\',m]}4(8 R.1w!=\'B\'){4(8 R.1w.1T!=\'B\'){R.1w.1T(m)}}5 9}7 p=$.F.1x;$.F.1x=6(a){4(8 a!=\'B\'){4(s.T(\'u\')){4(8 a!=\'6\'){5 s.M(\'N\',[a])}}5 p.J(s,a)}5 p.J(s)};7 q=$.F.1y;$.F.1y=6(a){4(8 a!=\'B\'){4(s.T(\'u\')){7 b=$(\'<1h />\');b.1y(a);a=b.1x();b.E();5 s.M(\'N\',[a])}5 q.J(s,a)}5 q.J(s)}})(2N);', 62, 174, '||||if|return|function|var|typeof|false||||||||||||||||||opts|this|isTruncated|dotdotdot|else|conf|dot|length||height|undefined|inr|true|remove|fn|append|contents|width|call|watchInt|midPos|trigger|update|trunc|ellipsis|null|window|textArr|data|bind|children|test|watch|watchOrg|slice||for|preventDefault|stopPropagation|empty|afterElement|getSizes|position|startPos|endPos|setTextContent|innerText|nodeValue|textContent|debug|maxHeight|string|div|wrap|callback|unwatch|_wWidth|_wHeight|dotId|after|lastCharacter|eq|break|ellipsisElement|getTextContent|addEllipsis|innerHeight|console|html|text|destroy|bind_events|getTrueInnerHeight|tolerance|instanceof|clone|css|auto|unbind_events|unbind|resize|windowResizeFix|clearInterval|defaults|getElement|noEllipsis|object|while|join|inArray|log|No|element|found|selector|each|number|HTMLElement|wrapInner|class|border|none|padding|margin|replaceWith|isFunction|originalContent|setTimeout|setInterval|100|extend|word|table|thead|tbody|tfoot|tr|col|colgroup|embed|param|ol|ul|dl|select|optgroup|option|textarea|script|style|continue|is|nodeType|letter|split|Math|floor|parent|size|prev|innerWidth|jquery|paddingTop|paddingBottom|parseInt|isNaN|jQuery'.split('|'), 0, {}))