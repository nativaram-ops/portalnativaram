async function checkAssets() {
  const assets = [
    '/assets/manifesto/nascidos-raio-de-sol.jpg',
    '/assets/manifesto/alquimia-entre-dois-mundos.jpg',
    '/assets/manifesto/agrofloresta-projetos-de-luz.jpg'
  ];
  for (const a of assets) {
    const r = await fetch('http://localhost:3000' + a);
    console.log(a, '-> Status:', r.status, 'Type:', r.headers.get('content-type'), 'Length:', r.headers.get('content-length'));
  }
}
checkAssets();
