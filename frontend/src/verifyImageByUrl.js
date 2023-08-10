const verifyImageByUrl = (url) => {
    const urlSegments = url.split("/");
    const filenameWithQuery = urlSegments[urlSegments.length - 1];
    const filename = filenameWithQuery.split("?")[0];
    const decodedFilename = decodeURIComponent(filename).split("_")[3]
    const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"];
    const lowercaseFilename = decodedFilename.toLowerCase();
    const isImage=imageExtensions.some(ext => lowercaseFilename.endsWith(ext));
    return {isImage,decodedFilename}
}

export default verifyImageByUrl