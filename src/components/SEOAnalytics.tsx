import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOAnalyticsProps {
  children?: React.ReactNode;
}

const SEOAnalytics: React.FC<SEOAnalyticsProps> = ({ children }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return (
    <>
      {isProduction && (
        <Helmet>
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
          </script>

          {/* Meta Pixel */}
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1234567890123456');
              fbq('track', 'PageView');
            `}
          </script>
          <noscript>
            {`
              <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1234567890123456&ev=PageView&noscript=1"/>
            `}
          </noscript>
        </Helmet>
      )}
      {children}
    </>
  );
};

export default SEOAnalytics;