# Christian Calendar

This repository contains libraries for computing the 
western protestant Christian liturgical seasons and rendering 
their corresponding colors.

## Live Demo
https://ke4roh.github.io/christian-calendar/

## Usage
Pass in a year parameter to get the year of your choice from 1600 forward.  
If no parameter is passed, the current year is used.

https://ke4roh.github.io/christian-calendar/?year=2020

### Using the React component

The calendar view can also be embedded in your own React application.  Import
`LiturgicalCalendar` from this package:

```tsx
import { LiturgicalCalendar } from 'christian-calendar';

export default function Example() {
  return <LiturgicalCalendar />;
}
```

You may supply a `year` prop to control the displayed church year and an
`onYearChange` callback to respond when the user navigates between years.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   Open <http://localhost:3000> in your browser.

## Running Tests

Run the full test suite with:
```bash
npm test
```
For faster feedback on failing tests you can run:
```bash
npm run quickTest
```
To generate a coverage report:
```bash
npm run coverage
```

### Building the library

Compiled library files can be generated with:

```bash
npm run build:lib
```

The output is written to the `dist/` directory and can be published to npm or
another registry.

### Publishing to npm

This repository includes a GitHub Action that publishes the compiled library to
npm whenever a GitHub release is published. To enable publishing, create an
`NPM_TOKEN` secret in your repository settings containing an npm access token
with permission to publish the package. The workflow will run `npm run build:lib`
and `npm publish` using this token.
