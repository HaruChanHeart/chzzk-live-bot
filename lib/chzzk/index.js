const { GetLive } = require('./getlive');
const { Chzzk } = require('../db');

module.exports = async (client, userId) => {
    //? Get channel since we'll be using it a lot
    const channel = client.channels.fetch(process.env.DISCORD_CHANNEL_ID);
    
    // Get Live Information from Chzzk Unofficial API
    const stream = await GetLive(userId);
    
    // Phase 1: if offline
    if (!stream?.content || stream?.content?.status === 'CLOSE') {
        const dbData = await Chzzk.findOne({ where: { user_id: userId } });

        if (!dbData) return;

        const db = await Chzzk.destroy({ where: { user_id: userId } });
        db;
    }

    //? Get live ID from DB
    const dbData = await Chzzk.findOne({ where: { user_id: userId } });

    // if offline, return it.
    if (!stream?.content || stream?.content?.status === 'CLOSE') return;

    // Phase 2: if have db data
    if (dbData) {
        // but live id is diff and status is open
        if (stream?.content?.liveId !== dbData.live_id && stream?.content?.status === 'OPEN') {
            const db = await Chzzk.destroy({ where: { user_id: userId } });
            db;
        }
    }
    else {
        // status is open
        if (stream?.content?.status === 'OPEN') {
            const preview = stream.content.liveImageUrl.replace('_{type}', '_1080');
            
            // Embed
            const embed = {
                color: 0x00ffa3,
                title: stream.content.liveTitle,
                url: `https://chzzk.naver.com/live/${userId}`,
                author: {
                    name: stream.content.channel.channelName,
                    url: `https://chzzk.naver.com/live/${userId}`,
                    icon_url: stream.content.channel.channelImageUrl
                },
                description: `**${stream.content.channel.channelName}** 님이 방송을 시작했습니다!`,
                image: {
                    url: preview
                },
                fields: [
                    {
                        name: "시청자",
                        value: `${stream.content.concurrentUserCount} 명`,
                        inline: true
                    },
                ],
                footer: {
                    text: `${client.user.username} 치지직 방송 알림`,
                    icon_url: client.user.displayAvatarURL({ format: 'png' })
                },
                timestamp: new Date().toISOString()
            }

            if (stream.content.liveCategoryValue !== '') {
                embed.fields.unshift({
                    name: '카테고리',
                    value: stream.content.liveCategoryValue,
                    inline: true
                })
            }
    
            //? Create and Send message if it doesn't exist
            if (!dbData) {
                await channel.then(async (c) => {
                    const db = await Chzzk.create({
                        user_id: userId,
                        live_id: stream.content.liveId,
                    });
                    db;

                    await c.send({ embeds: [embed] });
                })
            }
        }
    }
};