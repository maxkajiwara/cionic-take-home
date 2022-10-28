# Cionic Web UI Homework

### This is a [react nextjs app](https://nextjs.org) written in [typescript](https://www.typescriptlang.org) styled with [twin.macro](https://www.npmjs.com/package/twin.macro) ( [tailwindcss](https://tailwindcss.com) + [styled-components](https://styled-components.com) )

The form component is located at `pages/index.tsx`. Global styles can be found at `styles/GlobalStyles.tsx`, custom theme settings and breakpoints are at `tailwind.config.js`, and a mock API endpoint is set up at `pages/api/form.ts`. The `eslint` and `prettier` files in the root directory are for linting and formatting.

> [Instructions and Layouts](https://docs.google.com/document/d/1d0upM8NlhQ3LbN5I2EnSRLmNYtwTYTKnRRhRIHHnwqo)

> **Helpful VS Code extension:**
[Tailwind Twin IntelliSense](https://marketplace.visualstudio.com/items?itemName=lightyen.tailwindcss-intellisense-twin) lets you view the underlying CSS of tailwind utilities via hover

## Project Setup

Install the dependencies, build the app, and start the server with your choice of yarn or npm

```
yarn install
yarn build
yarn start
```

```
npm install
npm build
npm start
```

If everything goes smoothly the app should be up and running on http://localhost:3000

## App Behavior

The *color* and *leg* options should behave as expected. Press any of them to update your selections.

The *size* fields have built-in validation for numeral values with up to two decimal places and no letters or special characters. If an input is out of the range of 0-50, an error message will display and attempting to submit the form will prompt the user to update the value.

Submitting a valid form will cause the app to enter a *`fetching`* state, disabling further input until the api returns a response.

If a **200 response** is received, a success state is displayed which can be dismissed with a button press.

If you wish to see a non-200 response state, enter `4.00` into either of the size inputs and submit the form.

## Accessibility

Hidden under the *color* & *leg* options' styling is a radio button for each selection. This accomplishes two goals:
1. Enable keyboard navigation
2. Allow screen readers to understand the layout for accessibility purposes

### This form is fully keyboard-navigable:

- Use `tab` & `shift+tab` to navigate between each option

- Use the arrow keys to select either color or leg type

- Use number keys & `.` for size inputs, and the up & down arrow keys to increment or decrement the value by 1

---
### Let me know if you have any questions! I'd be happy to demo the app and explain my code on a call 😄
---
