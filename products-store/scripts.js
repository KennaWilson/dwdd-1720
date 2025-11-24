
async function loadProducts() {
  try {
    const res = await fetch('products.json');
    if (!res.ok) throw new Error('Failed to load products.json');
    const products = await res.json();
    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function createNavButtons(products) {
  const container = document.getElementById('product-links');
  container.innerHTML = '';
  products.forEach((p, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('role','listitem');
    btn.dataset.productId = p.id;
    btn.innerHTML = `${p.name} <span style="display:block;font-weight:400;font-size:0.8rem;color:#6b7280">${formatPrice(p.price)}</span>`;
    btn.addEventListener('click', () => showProduct(p));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showProduct(p);
      }
    });
    container.appendChild(btn);
  });
}

function formatPrice(val) {
  return typeof val === 'number' ? `$${val.toFixed(2)}` : val;
}

function showProduct(p) {
  const display = document.getElementById('product-display');
  display.innerHTML = ''; // clear

  // create product card
  const card = document.createElement('article');
  card.className = 'product-card';

  // thumbnail
  const thumb = document.createElement('div');
  thumb.className = 'thumb';
  const img = document.createElement('img');
  img.src = p.image;
  img.alt = p.name;
  thumb.appendChild(img);

  // meta
  const meta = document.createElement('div');
  meta.className = 'meta';
  const name = document.createElement('h3');
  name.className = 'product-name';
  name.textContent = p.name;

  const price = document.createElement('p');
  price.className = 'product-price';
  price.textContent = formatPrice(p.price);

  const desc = document.createElement('p');
  desc.className = 'product-desc';
  desc.textContent = p.description || '';

  // dynamic properties: pick arrays or other descriptive fields
  const dynamicList = document.createElement('div');
  dynamicList.className = 'product-dynamic';

  // find any array-valued properties > display them
  Object.keys(p).forEach(key => {
    const value = p[key];
    if (Array.isArray(value) && value.length > 0) {
      const label = document.createElement('p');
      label.style.margin = '8px 0 6px';
      label.style.fontWeight = 600;
      label.style.fontSize = '0.92rem';
      label.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ':';
      dynamicList.appendChild(label);

      const chips = document.createElement('div');
      chips.style.display = 'flex';
      chips.style.gap = '8px';
      chips.style.flexWrap = 'wrap';
      value.forEach(v => {
        const chip = document.createElement('span');
        chip.className = 'tag';
        chip.textContent = v;
        chips.appendChild(chip);
      });
      dynamicList.appendChild(chips);
    }
  });

  // tags (if exist)
  const tagRow = document.createElement('div');
  tagRow.className = 'product-tags';
  if (p.tags && Array.isArray(p.tags)) {
    p.tags.forEach(t => {
      const el = document.createElement('div');
      el.className = 'tag';
      el.textContent = t;
      tagRow.appendChild(el);
    });
  }

  // buy area (just a placeholder CTA)
  const buy = document.createElement('div');
  buy.style.marginTop = '14px';
  const buyBtn = document.createElement('button');
  buyBtn.textContent = 'Add to cart';
  buyBtn.style.padding = '10px 14px';
  buyBtn.style.borderRadius = '10px';
  buyBtn.style.border = 'none';
  buyBtn.style.cursor = 'pointer';
  buyBtn.style.background = 'linear-gradient(90deg, var(--accent), var(--accent-2))';
  buyBtn.style.color = '#fff';
  buyBtn.style.fontWeight = '700';
  buyBtn.addEventListener('click', () => {
    alert(`"${p.name}" added to cart — demo only.`);
  });
  buy.appendChild(buyBtn);

  // compose meta
  meta.appendChild(name);
  meta.appendChild(price);
  meta.appendChild(desc);
  meta.appendChild(dynamicList);
  meta.appendChild(tagRow);
  meta.appendChild(buy);

  card.appendChild(thumb);
  card.appendChild(meta);

  display.appendChild(card);
  display.querySelector('.select-hint')?.remove?.();
  // Move focus for accessibility
  meta.setAttribute('tabindex','-1');
  meta.focus();
}

(async function init(){
  const products = await loadProducts();
  if (!products.length) {
    const display = document.getElementById('product-display');
    display.innerHTML = '<p style="color:#b91c1c">Could not load products. Make sure products.json is available.</p>';
    return;
  }
  createNavButtons(products);
  // Optionally show first product by default
  // showProduct(products[0]);
})();