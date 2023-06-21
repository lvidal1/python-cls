# Frontend

# Start the project
With a local server
`$ yarn start`

Using the heroku dev environment
`$ yarn start:dev`

# Styles
- Global variables are placed in `/styles/`
- They are imported via webpack.config.js and placed automatically in each component
- For example see:
  - styles/variables.scss
  - src/components/button/styles.scss
  - src/components/button/index.js

# Storybooks
https://github.com/storybooks/storybook

Storybooks let you build and test components without running the entire app.
They make it easier to test unique / individual states

Add new story files in `stories` link those files in `.storybook/config.js`

# Tests

- Tests should be written for each component, screen and saga

# Deployment
  - Circle CI deploy to Heroku

# Storybooks
Storybooks should be added for each component. They allow for easy testing and visual regression testing.

Addons that are available are here - https://storybook.js.org/addons/addon-gallery/

You should make use of the addons we have:
- Knobs - https://github.com/storybooks/storybook/tree/release/4.0/addons/knobs
- Info - https://github.com/storybooks/storybook/tree/release/4.0/addons/info
- Viewport - https://github.com/storybooks/storybook/tree/release/4.0/addons/viewport

# Before Committing
- yarn eslint
- yarn prettier
- yarn test
