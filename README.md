# foodbook
A place to find and store your favorite recipes

## MVP Pitch
Foodies and chefs the world over are always looking for the best recipes, and trying new ones they find here and there. But where can you really keep all those recipes organized? Sure, you can bookmark them, but once you've bookmarked hundreds of recipes, it becomes pretty hard remember which is which and to find the one you want. That's where foodbook comes in! Users can search through a database of millions of recipes and then choose to save their favorites into customizable "foodbooks" of their own, making it that much easier to get cooking! Anyone can search through foodbook's recipes database, but only a registered user has access to our full functionality. In order to save recipes and create your own foodbooks, just sign up for an account and you're ready to go. foodbook uses a third-party API to serve data about millions of recipes from sources all over the internet.

## User Stories

### Landing Page
When a user first navigates to foodbook, they reach the landing page. At top is a navigation bar with a foodbook logo in the top-left corner, next to a search bar, and at right are links to an About page, as well as login/sign up links. This navbar will be present across all pages of the site, and remains mostly unchanged, except once a user has logged in, in which case the login/sign up links will be replaced by links to the user's profile and to logout. Anyone who visits the site can search and find recipes, but they must create an account to access the full functionality of foodbook. Below the nav bar is a header with a welcome message. Below that is an area with a couple screenshots and instructions to show a user how to interact with the site. At bottom left, copyright information (on all pages).

### About Page
To provide background about foodbook and its creator, the About page will explain in more detail the necessity of the site and how it came to be created. At top will be a large banner image with an "About foodbook" heading. Below that will be a short paragraph explaining the aforementioned.

### Recipe Page
Any user who comes to foodbook can search for recipes. As a user types their query, search results will show up below in the form of recipe cards. Each result card will have a photo of the recipe, as well as its name and source. The result card will be linked to recipe detail page, where a user can learn more about the recipe they've chosen. There will be a link to the recipe's source page, nutritional information, preparation time, as well as an ingredient list and a link to view the full recipe on the source's site (externally). This page will include a large banner with the recipe's name and photo, as well as an "ADD" button that will only appear if the user is logged in. Once clicked, it will open a modal form to allow the user to choose which of their foodbooks they want to add the recipe to. The modal will contain a dropdown menu to choose what type of recipe they're looking at (eg. entree, side, dessert, etc.), a list of their foodbooks with checkboxes to allow the user to add the recipe to more than one foodbook (or at least one), and submit button. When the modal form is submitted, the user will remain on the recipe's page.

### Profile Page
Once a user registers and logs in, they will be redirected to their profile page. Here, there will be a large banner at top that displays the user's name, and on the right side of the banner will be an "Edit" button for the user to make changes to their profile. When clicked, a modal form will open, with pre-populated fields of the user's information so they can change whatever they wish and then submit. On submission, the user remains on their profile page. Below the banner is a "My foodbooks" header, with an add button to the right of the text. When clicked, a similar modal will appear, this time with a form for creating a foodbook. Again, on submission, the user remains on their profile page, but will now see their new foodbook populated as a card below. The foodbook cards will be displayed in a grid. A card will display the foodbook's name and be linked to that foodbook's detail page. There will also be a truncated list of the recipes in each foodbook (max of three displayed on the card). Beside each recipe's name will be an X button to remove them from that foodbook, if so desired. If clicked, a warning modal will appear to ask the user to confirm that they want to remove said recipe.

### foodbook Page
A user can click on any of their foodbooks from their profile page and be redirected to the selected foodbook's detail page. This page will display all information about a given foodbook. At top, a banner with an image and the foodbook's name to the left, and to the right, and Edit button. When clicked, a pre-populated form will open with the foodbook's information for a user to make changes and submit. This form will also include a delete button, should the user elect to delete the foodbook entirely. If the delete button is clicked, a warning modal will appear asking the user to confirm. On confirmation, the user is redirected to their profile. Or, on submission of the edit form, the user remains on the foodbook page. Below the banner, on the left side, a card that lists the different recipe types in that foodbook (entrees, desserts, sides, etc.). When a user clicks a recipe type, the page will filter that foodbook's recipes to only show the selected type. To the right of the card will be a Recipes section with a list of the recipes the user has added to the foodbook. The recipes will appear as cards with a small photo on the left, the recipe's name, type, and edit/delete buttons on the right side to remove/edit the recipe. Each recipe card will be linked to that recipe's detail page for easy access.


### Technologies used
1. MongoDB
2. Express
3. React
4. Node.js
5. axios
6. Edamam recipe search API (https://developer.edamam.com/)
7. Recoil

### Milestones
1. Set up frontend server and basic templates
    a. Routes and pages
2. Set up backend server
3. Add backend models: user, foodbook, recipe
    a. set up relations between them (one to many/many to many) on backend
4. Link front end and backend
    a. Query API, return search results (set up components)
    b. Foodbooks CRUD
    c. Recipes CRUD
    d. User CRUD
5. User auth
    a. JWT tokens
    b. add authorization gatekeeping
6. Styling
7. Deployment


### Stretch Goals
1. Add dual functionality to search bar to show results of recipes a user has already saved
    a. Potentially show already saved recipes at the top of search results? Add styling to recipe cards to indicate if they're already saved?
2. Add animated navbar expansion to show the search results (navbar expands to 100vh and displays the grid of results as recipe cards)
3. Recipes index page (to see all)?
4. Filter feature on foodbook detail page, user can click a recipe type (all (default), entree, dessert, side, etc.) and the page will then only display recipes matching that type from the current foodbook
5. Pagination for search results/saved recipes