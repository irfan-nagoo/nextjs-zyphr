

export default async function handler(req, res) {

    console.info(req.method, req.query.query[0]);
    switch (req.query.query[0]) {
        case 'list':
            return getUsers(req, res);
        default:
            return res.status(200).json({ name: "nextjs" });
    }

}


function getUsers(req, res) {
    return res.status(200).json({
        code: "OK",
        message: "Request processed Successfully",
        users: [
            {
                id: 1001,
                name: 'Philip Andersen'
            }
            , {
                id: 1002,
                name: 'Mike Roger'
            }, {
                id: 1003,
                name: 'Stacy Kim'
            }, {
                id: 1004,
                name: 'Roger Mat'
            }, {
                id: 1005,
                name: 'Dolly Hans'
            }]
    });
}