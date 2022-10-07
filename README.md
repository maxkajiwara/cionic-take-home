# Cionic Web UI Homework

### [Instructions and Layouts](https://docs.google.com/document/d/1d0upM8NlhQ3LbN5I2EnSRLmNYtwTYTKnRRhRIHHnwqo)

## About

### This is a [react nextjs app](https://nextjs.org/) written in typsecript and using [twin.macro](https://www.npmjs.com/package/twin.macro) for styling

The form page is located at `pages/index.tsx`.

Global styles can be found at `styles/GlobalStyles.tsx`, and custom theme settings can be found in `tailwind.config.js`

A mock API endpoint is set up in `pages/api/form.ts`.

The `eslint` and `prettier` files in the root directory are just there for linting and auto-formatting.

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

The color and leg options should behave as expected. The size input fields have built-in validation for numeral values with up to two decimal places and no letters or special characters. If an input is out of the range 0-50 an error message will display and attempting to submit the form will prompt the user to update the value.

Submitting the form will cause the app to enter a "fetching" state, disabling further input until the api returns a response. If a 200 response is received, a success state is displayed which can be dismissed with a button press.

If you wish to see a non-200 response state, enter `4.00` into either of the size inputs before you submit the form.

## Accessibility

Hidden under the color & leg styling is a radio button for each type. This accomplishes two goals: 1. Enable keyboard navigation, and 2. Allow screen readers to understand the layout for accessibility purposes.

### The form is fully keyboard-navigable:

- `tab` & `shift+tab` to navigate between each option

- Arrow keys to select either color or leg type

- Number keys & `.` for size inputs, plus up & down arrow keys to increment or decrement the value by 1

---

### Let me know if you have any questions! I'd be happy to demo the app and explain my code
