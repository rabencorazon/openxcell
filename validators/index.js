const validators = {
    user: require("./user")
};

module.exports = {
    validate: (req, res, next) => {
        let route;
        let { path, body, query, params } = req.body;

        path = path.replace("/api", "");

        switch (req.path) {
            case "/user/register":
            case "/user/login":
                route = "user"; break;

            default: return next();
        }

        if (!validators[route] || !validators[route][path]) next();

        let schema = validators[route][path];

        let { error } = schema.validate({ ...body, ...query, ...params });

        let errors = "";
        if (error) {
            for (let i in error.details) {
                errors = errors
                    ? ", " + error.details[i].message
                    : error.details[i].message;
            }
        }
    }
}