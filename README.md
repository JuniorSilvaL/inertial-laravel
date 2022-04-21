## Documentação

#### intalando laravel no computador

link documentação do laravel : https://laravel.com/docs/8.x/installation

## Installation Via Composer
```bash
composer create-project laravel/laravel example-app
cd example-app
php artisan serve
```

link documentação do sail : https://laravel.com/docs/8.x/sail

## Installing Sail Into Existing Applications
```
composer require laravel/sail --dev
php artisan sail:install
```

## Next Step
```
cp .env.example .env 
./vendor/bin/sail up
./vendor/bin/sail  artisan storage:link
./vendor/bin/sail  artisan key:generate
```

##### caso for usar somente projetos laravel sem react o passo acima ja esta completo

## Agora iremos configurar o inertia para assim conseguimos ultilizar o react js


link do inertia: https://inertiajs.com/client-side-setup
link de instalação do serve side no laravel : https://inertiajs.com/server-side-setup

a instalação do inertia js no laravel e simples basta execultar o comando abaixo

```
composer require inertiajs/inertia-laravel
```

por padrao devemos subistituir o welcome.blade.php do laravel por app.blade.php
com o seguinte conteudo
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet" />
    <script src="{{ mix('/js/app.js') }}" defer></script>
  </head>
  <body>
    @inertia
  </body>
</html>
```

apois o passo acima crie  uma rota e controle para sua home page

```
php artisan make:controller HomepageController
```

agora no seu controller adicione o seguinte codigo

```
namespace App\Http\Controllers;
use Inertia\Inertia;
class HomepageController extends Controller
{
     public function index(){
        return Inertia::render('homepage', []);
     }
}
```

o proximo passo sera configurar o middleware
```
php artisan inertia:middleware
```

agora copiaremos o codigo a baixo e colocaremos no app\Http\Kernel.php
na parte de `protected $middlewareGroups` o seguinte codigo `         \App\Http\Middleware\HandleInertiaRequests::class`

veja no exemplo abaixo:
```
  protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ],
```
e nao esquecemos de configurar as rotas para a pagina
```
use App\Http\Controllers\Homepage;
Route::get('/',[Homepage::Class,'index'])->name('home');
```


## Iremos agora configurar a parte do client-side ou seja do front end
link client-side : https://inertiajs.com/client-side-setup

use o comando abaixo
```
yarn install
yarn add react
yarn add react-dom
yarn add @inertiajs/inertia @inertiajs/inertia-react
yarn add @babel/plugin-syntax-dynamic-import
```
configure o arquivo

webpack.mix.js

```
mix.js('resources/js/app.js', 'public/js')
    .react()
    .postCss('resources/css/app.css', 'public/css', [
    ]);
```

crie o arquivo .babelrc na raiz do projeto e adicione o
```
{
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```


agora na pasta `resources\js` podemos deletar o arquivo bootstrap.js
e subistituir o arquivo app.js

```
import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'

createInertiaApp({
    resolve: name => require(`../views/pages/${name}/index.js`).default,
    setup({ el, App, props }) {
        render(<App {...props} />, el)
    },
})
```

criaremos o seguindes diretorios `resoucer\views\pages\homepage`
e dentro da pasta `homepage` crie um arquivo chamado `index.js`
```javascript
import React from 'react'

export default function Homepage(){
    return(
        <div>
            Welcome
        </div>
    )
}

```
e esta feito !


##### dentro da pasta pages e onde ficara todas as pastas que criaremos diagora em diante e cada pasta conterar um arquivo chamado index.js rodames agora o seguinte comando
```
yarn run watch
```


configurando rotas
https://github.com/tighten/ziggy#installation
```
composer require tightenco/ziggy
```
adicione ao app.blade.php o `@routes` antes do javascript e agora poderar ultilizar a seguinte sintaxe
<a href={route('posts.index')}>Link</a>
