
function hexToBytes(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i: number = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
}

// Safe for older TS targets (no spread operator)
function bufferToBase64(buf: ArrayBuffer): string {
    const binary: string = Array.from(new Uint8Array(buf))
        .map( (b: number): string => String.fromCharCode(b))
        .join('');
    return btoa(binary);
}

function base64ToBuffer(base64: string): ArrayBuffer {
    const binary: string = atob(base64);
    const len: number = binary.length;
    const buffer = new Uint8Array(len);
    for (let i: number = 0; i < len; i++) {
        buffer[i] = binary.charCodeAt(i);
    }
    return buffer.buffer;
}

export async function encrypt(data: any, key: string): Promise<string | false> {
    const hexKey: string = key;
    if (!hexKey) return false;

    let keyBytes = hexToBytes(hexKey);
    const iv = crypto.getRandomValues(new Uint8Array(16)); // Python uses 16-byte IV

    const cryptoKey: CryptoKey = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );

    // Encode the data to a JSON string, then to base64, then to Uint8Array
    const jsonStr: string = JSON.stringify(data);
    const base64Json: string = btoa(jsonStr);
    const encodedData = new TextEncoder().encode(base64Json);

    const encryptedBuffer = new Uint8Array(
        await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, encodedData)
    );

    // Split ciphertext and tag (last 16 bytes = tag)
    const tag = encryptedBuffer.slice(-16);
    const ciphertext = encryptedBuffer.slice(0, -16);

    const encryptedPayload = {
        iv: bufferToBase64(iv.buffer),
        data: bufferToBase64(ciphertext.buffer),
        tag: bufferToBase64(tag.buffer),
    };

    // Base64 encode the final JSON string
    return btoa(JSON.stringify(encryptedPayload));
}

export async function decrypt(encryptedStr: string, key: string): Promise<any> {
    const hexKey: string = key;
    if (!hexKey) return false;

    try {
        let t = atob(encryptedStr);
        let p = JSON.parse(t);
        const encryptedObj: any = JSON.parse(atob(encryptedStr));
        const iv = new Uint8Array(base64ToBuffer(encryptedObj.iv));
        const ciphertext = new Uint8Array(base64ToBuffer(encryptedObj.data));
        const tag = new Uint8Array(base64ToBuffer(encryptedObj.tag));

        const keyBytes = hexToBytes(hexKey);
        const cryptoKey: CryptoKey = await crypto.subtle.importKey(
            "raw",
            keyBytes,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );

        // WebCrypto expects the tag to be appended to the ciphertext
        const encryptedData = new Uint8Array(ciphertext.length + tag.length);
        encryptedData.set(ciphertext);
        encryptedData.set(tag, ciphertext.length);

        const decryptedBuffer: ArrayBuffer = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            cryptoKey,
            encryptedData
        );

        const decryptedBase64: string = new TextDecoder().decode(decryptedBuffer);
        const decryptedJson: string = atob(decryptedBase64);
        return JSON.parse(decryptedJson);
    } catch (err) {
        console.error("Decryption error:", err);
        return {};
    }
}