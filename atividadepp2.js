const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

const porta = 30000;
const host = '0.0.0.0';

var listaCarros = [];

function cadastroCarroView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Carros</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <div class="container text-center">
                    <h1 class="mb-5">Cadastro de Carros</h1>
                    <form method="POST" action="/cadastrarCarro" class="border p-3 row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="marca" class="form-label">Marca</label>
                            <input type="text" class="form-control" id="marca" name="marca" required>
                        </div>
                        <div class="col-md-4">
                            <label for="modelo" class="form-label">Modelo</label>
                            <input type="text" class="form-control" id="modelo" name="modelo" required>
                        </div>
                        <div class="col-md-4">
                            <label for="ano" class="form-label">Ano</label>
                            <input type="number" class="form-control" id="ano" name="ano" required>
                        </div>
                        <div class="col-md-4">
                            <label for="cor" class="form-label">Cor</label>
                            <input type="text" class="form-control" id="cor" name="cor" required>
                        </div>
                        <div class="col-md-4">
                            <label for="preco" class="form-label">Preço</label>
                            <input type="text" class="form-control" id="preco" name="preco" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function cadastrarCarro(req, resp) {
    const { marca, modelo, ano, cor, preco } = req.body;
    const carro = { marca, modelo, ano, cor, preco };
    listaCarros.push(carro);

    resp.write(`
        <html>
            <head>
                <title>Lista de Carros</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Ano</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Preço</th>
                        </tr>
                    </thead>
                    <tbody>`);
    for (let i = 0; i < listaCarros.length; i++) {
        resp.write(`
            <tr>
                <td>${listaCarros[i].marca}</td>
                <td>${listaCarros[i].modelo}</td>
                <td>${listaCarros[i].ano}</td>
                <td>${listaCarros[i].cor}</td>
                <td>${listaCarros[i].preco}</td>
            </tr>`);
    }
    resp.write(`</tbody>
                </table>
                <a class="btn btn-primary" href="/cadastrarCarro">Continuar Cadastrando</a>
                <a class="btn btn-secondary" href="/">Voltar para o Menu</a>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>`);
    resp.end();
}

app.get('/', (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Carros</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="/cadastrarCarro">
                                    <button class="btn btn-primary">Cadastrar Carro</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="container mt-4">
                    <h2>Bem-vindo ao sistema de cadastro de carros!</h2>
                    <p>Use o botão acima para cadastrar um novo carro.</p>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
});

app.get('/cadastrarCarro', cadastroCarroView);
app.post('/cadastrarCarro', cadastrarCarro);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});

