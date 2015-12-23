# 000-simple-dev-debug
> The simplest of project templates for AngularJS development

This template uses _Grunt_ as the task runner and all dependencies are handled using `npm` (instead of `bower`).
Note that dependencies are handled with `npm` instead of `bower`.

You can type `grunt dev` to start developing.

## Details
The `Gruntfile` is configured for development only:
+ The application must be developed in the `public` directory. You can include CSS and JavaScript files in `/css` and `/js` directories.
+ You can include mock data in `/public/mock-data`. It will be watched and copied to the `build` directory.
+ The `connect` task is configured to server both `build` and the project directory to be able to serve `node_modules`.
+ Only `build:debug` distribution is available, consisting in copying development assets to the `build` directory.
