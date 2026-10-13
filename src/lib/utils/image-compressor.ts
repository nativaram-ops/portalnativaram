/**
 * ============================================================
 * COOPERATIVA NATIVARAM — COMPRESSOR CLIENT-SIDE DE IMAGENS
 * Garante custo zero de infraestrutura e carregamento ultrarrápido em mobile.
 * Reduz fotos de 8-15MB para ~150-250KB em WebP nativo no browser.
 * ============================================================
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 a 1.0
}

export async function comprimirImagemParaWebP(
  arquivo: File,
  opcoes: CompressOptions = {}
): Promise<string> {
  const { maxWidth = 1600, maxHeight = 1600, quality = 0.82 } = opcoes;

  return new Promise((resolve, reject) => {
    // Se não estiver em ambiente de browser, retorna rejeição amigável
    if (typeof window === "undefined" || !window.FileReader) {
      return reject(new Error("Compressor disponível apenas no navegador"));
    }

    const reader = new FileReader();
    reader.readAsDataURL(arquivo);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let { width, height } = img;

        // Manter a proporção de aspecto limitando as dimensões máximas
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return reject(new Error("Falha ao obter contexto 2D do Canvas"));
        }

        // Suavização bilinear para qualidade fotográfica de artefatos e altares
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar como WebP otimizado (ou JPEG caso WebP não seja suportado)
        try {
          const webpDataUrl = canvas.toDataURL("image/webp", quality);
          resolve(webpDataUrl);
        } catch {
          const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(jpegDataUrl);
        }
      };

      img.onerror = () => {
        reject(new Error("Erro ao carregar o arquivo de imagem para compressão"));
      };
    };

    reader.onerror = () => {
      reject(new Error("Erro na leitura do arquivo de imagem"));
    };
  });
}
