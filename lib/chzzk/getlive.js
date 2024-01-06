const https = require('node:https');

// Get Live Status
const GetLive = async (user_id) => {
    const options = {
        hostname: 'api.chzzk.naver.com',
        path: `/service/v2/channels/${user_id}/live-detail`,
        headers: {
            'Content-Type': 'application/json'
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