// Đường dẫn chung đến file JSON tĩnh
const JSON_URL = './json_server/db.json'; 

// Hàm dùng chung để loại bỏ dấu gạch chéo đầu tiên (cho GitHub Pages)
const correctPath = (path) => path.substring(1); 

// PETS 
const petsContainer = document.getElementById('pets-container');

// Thay đổi: Chỉ gọi file db.json một lần
fetch(JSON_URL)
  .then(res => res.json())
  .then(data => {
    // TRÍCH XUẤT MẢNG PETS TỪ ĐỐI TƯỢNG DATA
    const pets = data.pets; 
    
    pets.forEach(p => {
      const { code, name, gender, age, price, avatar } = p;

      // SỬA LỖI ĐƯỜNG DẪN ẢNH: Bỏ dấu '/' đầu tiên
      const correctedAvatar = correctPath(avatar); 

      const html = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="pet-card">
            <img src="${correctedAvatar}" alt="${name}">
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

    // Tiếp tục xử lý cho PRODUCTS và USEFUL trong cùng một khối .then()
    
    // PRODUCTS
    const productsContainer = document.getElementById('products-container');
    const products = data.products; // TRÍCH XUẤT MẢNG PRODUCTS

    products.forEach(p => {
      const { name, product_type, size, price, tag_free, avatar } = p;

      // SỬA LỖI ĐƯỜNG DẪN ẢNH: Bỏ dấu '/' đầu tiên
      const correctedAvatar = correctPath(avatar); 
      
      const html = `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="product-card">
            <img src="${correctedAvatar}" alt="${name}">
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

    // USEFUL
    const usefulContainer = document.getElementById('useful-container');
    const usefuls = data.useful; // TRÍCH XUẤT MẢNG USEFUL

    usefuls.forEach(u => {
      const { category, title, summary, image } = u;

      // SỬA LỖI ĐƯỜNG DẪN ẢNH: Bỏ dấu '/' đầu tiên
      const correctedImage = correctPath(image); 

      const html = `
        <div class="col-md-4">
          <div class="useful-card">
            <img src="${correctedImage}" alt="${title}">
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
  .catch(err => console.error("Lỗi khi tải dữ liệu từ file JSON tĩnh:", err));


// VALIDATE EMAIL (Giữ nguyên)
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