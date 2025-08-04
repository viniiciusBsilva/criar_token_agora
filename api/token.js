const { RtcTokenBuilder, RtcRole } = require('agora-token');

module.exports = (req, res) => {
  const APP_ID = process.env.AGORA_APP_ID;
  const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

  if (!APP_ID || !APP_CERTIFICATE) {
    return res.status(500).json({ error: 'Missing Agora credentials in environment.' });
  }

  const channelName = req.query.channelName || req.body?.channelName;
  const uid = req.query.uid || req.body?.uid || 0;
  const role = RtcRole.PUBLISHER;
  const expireTimeSeconds = 3600;

  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTimestamp = currentTimestamp + expireTimeSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    Number(uid),
    role,
    privilegeExpireTimestamp
  );

  return res.status(200).json({ token, uid });
};
