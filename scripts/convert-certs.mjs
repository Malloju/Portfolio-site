import { pdfToPng } from 'pdf-to-png-converter';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'certificates');

mkdirSync(publicDir, { recursive: true });

const certs = [
  { input: 'C:/Users/Dell/Downloads/oracleCertificate.pdf', output: 'oracle.png' },
  { input: 'C:/Users/Dell/Downloads/chatgptprompt.pdf', output: 'chatgpt.png' },
  { input: 'C:/Users/Dell/Downloads/master.pdf', output: 'master-automata.png' },
];

for (const cert of certs) {
  console.log(`Converting ${cert.input}...`);
  try {
    const pages = await pdfToPng(cert.input, {
      disableFontFace: false,
      useSystemFonts: true,
      viewportScale: 1.5,
      pagesToProcess: [1],
      strictPagesToProcess: false,
      verbosityLevel: 0,
    });
    if (pages.length > 0) {
      const outPath = join(publicDir, cert.output);
      writeFileSync(outPath, pages[0].content);
      console.log(`  ✓ Saved ${cert.output}`);
    }
  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  }
}

console.log('Done!');
