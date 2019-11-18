---
title: "Measuring Browser Performance"
path: /measuring-browser-performance
---

# Measuring Browser Performance

## Chrome DevTools timings versus Performance API data

The W3C Standard [defines](http://w3c.github.io/perf-timing-primer/) the Web Performance Timing API which is at least partially supported by all major browsers. Inspecting `window.performance.timing` after a page has load returns timing data for each critical step during that page load.

The network tab in Chrome DevTools also shows page and resource load timings but the names (and in some cases the definitions) of the measured criteria differ from those returned by the Performance API.

The following diagram maps Performance API data to Chrome DevTools timings:

<img src="https://docs.google.com/drawings/d/e/2PACX-1vQM3V3bIFBVk7qtT_LU-TdhBKUCGh597bzq42inGQwaKeprW3c3hlsYtPCIGu_mcnE7hHWcgIYhkW-4/pub?w=961&h=483">

**Notes**

¹ Chrome DevTools (and documentation) defines TTFB as the time between the moment the request is sent and the moment the first byte of the response is received. Most other sources disagree with this definition, and consider DNS lookup time and connection time to also be part of the TTFB duration.

² `window.performance.getEntriesByType('resource')` returns an array of benchmark timings for each resource (js, css, fonts. images, API calls etc.).


## Timeline Events


#### 1. DOMContentLoaded

The HTML document has been loaded and parsed. This is the earliest possible time that the page is renderable. This event (and thus rendering) can be delayed if the page includes [blocking resources](/docs/references/performance/measuring-browser-performance#render-blocking-resources).

#### 2. load

The page and all dependent resources are fully loaded. This is a good time to inspect/post Performance API data.


## Timeline Details


#### 1. Queueing / Stalled

Delay before processing request due to:



*   Proxy Negotiation
*   Too many current TCP connections (max 6 on HTTP 1)


#### 2. DNS lookup



*   Every new domain on a page requires a full roundtrip to do the DNS lookup


#### 3. Connection / SSL



*   TCP handshake
*   SSL negotiation


#### 4. Request Sent / Sending



*   Time spent issuing the network request. Noted by Chrome DevTools Timings but almost certainly tiny and so not included in the above diagram


#### 5. Waiting (TTFB)



*   Time between request sent and first byte of response received. Chrome's definition of Time to First Byte is non-standard (see note ¹ above).
*   The first byte of the response means the first byte of the status code header, not of the content itself.
*   Stages of TTFB
    *   Request reaches server
    *   Server processes request
    *   Server delegates as necessary
    *   Server prepares to issue response.
    *   Server issues response
    *   Response reaches browser


#### 6. Content Download



*   Time from receiving the first byte of the response stream to the last byte of the response stream.


## Render-Blocking Resources

As soon as the HTML has been parsed (DOMContentLoaded), the browser can begin the rendering cycle. Whenever the HTML parser encounters a blocking resource, DOMContentLoaded (and thus the start of the rendering cycle) is delayed.


#### 1. JavaScript

<img src="https://docs.google.com/drawings/d/e/2PACX-1vQD8Qv07H52OGo-DaY5csUi068GsfZBtOAi6nPmW5z2HJTIXu-Z9AqfVOBeTvseEgBQANsN-8C2WQMO/pub?w=736&h=395">

**Default \<script\> tags**

By default all \<script\> tags are blocking. When the HTML parser encounters a script tag it will stop parsing HTML while it fetches and executes the script

**Inlined JavaScript**

Inlined JavaScript is also blocking, but since no fetch is needed the delay is a little less. Short, render-critical scripts can be inlined but be aware of the effect on time-to-render.

**\<script\> tags with _async_**

Adding _async_ to the \<script\> tag unblocks the HTML parser during script download. If the script is downloaded before HTML parsing is complete, parsing will be paused while the script is executed.

Use async when:



*   script load order is not important
*   you need to execute the script a.s.a.p.

**\<script\> tags with _defer_**

Adding _defer_ to the \<script\> tag also unblocks the HTML parser during script download.  The script will not be executed until after the HTML parsing is complete.

Use defer when



*   script load order is important
*   the JS is not render critical


#### 2. CSS

The browser requires both a DOM and a CSSOM (CSS object model) before it can begin the rendering cycle—so by default the HTML parser treats all CSS resources as render blocking.

**Inlining Stylesheets**

Inline CSS is will still block the HTML parser but inlining short, render-critical \<style\> directives can reduce the render blocking time because there is no data fetching or rule generation required.

**Dynamic Stylesheets**

Using a dynamic stylesheet generator like [Styletron](https://github.com/rtsao/styletron) can significantly reduce time to DOMContentLoaded by only generating the subset of rules required for the current DOM

**CSS links with media attribute**

CSS links that include [media types and/or media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) will conditionally be considered as non-blocking.

`print.css` will only be block rendering during print preview:


```css
<link href="print.css" rel="stylesheet" media="print">
```


`portrait.css` will only be block rendering if the device is vertically oriented:


```css
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
```



#### 3. Custom Fonts

**Referencing an external font file (via @fontface)**

Fonts defined in external files are never render blocking. This is the case whether the style rule was defined via a CSS file, inline \<style\> header or inline style.

When a DOM element is assigned a style rule that references an externally defined font file, the browser will fetch that font. If such elements are present in the initial load, they will delay the **load** event but not the **DomContentLoaded** event.

If a font-referencing style rule is dynamically assigned after the initial load, the font will be lazy-loaded (even if the @fontface declaration is defined in the initial page load). Be aware that lazy loaded fonts have their own drawbacks. While the font is being fetched, the element will be invisible for up to three seconds (FOIC), after which it will render with the fallback font (FOUT). The FusionJS font loader (see below) can mitigate against this.

**@fontface with an inline Data URI**

By contrast inlining font data in the URI is always render-blocking regardless of whether the font is used on the first page load or later. Be wary of using of inling font data if you care about time-to-page-render.


#### **Resource hints**

Almost every resource type (including js, css, images and fonts) can also be loading using a link tag with the `rel` attribute optionally set to `preload` or `prefetch`.

<link rel='preload' href='lato-bold-webfont.woff2' as='font' type='font/woff2' crossorigin>

<link rel='preload' href='/chevron.jpg' as="image">

**rel="preload"**

([Not yet well supported](https://caniuse.com/#search=preload)). Directs the resource to be fetched with the highest priority. It's useful for prioritizing those resources most critical for rendering.

While preload fetches can make your image or font show up quicker, they're also render blocking so will likely delay the time to DOMContentLoaded and the user will wait a little longer to see the initial rendering of the page. [Mileage definitely varies](https://medium.com/reloading/a-link-rel-preload-analysis-from-the-chrome-data-saver-team-5edf54b08715) so you should experiment with how well it works for you.

**rel="prefetch"**

This is a lower priority hint that will fetch the resource during idle time and then cache for future use. This is useful for preloading resources for later pages, without delaying DOMContentLoaded. However it may delay the load complete event.

**FusionJS Font Loader**

[FusionJS](https://engdocs.uberinternal.com/web/docs/getting-started/index.html) scaffolds with a [font loader](https://github.com/fusionjs/fusion-plugin-font-loader-react) plugin and HOC which will autogenerate your @fontface declaration based on a font config file, allows you to control which fonts are preloaded vs. lazy loaded and mitigates against FOIC and FOUT.


##### Example Page Load Times per Font-load strategy

The following timings illustrate typical time to DOMContentLoaded and time to load complete for four load strategies. This only covers cases where the required font is on the initial page. It doesn't cover lazily-loading fonts (see above).

Each strategy was tested loading a) 1 font b) 10 fonts. All fonts are identically sized.

Lato-Bold font (1 font / 10 fonts). Chrome 64 over "Slow 3G" connection.


<table>
  <tr>
   <td>
   </td>
   <td>DomContentLoaded (ms)
   </td>
   <td>load (ms)
   </td>
  </tr>
  <tr>
   <td>no preload/prefetch
   </td>
   <td>4049 / 4851
   </td>
   <td>6657 / 14846
   </td>
  </tr>
  <tr>
   <td>rel="preload"
   </td>
   <td>4080 / 12810
   </td>
   <td>4686 /12830
   </td>
  </tr>
  <tr>
   <td>rel="prefetch"
   </td>
   <td>4067 / 5478
   </td>
   <td>6675 / 21296
   </td>
  </tr>
  <tr>
   <td>inline data
   </td>
   <td>4831 / 20848
   </td>
   <td>4840 / 20869
   </td>
  </tr>
</table>

<img src="https://docs.google.com/drawings/d/e/2PACX-1vSfvizYfZkiNRVVFhm79zrpO6sUyd53XatJ7iSZbjozcNHCAGGRqw4I-XsCi8NRcOs0SdgdZKAjuIMv/pub?w=728&h=353">

#### 4. Images

Images are also non-blocking by default, and share many of the load characteristics of fonts.

**Example Page Load Times per Image-load strategy**

The following timings illustrate typical time to DOMContentLoaded and time to load complete for four image load strategies. This doesn't cover lazily-loaded images.

Each strategy was tested loading a) 1 image b) 10 images. All images are identically sized

106kB JPEG (1 image / 10 images). Chrome 64 over "Slow 3G" connection


<table>
  <tr>
   <td>
   </td>
   <td>DomContentLoaded (ms)
   </td>
   <td>load (ms)
   </td>
  </tr>
  <tr>
   <td>no preload/prefetch
   </td>
   <td>4124 / 4126
   </td>
   <td>8224 / 29051
   </td>
  </tr>
  <tr>
   <td>rel="preload"
   </td>
   <td>4147 / 4152
   </td>
   <td>6518 / 26590
   </td>
  </tr>
  <tr>
   <td>rel="prefetch"
   </td>
   <td>4126 / 4138
   </td>
   <td>8344 / 46374*
   </td>
  </tr>
  <tr>
   <td>inline data
   </td>
   <td>4951 / 29868
   </td>
   <td>4951 / 29878
   </td>
  </tr>
</table>

&ast; double loads img




