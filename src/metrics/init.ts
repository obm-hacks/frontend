import { YA_METRIKA_COUNTER } from '@/constants';

export const initMetrics = () => {
  if (!import.meta.env.DEV) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text=`
           (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
           m[i].l=1*new Date();
           for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
           k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
           (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
           ym(${YA_METRIKA_COUNTER}, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
           });
    `

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(script);
  }
}
