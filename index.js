document.getElementById("file").addEventListener("change", function(event) {
    compress(event);
});
const downloadBtn = document.getElementById('btn');

let initialSize;
let compressedSize;

function compress(e) {
    const width = 100;
    const height = 100;
    const file = e.target.files[0];
    const fileName = file.name;
    initialSize = file.size;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
                const elem = document.createElement('canvas');
                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                ctx.canvas.toBlob((blob) => {
                    const newFile = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    compressedSize = newFile.size;
                    document.getElementById('compressedImg').setAttribute('src', img.src);
                    downloadBtn.setAttribute('href', img.src)
                    const allH6s = document.getElementsByTagName('h6');
                    allH6s[0].innerHTML = `Initial image size: ${Math.round(initialSize / 1024)}kb`;
                    allH6s[1].innerHTML = `Compressed image size: ${Math.round(compressedSize / 1024)}kb`;
                    downloadBtn.style.display = 'unset';
                }, 'image/jpeg', 1);
            },
            reader.onerror = error => {
                console.error(error);
            }
    }
}