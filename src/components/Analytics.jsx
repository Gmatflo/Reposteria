import { useEffect } from 'react'

export default function Analytics() {
  useEffect(() => {
    const ga4 = import.meta.env.VITE_GA4_ID
    const pixel = import.meta.env.VITE_META_PIXEL_ID

    if (ga4 && !document.getElementById('ga4-script')) {
      const s = document.createElement('script')
      s.id = 'ga4-script'
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4}`
      document.head.appendChild(s)
      window.dataLayer = window.dataLayer || []
      window.gtag = function () {
        window.dataLayer.push(arguments)
      }
      window.gtag('js', new Date())
      window.gtag('config', ga4)
    }

    if (pixel && !document.getElementById('meta-pixel-script')) {
      const s = document.createElement('script')
      s.id = 'meta-pixel-script'
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`
      document.head.appendChild(s)
    }
  }, [])

  return null
}
