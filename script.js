const form = document.getElementById('form-cartaz');
const imageUrl = 'C:/Users/vladimirmoreira/Desktop/sabor/cartaz.jpg'; // Substitua pela URL da imagem do seu cartaz

const canvas = document.getElementById('cartaz-canvas');
const ctx = canvas.getContext('2d');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const weekday = document.getElementById('weekday').value;
  const items = document.getElementById('items').value.split('\n').map(item => item.trim()).filter(item => item !== '');
  const phoneNumbers = document.getElementById('phoneNumbers').value.split('\n').map(number => number.trim()).filter(number => number !== '');
  const priceM = document.getElementById('priceM').value;
  const priceG = document.getElementById('priceG').value;

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const image = await createImageBitmap(blob);

    // Define o tamanho do canvas
    canvas.width = image.width;
    canvas.height = image.height;

    // Desenha a imagem no canvas
    ctx.drawImage(image, 0, 0);

    const drawText = (text, x, y, fontSize, fontStyle, color) => {
      ctx.font = `${fontStyle} ${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    };

    drawText(title, 100, 50, 40, 'bold', 'white');
    drawText(weekday, 150, 120, 40, 'bold', 'white');

    let y = 200;
    items.forEach(item => {
      drawText(item, 100, y, 30, 'normal', 'white');
      y += 40;
    });

    y = 450;
    phoneNumbers.forEach(phoneNumber => {
      drawText(phoneNumber, 100, y, 25, 'normal', 'white');
      y += 30;
    });

    drawText(`M - ${priceM}`, 500, 500, 30, 'normal', 'white');
    drawText(`G - ${priceG}`, 500, 550, 30, 'normal', 'white');

    // A imagem final será exibida no canvas.

  } catch (error) {
    console.error('Erro ao gerar o cartaz:', error);
    alert('Erro ao gerar o cartaz. Verifique se a URL da imagem está correta.');
  }
});