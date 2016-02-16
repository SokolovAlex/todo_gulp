# todo_gulp

Презентационный проект к докладу 
https://docs.google.com/presentation/d/1QXx0Fsa6Anw0j7krYx7SFDsKpXCVwtgbYBaNVw0m8t4/edit?usp=sharing

в примере реализовано планировщик задач с хранением данных в хранилище браузера.
сборка реализована на grunt и gulp для сравнения технологий
написан на es5 и es6 для демонстрации.

- es5: https://github.com/SokolovAlex/todo_gulp/tree/master/scripts
- es6: https://github.com/SokolovAlex/todo_gulp/tree/master/examples/scripts_es6

- простой пример без сборки: https://github.com/SokolovAlex/todo_gulp/blob/master/index.html
- пример: https://github.com/SokolovAlex/todo_gulp/blob/master/examples/index_grunt_gulp.html

**подготовка проекта**:
- npm i 
- bower i
- npm i -g gulp
- npm i -g grunt

**сборки**: 
- dev+watch: grunt build 
- min: grunt build --release || grunt
- browserify+watch: gulp build
- browserify+uglify: gulp build --release
- babelify(es6): gulp es6

**прочее**:
- precommit-hook: gulp precommit
- tests + codestyle: gulp validate

