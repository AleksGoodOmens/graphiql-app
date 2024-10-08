# graphiql-app

## Cross-check criteria

For the convenience of verification, it is **necessary** to record and post on YouTube a short (5-7 min) video for reviewers with an explanation of how each of the items listed in the evaluation criteria is implemented. Add a link to the video to the pull-request. [How to evaluate tasks in Cross check](https://docs.rs.school/#/en/cross-check-flow). In the comments to the assessment, it is necessary to indicate which items are not fulfilled or partially fulfilled.

- [ ] Aleks video
- [ ] Daria video
- [ ] Egor video

### Main route - max 50 points

[](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md#main-route---max-50-points)

- [ ] The Main page should contain general information about the developers, project, and course. - **10 points**
- [x] In the upper right corner there are 2 buttons: Sign In and Sign Up. - **10 points**
- [x] If the login token is valid and unexpired, the Sign In and Sign Up buttons are replaced with the "Main Page" button. - **10 points**
- [x] When the token expires - the user should be redirected to the Main page automatically. - **10 points**
- [x] Pressing the Sign In / Sign up button redirects a user to the route with the Sign In / Sign up form. - **10 points**

### Sign In / Sign Up - max 50 points

[](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md#sign-in--sign-up---max-50-points)

- [x] Buttons for Sign In / Sign Up / Sign Out are everywhere where they should be. - **10 points**
- [x] Client-side validation is implemented. - **20 points**
- [x] Upon successful login, the user is redirected to the Main page. - **10 points**
- [x] If the user is already logged in and tries to reach these routes, they should be redirected to the Main page. - **10 points**

### RESTfull client - max 120 points

[](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md#restfull-client---max-120-points)

- [ ] Functional editor enabling query editing and prettifying, request body provided in the url as base64-encoded on focus out. - **40 points**
- [x] Functional read-only response section, with information about HTTP status and the code. - **30 mpoints**
- [x] Method selector, shows all the valid HTTP verbs, value is provided in the url on change. - **10 points**
- [x] Input for the url, entered value is provided in base64-encoded way on change. - **15 points**
- [ ] Variables section that can shown or hidden, specified variables are included in the body. - **15 points**
- [ ] Headers section, value is provided in the url on header add/change. - **20 points**

### GraphiQL route - max 80 points

[](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md#graphiql-route---max-80-points)

- [ ] Functional editor enabling query editing and prettifying, request body provided in the url as base64-encoded on focus out. - **35 points**
- [ ] Read-only response section, with information about HTTP status and the code, reused from the RESTfull client. - **5 points**
- [ ] Operational documentation explorer, visible _only_ upon successful SDL request. - **20 points**
- [ ] Variables section that can shown or hidden, specified variables are included in the body. - **10 points**
- [ ] Header section that can be shown or hidden, value is provided in the url on header add/change. - **10 points**

### History route - max 50 points

[](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md#history-route---max-50-points)

- [ ] History shows informational message with links to the clients when there are no requests in the local storage. - **10 points**
- [ ] User can navigate to the previoulsy executed HTTP request to the RESTfull client, HTTP method, url, body, headers, variables are restored. **20 points**
- [ ] User can navigate to the previoulsy executed GraphQL request to the GraphiQL client, url, SDL url, body, headers, variables are restored. **20 points**

### General requirements - max 50 points

[](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md#general-requirements---max-50-points)

- [x] Multiple (at lest 2) languages support / i18n. - **30 points**
- [ ] Sticky header. - **10 points**
- [x] Errors are displayed in the user friendly format. - **10 points**

### Penalties

[](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md#penalties)

- [x] Vite/NextJS default favicon **-50 points**
- [x] HTTP 4xx and 5xx status codes displayed as errors not in the response section **-50 points**
- [x] The presence of errors and warnings in the console **-20 points** for each
- [x] The presence in the console of the results of the console.log execution **-20 points** for each
- [x] @ts-ignore or any usage (search through GitHub repo) **-20 points** for each
- [x] The presence of _code-smells_ (God-object, chunks of duplicate code), commented code sections **-10 points per each**
- [ ] Making commits after the deadline **-100 points**
- [x] Absence of tests **-250 points**
- [x] Test coverage below 80% **-100 points**
- [x] Absence of linting **-150 points**
- [x] Absence of prettier **-100 points**
- [x] Absence of husky git hooks **-100 points**
- [ ] Pull Request doesn't follow guideline (including checkboxes in Score) [PR example](https://docs.rs.school/#/en/pull-request-review-process?id=pull-request-description-must-contain-the-following)**-10 points**
- [ ] The administration reserves the right to apply penalties for the use of incorrect repository or branch names

## CodeADE Team project

### REST/GraphiQL Client

- We will be working on creating a light-weight versions of Postman and GrqphiQL combined in one app.

### Tech stack

- Next js
- css
- Typescript
- jest
- eslint
- prettier
- husky

### Application design requirements

- interactive elements
- up to 3 fonts
- color contrast
- semantic layout
- 2 different languages
- user friendly errors
