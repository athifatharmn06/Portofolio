const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Since we installed it earlier!

const TEMP_DIR = path.join(__dirname, 'temp_screenshots');
const OUT_DIR = path.join(__dirname, 'public', 'projects', 'Personal Portfolio');

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function takeScreenshots() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set a very high resolution viewport for beautiful screenshots
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('Navigating to local site...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

    // Wait a brief moment to ensure all 3D/glass effects and fonts are rendered
    await new Promise(resolve => setTimeout(resolve, 2000));

    const shots = [
        { name: '1_hero_section', jsScroll: () => window.scrollTo(0, 0) },
        { name: '2_about_section', jsScroll: () => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'center' }) },
        { name: '3_experience_section', jsScroll: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'instant', block: 'start' }) },
        { name: '4_skills_section', jsScroll: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'instant', block: 'start' }) },
        { name: '5_projects_section', jsScroll: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'instant', block: 'start' }) },
    ];

    for (const shot of shots) {
        console.log(`Taking screenshot: ${shot.name}...`);

        // Scroll perfectly to the section
        await page.evaluate(shot.jsScroll);
        // Wait 2500ms to ensure ALL framer-motion animations complete their 0.5s - 1s durations
        await new Promise(resolve => setTimeout(resolve, 2500));

        const tempPath = path.join(TEMP_DIR, `${shot.name}.png`);

        await page.screenshot({ path: tempPath, fullPage: false }); // Captures viewport

        console.log(`Converting ${shot.name} to WebP...`);
        const finalPath = path.join(OUT_DIR, `${shot.name}.webp`);
        await sharp(tempPath)
            .webp({ quality: 90 })
            .toFile(finalPath);
    }

    console.log('Cleaning up...');
    await browser.close();

    // Delete temp png files
    fs.readdirSync(TEMP_DIR).forEach(file => {
        fs.unlinkSync(path.join(TEMP_DIR, file));
    });
    fs.rmdirSync(TEMP_DIR);

    console.log('Screenshot generation complete! Images saved to public/projects/Personal Portfolio/');
}

takeScreenshots().catch(console.error);
