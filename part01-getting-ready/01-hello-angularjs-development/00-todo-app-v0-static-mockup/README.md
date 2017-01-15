# 00-todo-app-v0-static-mockup
> static mockup of ToDo app

## Description
Static mockup of the To Do app using AngularJS 1.6.1, necessary to check layout using Bootstrap 4.

The layout consists of a couple of containers, the first one for the header and the task entry and the second one for table with the already entered tasks.

There is also a footer component.

### Project structure

The project structure is super simple:

```
./
|
|- build/           <- dist artifacts
|- public/          <- source code artifacts
|---- css/          <- custom CSS
|---- js/           <- JS application
|---- mock-data/    <- test data
|---- index.html    <- main view
```

### Build Tool: Tasks

*NPM* is used for the build tool, so make run you run `npm install` before running any of the tasks.

The following options are meaningful for this project available:
+ `npm run clean` &mdash; Cleans the build directory, where the project is *compiled*.
+ `npm run dev` &mdash; Builds the artifacts from source/, deploys a debug version on `build/` and starts up a simple HTTP server to serve the `build directory`.
