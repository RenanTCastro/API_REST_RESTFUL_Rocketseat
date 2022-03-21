const express = require("express");
const app = express();
const data = require("./data.json");

app.use(express.json());

// Verbos HTTP
// GET: recebe dados de um resource
// POST: eniva dados ou informações para serem processados pro um resourece
// PUT: atualiza dados de um resource
// DELETE: deleta um resource

// Recebe todos usuários
app.get("/clients",function(req, res){
    res.json(data);
})

// Rece usuário por id
app.get("/clients/:id",function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    // Informando o erro
    if(!client) return res.status(204).json();

    res.json(client);
})

// "Criando" novo cliente
app.post("/clients",function(req, res){
    const { name, email } = req.body;
    // Salva teoricamente
    res.json({ name, email });
})

// Atualiza cliente
app.put("/clients/:id",function(req, res){
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    // Informando o erro
    if(!client) return res.status(204).json();

    const { name } = req.body

    client.name = name;

    res.json(client);
})

// "Deletando" usuários
app.delete("/clients/:id",function(req, res){
    const { id } = req.params;
    const clientsFiltered = data.filter(cli => cli.id != id);
    res.json(clientsFiltered)
})

app.listen(3000, function(){
    console.log("Server is runing")
})