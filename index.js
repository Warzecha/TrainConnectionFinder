const express = require('express');
const app = express();

app.use(express.json());


let connections = [
    {id: 1, begin: 'wroclaw', end: 'krakow', length: 200},
    {id: 2, begin: 'krakow', end: 'trzebinia', length: 40}
];

app.get('/', (req, res) => {

    res.send('Welcome in my train connection finder');

})

app.post('/api/connections/', (req, res) => {

    const newConnection = {
        id: connections.length + 1,
        begin: req.body.begin,
        end: req.body.end,
        length: parseFloat(req.body.length)

    }

    connections.push(newConnection);
    res.send(newConnection);

})


app.get('/api/shortest/:start/:destination', (req, res) => {

    res.send(req.params);
})

app.get('/api/connections/', (req, res) => {

    res.send(connections);
})


const port = process.env.PORT || 3000;
app.listen(port , () => { console.log(`Listening on port ${port}`)});
