import QRCode from "qrcode";

export function buildVerificationLink(token: string): string {
    return `${window.location.origin}/${token}`;
}

export async function createQrDataUrl(link: string): Promise<string> {
    return QRCode.toDataURL(link, {
        width: 256,
        margin: 1,
    });
}

export function downloadDataUrl(dataUrl: string, fileName: string): void {
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = fileName;
    anchor.click();
}
