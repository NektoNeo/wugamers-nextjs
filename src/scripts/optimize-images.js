#!/usr/bin/env node

/**
 * Image Optimization Script for WU Gamers
 * Конвертирует изображения в современные форматы (WebP, AVIF)
 * и создает оптимизированные версии для разных размеров экранов
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Конфигурация размеров для responsive images
const SIZES = {
  thumbnail: 150,
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
  full: 2560
};

// Качество для разных форматов
const QUALITY = {
  webp: 85,
  avif: 80,
  jpg: 90
};

/**
 * Оптимизирует одно изображение
 */
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`📸 Оптимизация ${filename}...`);
  console.log(`  Оригинал: ${metadata.width}x${metadata.height}, ${metadata.format}`);
  
  const results = [];
  
  // Генерируем разные размеры
  for (const [sizeName, width] of Object.entries(SIZES)) {
    // Пропускаем если изображение меньше целевого размера
    if (metadata.width < width) continue;
    
    // WebP версия
    const webpPath = path.join(outputDir, `${filename}-${sizeName}.webp`);
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);
    
    const webpStats = await fs.stat(webpPath);
    results.push({
      format: 'webp',
      size: sizeName,
      width,
      fileSize: webpStats.size,
      path: webpPath
    });
    
    // AVIF версия (лучшее сжатие, но медленнее)
    const avifPath = path.join(outputDir, `${filename}-${sizeName}.avif`);
    await sharp(inputPath)
      .resize(width, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .avif({ quality: QUALITY.avif })
      .toFile(avifPath);
    
    const avifStats = await fs.stat(avifPath);
    results.push({
      format: 'avif',
      size: sizeName,
      width,
      fileSize: avifStats.size,
      path: avifPath
    });
    
    // Оптимизированный JPEG как fallback
    if (metadata.format !== 'svg') {
      const jpgPath = path.join(outputDir, `${filename}-${sizeName}.jpg`);
      await sharp(inputPath)
        .resize(width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ 
          quality: QUALITY.jpg,
          progressive: true,
          mozjpeg: true
        })
        .toFile(jpgPath);
      
      const jpgStats = await fs.stat(jpgPath);
      results.push({
        format: 'jpg',
        size: sizeName,
        width,
        fileSize: jpgStats.size,
        path: jpgPath
      });
    }
  }
  
  // Генерируем blur placeholder для Next.js
  const placeholderPath = path.join(outputDir, `${filename}-placeholder.jpg`);
  const { data, info } = await sharp(inputPath)
    .resize(10, null, { withoutEnlargement: true })
    .jpeg({ quality: 50 })
    .toBuffer({ resolveWithObject: true });
  
  const base64 = `data:image/jpeg;base64,${data.toString('base64')}`;
  
  await fs.writeFile(
    path.join(outputDir, `${filename}-placeholder.txt`),
    base64
  );
  
  return {
    original: inputPath,
    originalSize: (await fs.stat(inputPath)).size,
    results,
    placeholder: base64
  };
}

/**
 * Генерирует React компонент для оптимизированного изображения
 */
function generateImageComponent(filename, data) {
  return `import Image from 'next/image';

// Auto-generated optimized image component
export function ${filename.replace(/-/g, '')}Image(props) {
  return (
    <Image
      src="/images/${filename}-desktop.webp"
      alt={props.alt || "${filename}"}
      width={${data.results.find(r => r.size === 'desktop')?.width || 1920}}
      height={props.height}
      sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
      placeholder="blur"
      blurDataURL="${data.placeholder}"
      {...props}
    />
  );
}`;
}

/**
 * Основная функция
 */
async function main() {
  const inputDir = path.join(process.cwd(), 'public');
  const outputDir = path.join(process.cwd(), 'public', 'images', 'optimized');
  const componentsDir = path.join(process.cwd(), 'src', 'components', 'images');
  
  // Создаем директории если не существуют
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(componentsDir, { recursive: true });
  
  // Список изображений для оптимизации
  const images = [
    'Robot.png',
    // Добавьте другие изображения здесь
  ];
  
  console.log('🚀 Начинаем оптимизацию изображений...\n');
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const imageName of images) {
    const inputPath = path.join(inputDir, imageName);
    
    try {
      const result = await optimizeImage(inputPath, outputDir);
      
      // Подсчитываем экономию
      const optimizedSize = Math.min(...result.results.map(r => r.fileSize));
      const savings = ((1 - optimizedSize / result.originalSize) * 100).toFixed(1);
      
      totalOriginal += result.originalSize;
      totalOptimized += optimizedSize;
      
      console.log(`✅ ${imageName}:`);
      console.log(`   Оригинал: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Оптимизировано: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Экономия: ${savings}%\n`);
      
      // Генерируем React компонент
      const componentName = path.basename(imageName, path.extname(imageName));
      const componentPath = path.join(componentsDir, `${componentName}.tsx`);
      await fs.writeFile(componentPath, generateImageComponent(componentName, result));
      
    } catch (error) {
      console.error(`❌ Ошибка при обработке ${imageName}:`, error.message);
    }
  }
  
  // Итоговая статистика
  console.log('📊 Итоговая статистика:');
  console.log(`   Общий размер оригиналов: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Общий размер оптимизированных: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Общая экономия: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
  
  // Генерируем конфигурацию для next.config.js
  console.log('\n📝 Добавьте в next.config.ts:');
  console.log(`
images: {
  deviceSizes: [640, 1024, 1920, 2560],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 31536000, // 1 год
}
  `);
}

// Запуск если вызвано напрямую
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, generateImageComponent };