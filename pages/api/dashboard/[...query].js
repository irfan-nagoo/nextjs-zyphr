


export default async function handler(req, res) {

    console.info(req.method, req.query.query[0]);
    switch (req.query.query[0]) {
        case 'headers':
            return getDashboardHeaders(req, res);
        case 'category-type':
            return getCategoryAndType(req, res);
        default:
            return res.status(200).json({ name: "nextjs" });
    }

}


function getDashboardHeaders(req, res) {
    return res.status(200).json({
        headers: ['Id', 'Title', 'Category', 'Status', 'Requester', 'Assigned Agent', 'Create Date']
    });
}

function getCategoryAndType(req, res) {
    return res.status(200).json({
        code: "OK",
        message: "Request processed Successfully",
        categoryType:
            [
                {
                    key: 'Software',
                    value: ['Software Installation', 'Software Upgrade']
                },
                {
                    key: 'Facility',
                    value: ['New Item', 'Change Item']
                },
                {
                    key: 'Security',
                    value: ['New Badge', 'Activate Badge']
                }
            ]
    });
}