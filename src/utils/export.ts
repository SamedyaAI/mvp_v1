import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

export async function exportToPng(elementId: string, filename: string) {
  try {
    const element = document.getElementById(elementId);
    if (!element) return;

    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: 'white'
    });

    saveAs(dataUrl, `${filename}.png`);
  } catch (error) {
    console.error('Error exporting to PNG:', error);
  }
}