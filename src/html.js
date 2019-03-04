import React from 'react';
import {primaryColor, primary10Color} from './components/style-settings';
import {withPrefix} from 'gatsby-link';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{__html: stylesStr}}
        />
      );
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href={withPrefix('/favicon.ico')} />
          <link rel="icon" href={withPrefix('/favicon.ico')} />
          <link
            href="https://d1a3f4spazzrp4.cloudfront.net/uber-fonts/4.0.0/superfine.css"
            rel="stylesheet"
          />
          <style>
            {`
    html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
    body{margin:0;}
    button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
    input::-webkit-inner-spin-button,input::-webkit-outer-spin-button,input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
    a{color:${primaryColor};background-color:${primary10Color};text-decoration:none;-webkit-text-decoration-skip:objects;}
    a:hover{text-decoration:underline;}
    .anchor{background-color:transparent;}`}
          </style>
          {css}
          {this.props.headComponents}
          <template
            dangerouslySetInnerHTML={{
              __html: `
                <!-- Piwik -->
                <!-- End Piwik Code -->
              `,
            }}
          />
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{__html: this.props.body}}
          />
          {this.props.postBodyComponents}
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              window.onload = () => {
                window.docsearch({
                  apiKey: '380d5368678eb99d4faa6ce5077c4827',
                  indexName: 'fusionjs',
                  inputSelector: '#search-field',
                  debug: false // Set debug to true if you want to inspect the dropdown
                });
              };
            `,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              window.trackOutboundLink = (aTag) => {
                if (window.ga && aTag.href) {
                  window.ga('send', 'event', {
                    eventCategory: 'Outbound Link',
                    eventAction: 'click',
                    eventLabel: aTag.href,
                    transport: 'beacon',
                    hitCallback: () => {
                      document.location = aTag.href;
                    }
                  });
                  return false;
                }
                return true;
              };
            `,
            }}
          />
        </body>
      </html>
    );
  }
};
