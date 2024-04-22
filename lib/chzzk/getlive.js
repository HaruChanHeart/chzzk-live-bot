const https = require('node:https');

// Get Live Status
const GetLive = async (user_id) => {
    const options = {
        hostname: 'api.chzzk.naver.com',
        path: `/service/v2/channels/${user_id}/live-detail`,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
        }
    }

    try {
        return new Promise(resolve => {
            let data = [];
    
            https.get(options, res => {
                res.on('data', chunk => {
                    data.push(chunk);
                });
    
                res.on('end', () => {
                    const result = Buffer.concat(data).toString();
                    if (result.startsWith('{')) {
                        resolve(JSON.parse(result));
                    }
                    else {
                        resolve(null);
                    }
                });
            });
        });
    }
    catch(e) {
        console.log(e);
    }
}

module.exports = { GetLive }