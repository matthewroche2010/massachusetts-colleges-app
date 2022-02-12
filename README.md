# Massachusetts Colleges App

This repository contains code for a web application that displays data from the
Department of Education's College Scorecard public domain dataset.  The
application reads raw JSON data derived from the dataset and displays it in
tabular and map views.

## Features

- The `package-lock.json` file was created with version 6.14.13
of [npm](https://github.com/npm/cli).

## Code overview

- `src/components` - contains the React components that make up this app.
- `src/utilities/dataMapping` - contains functions for mapping raw data and
field headers to human-readable values.
- `src/utilities/dataMapping` - contains helper functions for fetching and
consolidating data as well as formatting data for insertion into a table.
- `src/assets` - contains images and stylesheets.
- `src/stories` - contains a Storybook file for viewing raw React components.
- `data` - contains the raw JSON data files used in this app.

## Run this app

1. Clone this repository
2. `npm ci`
3. `gulp` (builds the output files to the dist directory)
4. `npm run dev` (spins up webpack's dev server on port 9600.  Go to
http://localhost:9600/ in your web browser to view the app after running this
command.)

