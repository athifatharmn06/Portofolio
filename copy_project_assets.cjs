const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\athif\\Downloads\\Portofolio\\My Work';
const destDir = path.join(__dirname, 'public', 'projects');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function copyWebpFiles(dir, currentRelativePath = '') {
    const files = fs.readdirSync(dir);

    // Check if this directory is a 'webp' folder
    if (path.basename(dir) === 'webp') {
        const parentDirName = path.basename(path.dirname(dir));
        // Create a corresponding project folder in public/projects
        const destinationProjectFolder = path.join(destDir, parentDirName);

        if (!fs.existsSync(destinationProjectFolder)) {
            fs.mkdirSync(destinationProjectFolder, { recursive: true });
            console.log(`Created project asset folder: ${parentDirName}`);
        }

        // Copy all webp files
        files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.webp') {
                const sourceFilePath = path.join(dir, file);
                const destFilePath = path.join(destinationProjectFolder, file);
                fs.copyFileSync(sourceFilePath, destFilePath);
                console.log(`Copied ${file} -> ${parentDirName}`);
            }
        });
    } else {
        // Traverse deeper
        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                copyWebpFiles(filePath, path.join(currentRelativePath, file));
            }
        });
    }
}

console.log('Starting asset compilation...');
copyWebpFiles(sourceDir);
console.log('Done!');
