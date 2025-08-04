import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

export default function handler(req, res) {
  const { channelName, uid } = req.query;

  if (!channelName || !uid) {
    return res.status(400).json({ error: 'Missing channelName or uid' });
  }

  const appID = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const expirationTimeInSeconds = 3600;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appID,
    appCertificate,
    channelName,
    parseInt(uid),
    RtcRole.PUBLISHER,
    privilegeExpiredTs
  );

  return res.status(200).json({ token });
}
