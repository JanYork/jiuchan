const URL = 'https://api.jiuchan.org/website/random';

const randomWebsite = async () => {
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
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error('请求失败：' + response.status);
        }
        const json = await response.json();
        return json.body;
    } catch (error) {
        console.error(error);
        window.toast.showToast({
            header: '访问异常',
            message: '请尝试刷新重试，如果问题依旧，请前往联系我们。',
            delay: 5000,
            callback: () => {
                window.location.href = 'mailto:hi@jiuchan.org';
            }
        })
    }
}