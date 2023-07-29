export default async function base64File(url) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise(resolve => {
        const reader = new FileReader();
        const metadata = {
            type: 'image/jpeg'
        };
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result.replace("application/octet-stream", "image/png");
            resolve(base64data);
        };
    });
}
