const URL = 'https://api.jiuchan.org/website/random';

randomWebsite = async () => {
    // {
    //     "status": 200,
    //     "eid": null,
    //     "message": null,
    //     "ok": true,
    //     "body": {
    //         "id": 9,
    //         "uuid": "ab5c5099-7787-4758-b12e-d2ba36de2282",
    //         "name": "简纸",
    //         "domain": "paper.ixor.me",
    //         "feedURL": "paper.ixor.me/feed.xml",
    //         "signature": "一张A4纸",
    //         "entry": "/list",
    //         "icp": null,
    //         "policeICP": null
    //     }
    // }

    const response = await fetch(URL);
    const json = await response.json();
    if (!json.ok) {
        location.reload();
    }

    const website = json.body;
    
    return website;
}