# Recibuy - web based app for making groceries lists

## TODO MVP:

- amount - чашка и Чашка --- все юниты писать с маленькой буквы
- кейс: создание нового рецепта + создание новых юнитов в нем с одинаковым названием --- не создавать два разных юнита
- удаление/исправление ингредиентов из shopping list - типа есть в наличии, покупать не надо
- добавить картинку (квадрат) на страницу рецептов
- верстка
  - список рецептов в виде тумб https://cl.ly/75dfe7757002/Image%202019-01-20%20at%2020.26.31.png
- ask Ana: why there is such relation as unit -> ingredient, why on selecting ingredient's units there is no way to select among all units, not only among those which is related.

- amount можно поменять, если вести с клавы что-то, а не выбором
- validation
- frontend: keep basket + shopping list in LocalStorage
- backend: duplicate units when creating new ingredient with same new units
- fix first backend's load - DB connection error => use solution in some other project (wait-for-it.sh)

## TODO After MVP:

- quick adding ingredient component (fixed width block with dynamic content: like wizard: 1step: select/create ingredient name -> 2step: input amount -> 3step: select/create unit name)
- filters recipes
- rewrite to css-in-js by emotion: https://emotion.sh/docs/styled

### TODO

- add immer https://github.com/mweststrate/immer
- add react-hot-loader
