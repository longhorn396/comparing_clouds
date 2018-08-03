module.exports = function (context, req, restaurants) {
    if(req.query.area) {
        restaurants = restaurants.filter((item) => {
            return item.area === req.query.area;
        });
        if(req.query.cuisine) {
            restaurants = restaurants.filter((item) => {
                return item.cuisine === req.query.cuisine;
            });
        }
        if(restaurants.length === 0) {
            context.res = { status: 400, body: 'Please provide valid parameters' };
        } else {
            context.res = { status: 200, body: restaurants[Math.floor(Math.random() * restaurants.length)] };
        }
    } else {
        context.res = { status: 400, body: 'Please provide an area.' };
    }
    context.done();
};