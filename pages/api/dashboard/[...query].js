


export default async function handler(req, res) {

    console.info(req.method, req.query.query[0]);
    switch (req.query.query[0]) {
        case 'headers':
            return res.status(200).json({ headers: getDashboardHeaders() });
        case 'category-type':
            return res.status(200).json(getCategoryAndType());
        default:
            return res.status(200).json({ name: "nextjs" });
    }

}


function getDashboardHeaders() {
    return ['Id', 'Title', 'Category', 'Status', 'Requester', 'Assigned Agent', 'Create Date', 'Action'];
}

function getCategoryAndType() {
    return [
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
}