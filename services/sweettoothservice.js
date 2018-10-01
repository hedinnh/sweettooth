const candies = require('../data/data');

const sweetToothService = () => {
    const getAllCandies = () => candies.candies;

    const getCandyById = (id) => {
        const candy = candies.candies.filter(u => u.id == id);
        if (candy.length === 0) { return -1; }
        return candy[0];
    }
    const getAllOffers = () => {
        var offers = candies.offers;
        offers.forEach(element => {
            element.candies.forEach(innerelem => {
                element.candies[innerelem - 1] = getCandyById(innerelem);
            })
        });
        return offers;

    }
    const createCandy = (candy) => {
        let highestId = 0;
        candies.candies.forEach(element => { if (element.id > highestId) { highestId = element.id } });
        candy.id = highestId + 1;
        candies.candies.push(candy);
        return candy;
    }
    const getAllPinatas = () => {
        var pinatas = candies.pinatas;
        pinatas.forEach(e => {
            delete e.surprise;
        })
        return pinatas;
    }
    const getPinataById = (id) => {
        var pinata = candies.pinatas.filter(u => u.id == id);
        pinata.forEach(e => {
            delete e.surprise;
        })
        return pinata;
    }


    return {
        getAllCandies,
        getCandyById,
        getAllOffers,
        createCandy,
        getAllPinatas,
        getPinataById
    }
}

module.exports = sweetToothService();