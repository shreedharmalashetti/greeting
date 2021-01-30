import admin from 'firebase-admin';
//const admin =require('firebase-admin');
const serviceAccount = {
  "type": "service_account",
  "project_id": "vue1-6a407",
  "private_key_id": "6e2ba7a67fd1a254f88b018790e5b11c7bd39565",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDdD4NkiqA5MapD\nKeUZC1ucMch6rRSRqjlU/TsWtzP/ASQ/79rI9a2uY/iEL66GGvN+mgwhNhh3fCgO\nPq0YOf4W2knNg8ABdG8kuzZJGgUnOsHH66MFkadJTjJARypf93x03OuFwBK2YK61\nGreYLkIMwGiuGK0BkR45aCbuHtIQ+3qtMCZRtzw4KT7SDS8/05Gi8nDW0Gu/JPik\ntHzNHYdCOccJXtDlbCc0chAQ/ZfyeuD0Idh9mnMAarTYpCLxCT830P1Kd3jekRa4\nmYDe+XAiB0xmvv1qVbMin6AvbVtsiyVpgNQU8VwEwbzegkEBr2LNZn6rTXgzLFJp\nk6U5b3UfAgMBAAECggEAHHM7K0zmCwZXzdYN/JeoHiWQEi3FWGvqfgQrPySr5fVN\nJ4dkhnmL9UY7fTOvx+WfEduclQejxXjupMqvN097YpCMcA01QFquVTFc7rKRGDfp\nKaQrcnOI7pfIQtqF2xz8YQPvseKC5gLyaS97knPdn0uCDWnyliGJnMTJQdsomPOv\nVyLn8ggnjT6U6y5UeDylLO1eWm81rxJ54uYZyM/exZg8VXHoUzo/OMJVqdXz7nSH\nL/stVecbTE/aucGvdMO+c6hn/SybQ6LFcRWCyBDBC4cQP61yswI/wNg4GloKbT+9\n896zbIxu/1bpVq3AV4e40pY5GtsAwTsYx26CJu3kjQKBgQD1DjOOvBpPZCW4mAdH\nldncSMt0vuA6aP4b7CnNrxWAXpjrqPbEiobdwr2fKDJ2If4Fm5T+I5G9Q+o+ZXXt\n1Rh2UNV/W08TBkEYJ3C4IcBHzfs6sAgB08tXkrbafb7J9zsf9XBFH4m36tihibqx\nkR6oMYpiVv8mgOsTe60tcvMtjQKBgQDm7vh9//34uqLGG9DUqXDXQKu73EfInXz8\nZYAV91QV1p9bUWfMGMXMeLbfHE/KX9q60u6DudsGVlleaHv6D88eTJ5qHLpMrRsi\nhdbx/+9S9rKdZjtRtjqhpBgH+stdBGZWt1lwT6jRzWWp/u1wOtN2FLP66O8iJL7P\nT4hMuTxUWwKBgAhdVLsxhoBhPbxgTBdQcSBIx9ETVtoHjWzskby4ljZMhFG+8bVh\nuRrGs+xD1f0cSextFBfcpPPd5pf8pJrapDwdpDv1pOxUUVJ+viU62bJZwJKPQaa2\nUQGLO3yXwDRqoPUFTrC9U9kYRg61gc7f0jkRf9S9fXYV/nAqz412mABdAoGBAMw7\n/Dgy9gHLzbk3UHFDiTBVWYxDPJkH70mo2qaSniLSNQ0l6Y5vOj+jYtfeyhJIw8EG\nWzrUXAg2xcLg1QRKhvpc+J0P2xOE5MKba4WKu7W7yCu8Bio155Sc80PbYY9aHMgE\nT20shjlGVesKMiNXYzzDAomdCCBCLx5ZUEnKaLiRAoGBAO5I8fb7dUbHb4NgfQYm\nV9/iB3J2AljAc3qcrn7Z8diLDxchNo0l2XRZjDkwxaxKaBCiwqPMeEorLiDW2XF1\nLFaiG5nFUDtwZujoKeF/yn9zVBLoYTggjvXVRngUowXKrwx3nRPq155y1fu7dcH+\nqTHacBR//Z3rKxzcYVEGP+ZG\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-s55lq@vue1-6a407.iam.gserviceaccount.com",
  "client_id": "113306943421090307554",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-s55lq%40vue1-6a407.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

export const updatePhotos = async (name,photos)=>{
  const docRef = db.doc(`telegram/${name}`);
  const snapshot = await docRef.get()
  var doc = snapshot.data();
  doc.photos = photos;
  await docRef.update(doc)
}

const sleep = m => new Promise(r => setTimeout(r, m))
export const uploadPhotoId = async (name,msgId,photoId)=>{
  const docRef = db.doc(`telegram/${name}/photoMessages/${msgId}`);
  var doc = {
    photoId:photoId
  }
  await docRef.set(doc);
  console.log('done')
}

 export const getPhotos = async (ctx,ids)=>{
  var photos = [];
  for(const id of ids ){
    var photo = {
      low:null,
      high:null
    };
    photo.low = await ctx.telegram.getFileLink(id.low);
    photo.high= await ctx.telegram.getFileLink(id.high);
    photos.push(photo)
  }
  return photos;
}

 export const getPhotoIds = async (name)=>{
  var photoIds=[];
  const photoMessagesRef = db.collection(`telegram/${name}/photoMessages`);
  const snapshot = await photoMessagesRef.get();
  snapshot.forEach(doc => {
    photoIds.push(doc.data().photoId)
  });

  return photoIds;
}

//module.exports={ uploadPhotoId,updatePhotos,getPhotoIds,getPhotos } 