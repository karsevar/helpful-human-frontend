# Help Human Interview Challenge Documentation

### 1️⃣ Frontend deployed at https://helpful-human-challenge.netlify.app/ and accompanying Backend deployed at https://morning-spire-68989.herokuapp.com/

- Please refer to the helpful-human-server documentation at https://github.com/karsevar/helpful-human-server to learn about the different endpoints in which run this application.

### Interview Problem:

## Core

Stated briefly, the core goal is to create a simple but functional app that has a data, view and logic layer. The app will display color swatches, and that's about it!

The core goals should be completed in full.

## Core Goals

- Replicate design
  - Font
  - Styles
  - Iconography
- Replicate functionality
  - Create a database of colors (minimum 100)
  - Paginate your data to show a certain number of swatches at a time
  - Display both the color swatch and the label of the color
  - Ability to select random color and modify view accordingly
  - Clicking swatch changes to color detail view

## Stretch Goals

- Design
  - Make it responsive
- Functionality
  - Generate color list from a script

## Bonus Stretch Goals

- Design

  - Include interaction design
  - Add tints/shades in detail view

- Functionality

  - Add search functionality
  - Color generation script guarantees same colors and order
  - Group by color (Make sidebar menu functional)

- Data
  - Fetch data with GraphQL

### 2️⃣ Solution

## Techologies Used

- React (for dom manipulation and userflow framework)
- React-Router-Dom (to alternate between the overall color list view with pagination controls and the individual color detail view)
- node-sass (as the main CSS compiler for the project)
- axios (for http pull requests to the accompanying server)

## Features Completed:

- [x] Replicate Design
- [x] Replicate Functionality
  - [x] Create a database of colors (minimum 100)
  - [x] Paginate your data to show a certain number of swatches at a time (check https://github.com/karsevar/helpful-human-server)
  - [x] Display both the color swatch and the label of the color
  - [x] Ability to select random color and modify view accordingly
  - [x] Clicking swatch changes to color detail view

## Components:

# ColorsParentComponent

- The ColorsParentComponent is used as the containing component for the two routes in the application, `/` and `/colorDetail/:id` that mounts `PaginationComponent` and `ColorDetailComponent` respectively, and `SideMenuComponent`.

- The main purpose of this component is to give structure to where `SideMenuComponent` is placed within the application in relation to `PaginationComponent` and `ColorDetailComponent`, since `SideMenuComponent` will need to remain static between the two routes. In addition, this component gives `SideMenuComponent` the total number of color entries in the database through the hook `totalColors` and `PaginationComponent` the total number of page buttons that need to be rendered to display all the colors through `Pages`.

- Constraints include the addition of the currentPage hook declaration in the parent component of `PaginationComponent`, the reason for this oversight was switching from the color detail view (`/colorDetail/:id`) to the home view (`/`) the currentPage hook would be overwritten to `1` if the hook was included in `PaginationComponent`.

# SideMenuComponent

- The only finished piece of functionality in `SideMenuComponent` was the random button feature which takes in the prop `totalColors` from `ColorsParentComponent` and calculates a random number between 1 and `totalColors`. After the random value is calculated the application redirects the user to the color detail route `/colorDetail/:id` using the value as the dynamic route.

- `handleRandomClick` manages all of the component's functionality.

# HeaderComponent

- `HeaderComponent` is only used as decoration since search functionality hasn't been implemented.

# PaginationComponent

- `PaginationComponent` contains the `SwatchesComponent` and the pagination navigation menu.

- Four props are passed into the component.
  - Pages, which is initially declared in `ColorsParentComponent` and used to display the total number of navigatable pages the server's database can render.
  - history, used as a prop for `SwatchesComponent` since each individual color swatch carries an onClick handler that redirects the user to the `/colorDetail/:id` route using the swatch's database id as the dynamic variable.
  - currentPage, used to highlight the current page data the `SwatchesComponent` is rendering wihtin `<div class='pagination-container></div>` and as a prop for `SwatchesComponent` that tells the component which page to render from the database.
  - setCurrentPage, used to modify currentPage through the `handlePaginationClick` that is placed on each of the page div layers.

# SwatchesComponent

- `SwatchesComponent` takes two props, `currentPage` and `history`.
  - `currentPage` is used within the backend get request within a query string (example `/getColorsByPagination?page=[currentPage]`). This logic tells the http request which page to render into the component.
  - `history` is used within the `handleSwatchClick` function that is attached to each of the rendered color swatch cards. The overall purpose of the `handleSwatchClick` function is to redirect the user to a color detail view (route `/colorDetail/[database id of color clicked on]`) of the color swatch he/she clicked on.

# ColorDetailComponent

- Unlike the other components, `ColorDetailComponent` is very much self contained with the only exceptions of taking in a prop from the dynamic route (`colorId`) and the object history.

  - `colorId` is an integer representation that matches with the color's database id in the helpful-human-server. This variable is used within the get request url `/getColorById/[color id from dynamic route]`. If the get request is successful colorInfo is overwritten with the `colorId`'s information.

- `handleBackClick` function is used with the `<button class='back-btn'>` element to redirect the user back to the home route (`/`).

# ShadesComponent

- This component is largely incomplete due to most of the RGB to hexadecimal reference functions converting the lighter and darker RGB shades from the function `lightenOrDarken` into incorrect values. Other than the `rgbToHex` bug the overall logic works just fine. `hexToRgb` converts every passed in hexadecimal value into accurate RGB values and the `lightenOrDarken` function perfectly creates appropriate shades of the passed in `colorInfo.hexString` prop.
