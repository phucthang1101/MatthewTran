import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
  setGoogleTag() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-171047192-1');
      
        `,
      };
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8' />

          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <meta
            name='viewport'
            content='user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320, height=device-height, target-densitydpi=medium-dpi'
          />

          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'
          />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          />
          <link
            rel='stylesheet'
            href='https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css'
          />
          <link
            rel='stylesheet'
            href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
          />
          <link
            rel='stylesheet'
            href='https://unpkg.com/simplebar@latest/dist/simplebar.css'
          />
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/react-toastify@6.0.5/dist/ReactToastify.min.css'
          />
          <script
            src='https://kit.fontawesome.com/d174fcfea6.js'
            crossOrigin='anonymous'
          ></script>
          <script src='https://unpkg.com/scroll-into-view-if-needed/umd/scroll-into-view-if-needed.min.js'></script>
          <script
            defer
            src='https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js'
          ></script>
          <link rel='stylesheet' href='/static/css/styles.css' />

          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=UA-171047192-1'
          ></script>

          <script dangerouslySetInnerHTML={this.setGoogleTag()}></script>
        </Head>
        <body>
          <div id='backdrop-hook'></div>
          <div id='modal-hook'></div>
          <Main />

          <NextScript />

          <script
            src='https://code.jquery.com/jquery-3.2.1.slim.min.js'
            integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
            crossOrigin='anonymous'
          ></script>
          <script
            src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
            integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'
            crossOrigin='anonymous'
          ></script>
          <script
            src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
            integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl'
            crossOrigin='anonymous'
          ></script>
          <script src='https://code.iconify.design/1/1.0.6/iconify.min.js'></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
