const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const sweetToothService = require('./services/sweetToothService');

router.get('/candies', (req, res) => {
    return res.status(200).send(sweetToothService.getAllCandies());
});

router.get('/candies/:id', (req, res) => {
    const { id } = req.params;
    const candy = sweetToothService.getCandyById(id);
    if (candy === -1) { return res.status(404).send(); }
    return res.json(candy);
});

router.get('/offers/', (req, res) => {
    const { id } = req.params;
    const candy = sweetToothService.getAllOffers();
    return res.json(candy);
});

router.post('/candies', (req, res) => {
    const { body } = req;
    var ret = sweetToothService.createCandy(body);
    return res.status(201).send(ret);
});

router.get('/pinatas', (req, res) => {
    var ret = sweetToothService.getAllPinatas();
    return res.json(ret);
});

router.get('/pinatas/:id', (req, res) => {
    const { id } = req.params;
    var ret = sweetToothService.getPinataById(id);
    if (ret === -1) { return res.status(404).send(); }
    return res.json(ret);
});

router.post('/pinatas', (req, res) => {
    const { body } = req;
    var ret = sweetToothService.createPinata(body);
    return res.status(201).send(ret);
});

router.get('/pinatas/:id/hit', (req, res) => {
    const { id } = req.params;
    var ret = sweetToothService.hitPinata(id);
    if (ret === -1) { return res.status(404).send(); }

    if (!ret) {
        return res.status(204).send();
    }
    if (typeof ret === "string") {
        return res.status(200).send(ret);
    }
    if (ret) {
        return res.status(423).send();
    }
});

app.use(bodyParser.json());
app.use('/api', router);

app.listen(3000, () => {
    console.log('app listening on port 3000!');
});