async function verifyFeitio() {
  try {
    const res = await fetch('http://localhost:3000/feitio');
    console.log('/feitio STATUS:', res.status);
    const html = await res.text();
    console.log('Contains Nixi Pae:', html.includes('Nixi Pae'));
    console.log('Contains Uni:', html.includes('Uni'));
    console.log('Contains Kamarampi:', html.includes('Kamarampi'));
    console.log('Contains Santo Daime:', html.includes('Santo Daime'));
    console.log('Contains União do Vegetal:', html.includes('União do Vegetal'));
    console.log('Contains Barquinha:', html.includes('Barquinha'));
    console.log('Contains Nota de Manejo do Cipó:', html.includes('nem sempre permitem a colheita exclusiva'));
    console.log('Contains Alquimia:', html.includes('Melhor Alquimia'));

    // Check images
    const images = [
      '/assets/feitio/curadas/feitio-vigilia-noturna-feitor.jpg',
      '/assets/feitio/curadas/feitio-colheita-rezo-chacrona.jpg',
      '/assets/feitio/curadas/feitio-quebracao-cipo-malhos.jpg'
    ];
    for (const img of images) {
      const r = await fetch('http://localhost:3000' + img);
      console.log(img, '-> STATUS:', r.status, 'LENGTH:', r.headers.get('content-length'));
    }
  } catch (err) {
    console.error('Error verifying /feitio:', err);
  }
}
verifyFeitio();
