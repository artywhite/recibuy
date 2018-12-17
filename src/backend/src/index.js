const express = require('express');
const bodyParser = require('body-parser');

const { connectDB } = require('src/db');
const recipeRouter = require('src/routes/recipe');
const unitRouter = require('src/routes/unit');
const ingredientRouter = require('src/routes/ingredient');
const { infoLogger } = require('src/helpers/Logger');
const { clientErrorHandler, logErrors } = require('src/middleware');

const defaultPort = 3005;

const app = express();
app.use(bodyParser.json());

app.use('/recipes', recipeRouter);
app.use('/units', unitRouter);
app.use('/ingredients', ingredientRouter);

app.use(logErrors);
app.use(clientErrorHandler);

connectDB().then(() => {
  app.listen(defaultPort, () =>
    infoLogger(`Example app listening on http://localhost:${defaultPort}`)
  );
});
