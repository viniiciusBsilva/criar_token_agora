const { RtcTokenBuilder, RtcRole } = require("agora-token");

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

module.exports = async (req, res) => {
  const { channelName, uid } = req.query;

  if (!channelName || !uid) {
    return res.status(400).json({ error: "channelName and uid are required" });
  }

  const role = RtcRole.PUBLISHER;
  const expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    parseInt(uid),
    role,
    privilegeExpireTime
  );

  return res.status(200).json({ rtcToken: token });
};
