exports.homeRoutes = (req, res) => {
    res.render("index");
}

exports.add_user = (req, res) => {
    res.render("new_user")
}

exports.update_user = (req, res) => {
    res.render("update_user")
}