const validators = {
    user: require("./user"),
    topic: require("./topic"),
    post: require("./post"),
};

const { helperUtils } = require("../utils")

module.exports = {
    validate: (req, res, next) => {
        let route;
        let { originalUrl: path, body, query, params } = req;

        path = path.replace("/api", "");

        switch (path) {
            case "/user/register":
            case "/user/login":
                route = "user"; break;

            case "/topic/create":
            case "/topic/my-topics":
                route = "topic"; break;

            case "/post/create":
            case "/post/my-posts":
            case "/post/add-comments":
                route = "post"; break;

            default: return next();
        }

        if (!validators[route] || !validators[route][path]) return next();

        let schema = validators[route][path]();
        // console.log(schema)

        let { error } = schema.validate({ ...body, ...query, ...params });

        let errors = "";

        if (error) {
            for (let i in error.details) {
                errors = errors
                    ? ", " + error.details[i].message
                    : error.details[i].message;
            }

            return res.send(helperUtils.errorObj({ message: "validation error!", error: errors }))
        }

        return next();
    }
}