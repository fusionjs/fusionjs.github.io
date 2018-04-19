# Fusion.js Documentation

## Contribute

Install the dependencies:

`yarn install`

Bootstrap:

`yarn boostrap`

It clones all the documentation.

Run in dev mode:

`yarn dev`

The `replaceRenderer` from `gatsby-ssr.js` is not called during a development build (https://github.com/gatsbyjs/gatsby/issues/3166), that results in a Styletron error `"Uncaught TypeError: Cannot read property 'sheet' of undefined"`.
As a temporary solution while in dev mode, remove the `styleElements` from passing to the client's Styletron instance in the `gatsby-browser.js`:
`const styletron = new Styletron(styleElements);` => `const styletron = new Styletron();`.

Build docs website locally:

`yarn build-docs`

To add a new package to render its documentation:
- for public packages from github add the repo name to `packages-oss.txt`;

Then add a newly added package's docs to the side navigation menu in `/src/nav-api.yml`.
A doc page of README of a package will be created with the path `/api/[package_name]`. Additional documentation for the package can live under its `/docs` folder, and pages for that documentation will be created with a full path like `/api/[package_name]/docs/[file_name]`.

While adding or removing any documentation files in this repo under `/documentation` folder, don't forget to add/remove a side menu items to the docs in `/src/nav-docs.yml`.
