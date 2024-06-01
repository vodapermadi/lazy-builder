import CryptoJS from 'crypto'
import getBrowserFingerprint from 'get-browser-fingerprint'

export const getToken = () => {
    const now = new Date()
    now.setHours(now.getHours() - 7)

    // Format date as "DD-MM-YYYY"
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const tgl = `${day}-${month}-${year}`;

    // Format time as "HH:MM"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const jam = `${hours}:${minutes}`;

    // Convert to buffers and hash
    const tglBuffer = Buffer.from(tgl, 'utf-8');
    const jamBuffer = Buffer.from(jam, 'utf-8');

    const tglMd5 = CryptoJS.createHash('md5').update(tglBuffer).digest('hex');
    const jamSha256 = CryptoJS.createHash('sha256').update(jamBuffer).digest('hex');

    const token = `Infinity_Digital ${tglMd5}${jamSha256}`;
    const finalToken = CryptoJS.createHash('sha256').update(Buffer.from(token, 'utf-8')).digest('hex');

    return finalToken
}

export const getFP = () => {
    const fingerprint = getBrowserFingerprint()
    return String(fingerprint)
}