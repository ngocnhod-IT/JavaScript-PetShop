// PETS 
const petsContainer = document.getElementById('pets-container');

fetch('./json_server/db.json')
  .then(res => res.json())
  .then(pets => {
    pets.forEach(p => {
      const { code, name, gender, age, price, avatar } = p;

      const html = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="pet-card">
            <img src="${avatar}" alt="${name}">
            <div class="pet-info">
              <h5>${code} - ${name}</h5>
              <p>${gender} • ${age}</p>
              <div class="price">${price}</div>
            </div>
          </div>
        </div>
      `;

      petsContainer.innerHTML += html;
    });
  })
  .catch(err => console.error(err));




// PRODUCTS
const productsContainer = document.getElementById('products-container');

fetch('./json_server/db.json')
  .then(res => res.json())
  .then(products => {
    products.forEach(p => {
      const { name, product_type, size, price, tag_free, avatar } = p;

      const html = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="product-card">
            <img src="${avatar}" alt="${name}">
            <div class="product-info">
              <h5>${name}</h5>
              <p>${product_type} • ${size}</p>
              <div class="price">${price}</div>
              <small class="bonus">🎁 ${tag_free}</small>
            </div>
          </div>
        </div>
      `;

      productsContainer.innerHTML += html;
    });
  })
  .catch(err => console.error(err));



//  USEFUL
const usefulContainer = document.getElementById('useful-container');

fetch('./json_server/db.json')
  .then(res => res.json())
  .then(usefuls => {
    usefuls.forEach(u => {
      const { category, title, summary, image } = u;

      const html = `
        <div class="col-md-4">
          <div class="useful-card">
            <img src="${image}" alt="${title}">
            <div class="useful-info">
              <span class="badge bg-info">${category}</span>
              <h5>${title}</h5>
              <p>${summary}</p>
            </div>
          </div>
        </div>
      `;

      usefulContainer.innerHTML += html;
    });
  })
  .catch(err => console.error(err));


//  VALIDATE EMAIL 
const txtEmail = document.getElementById('id-email');
const btnSubmit = document.getElementById('id-submit');
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkEmail() {
  const emailValue = txtEmail.value.trim();

  if (!emailValue) {
    alert("Vui lòng nhập email!");
    txtEmail.focus();
  } else if (!regex.test(emailValue)) {
    alert("Email không hợp lệ! Vui lòng nhập đúng định dạng (vd: abc@gmail.com)");
    txtEmail.focus();
  } else {
    alert("Đăng ký thành công!");
    txtEmail.value = '';
  }
}

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  checkEmail();
});


