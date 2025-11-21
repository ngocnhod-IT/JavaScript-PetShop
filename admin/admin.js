
function showTab(tab) {
  document.getElementById("tab-pets").style.display = tab === "pets" ? "block" : "none";
  document.getElementById("tab-products").style.display = tab === "products" ? "block" : "none";
}


const PET_API = "http://localhost:3000/pets";
const PRODUCT_API = "http://localhost:3000/products";


function loadPets() {
  fetch(PET_API)
    .then(res => res.json())
    .then(pets => {
      const tbody = document.querySelector("#pet-table tbody");
      tbody.innerHTML = "";

      pets.forEach(p => {
        const { id, code, name, gender, age, price } = p;

        const row = `
          <tr>
            <td>${id}</td>
            <td>${code}</td>
            <td>${name}</td>
            <td>${gender}</td>
            <td>${age}</td>
            <td>${price}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editPet(${id})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deletePet(${id})">Delete</button>
            </td>
          </tr>
        `;

        tbody.innerHTML += row;
      });
    })
    .catch(err => console.error("Lỗi load pets:", err));
}


function deletePet(id) {
  if (!confirm("Confirm delete?")) return;

  fetch(`${PET_API}/${id}`, { method: "DELETE" })
    .then(() => loadPets());
}


function editPet(id) {
  fetch(`${PET_API}/${id}`)
    .then(res => res.json())
    .then(p => {
      const { code, name, gender, age, price, avatar } = p;

      document.getElementById("pet-id").value = p.id;
      document.getElementById("pet-code").value = code;
      document.getElementById("pet-name").value = name;
      document.getElementById("pet-gender").value = gender;
      document.getElementById("pet-age").value = age;
      document.getElementById("pet-price").value = price;
      document.getElementById("pet-avatar").value = avatar;
    });
}


document.getElementById("pet-form").addEventListener("submit", e => {
  e.preventDefault();

  const id = document.getElementById("pet-id").value;

  const data = {
    code: document.getElementById("pet-code").value,
    name: document.getElementById("pet-name").value,
    gender: document.getElementById("pet-gender").value,
    age: document.getElementById("pet-age").value,
    price: document.getElementById("pet-price").value,
    avatar: document.getElementById("pet-avatar").value
  };

  const options = {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  const url = id ? `${PET_API}/${id}` : PET_API;

  fetch(url, options)
    .then(() => {
      e.target.reset();
      loadPets();
    });
});

loadPets();




function loadProducts() {
  fetch(PRODUCT_API)
    .then(res => res.json())
    .then(products => {
      const tbody = document.querySelector("#product-table tbody");
      tbody.innerHTML = "";

      products.forEach(p => {
        const { id, name, product_type, size, price, tag_free } = p;

        const row = `
          <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${product_type}</td>
            <td>${size}</td>
            <td>${price}</td>
            <td>${tag_free}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editProduct(${id})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteProduct(${id})">Delete</button>
            </td>
          </tr>
        `;

        tbody.innerHTML += row;
      });
    })
    .catch(err => console.error("Lỗi load products:", err));
}


function deleteProduct(id) {
  if (!confirm("Confirm delete?")) return;

  fetch(`${PRODUCT_API}/${id}`, { method: "DELETE" })
    .then(() => loadProducts());
}


function editProduct(id) {
  fetch(`${PRODUCT_API}/${id}`)
    .then(res => res.json())
    .then(p => {
      const { name, product_type, size, price, tag_free, avatar } = p;

      document.getElementById("product-id").value = p.id;
      document.getElementById("product-name").value = name;
      document.getElementById("product-type").value = product_type;
      document.getElementById("product-size").value = size;
      document.getElementById("product-price").value = price;
      document.getElementById("product-tag").value = tag_free;
      document.getElementById("product-avatar").value = avatar;
    });
}


document.getElementById("product-form").addEventListener("submit", e => {
  e.preventDefault();

  const id = document.getElementById("product-id").value;

  const data = {
    name: document.getElementById("product-name").value,
    product_type: document.getElementById("product-type").value,
    size: document.getElementById("product-size").value,
    price: document.getElementById("product-price").value,
    tag_free: document.getElementById("product-tag").value,
    avatar: document.getElementById("product-avatar").value
  };

  const options = {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  const url = id ? `${PRODUCT_API}/${id}` : PRODUCT_API;

  fetch(url, options)
    .then(() => {
      e.target.reset();
      loadProducts();
    });
});

loadProducts();
