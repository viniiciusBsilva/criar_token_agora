import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export default function handler(req, res) {
  const { channelName, uid } = req.query;

  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  if (!channelName || !uid) {
    return res.status(400).json({ error: "Missing channelName or uid" });
  }

  const role = RtcRole.PUBLISHER;
  const expireTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTs = currentTimestamp + expireTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    parseInt(uid, 10),
    role,
    privilegeExpireTs
  );

  return res.status(200).json({ token });
}
