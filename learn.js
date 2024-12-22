// opiration basic at stip
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
var total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");
var modeUp = "create";
let tm;

// get totale
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value + +ads.value + -discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "";
  }
}
//creat data  طباعة البيانات
let proData;
if (localStorage.locData != null) {
  proData = JSON.parse(localStorage.locData);
} else {
  proData = [];
}
function creatData() {
  const newData = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (modeUp == "create") {
      //count
      if (newData.count < 100) {
        if (newData.count > 1) {
          for (let i = 0; i < newData.count; i++) {
            proData.push(newData);
          }
        } else {
          proData.push(newData);
        }
      }
    } else {
      submit.innerHTML = "create";
      count.style.display = "none";
      proData[tm] = newData;
    }
  } 

  // save localStorage
  localStorage.setItem("locData", JSON.stringify(proData));
  clearData();
  showData();
}

//clearData
function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  getTotal();
  count.value = "";
  category.value = "";
}

//read
function showData() {
  var table = "";

  for (let i = 0; i < proData.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${proData[i].title}</td>
      <td>${proData[i].price}</td>
      <td>${proData[i].tax}</td>
      <td>${proData[i].ads}</td>
      <td>${proData[i].discount}</td>
      <td>${proData[i].total}</td>
      <td>${proData[i].category}</td>
      <td><button onclick="updateData(${i})">update</button></td>
      <td><button onclick="delete1(${i})">delete</button></td>
      </tr>              
 `;
  }
  tbody.innerHTML = table;

  let btnAll = document.getElementById("deleteAll1");
  if (table != "") {
    btnAll.innerHTML = `
       <button id='r1' onclick="deleteAll()">deleteAll: (${proData.length})</button>`;
    btnAll.style.display = "block";
  } else {
    btnAll.innerHTML = "";
    btnAll.style.display = "none";
  }
}
showData();

//delete
function delete1(i) {
  proData.splice(i, 1);
  localStorage.locData = JSON.stringify(proData);
  showData();
}

//update
function updateData(i) {
  title.value = proData[i].title;
  price.value = proData[i].price;
  tax.value = proData[i].tax;
  ads.value = proData[i].ads;
  discount.value = proData[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = proData[i].category;
  modeUp = "update";
  submit.innerHTML = "update";
  tm = i;
  scroll({
    top: 0,
    behavior: "smooth"
  });

}

//deleteAll
function deleteAll() {
  proData.splice(0);
  localStorage.clear();
  showData();
}

//search نلاحظ ان هده الدالة تعمل بعناصر في جوهرالعناصر(البيانات)

function searchData(value) {
  let i = 0;
  let table = "";
  if (modSearch == "title") {
    for (i; i < proData.length; i++) {
      if (proData[i].title.includes(value)) {
        table += `
    <tr>
      <td>${i + 1}</td>
      <td>${proData[i].title}</td>
      <td>${proData[i].price}</td>
      <td>${proData[i].tax}</td>
      <td>${proData[i].ads}</td>
      <td>${proData[i].discount}</td>
      <td>${proData[i].total}</td>
      <td>${proData[i].category}</td>
      <td><button onclick="updateData(${i})">update</button></td>
      <td><button onclick="delete1(${i})">delete</button></td>
      </tr>              
 `;
      }
    }
  } else {
    for (i; i < proData.length; i++) {
      if (proData[i].category.includes(value)) {
        table += `
    <tr>
      <td>${i + 1}</td>
      <td>${proData[i].title}</td>
      <td>${proData[i].price}</td>
      <td>${proData[i].tax}</td>
      <td>${proData[i].ads}</td>
      <td>${proData[i].discount}</td>
      <td>${proData[i].total}</td>
      <td>${proData[i].category}</td>
      <td><button onclick="updateData(${i})">update</button></td>
      <td><button onclick="delete1(${i})">delete</button></td>
      </tr>              
 `;
      }
    }
  }

  tbody.innerHTML = table;
}

//btn search
let modSearch = "title";
function btnShearch(id) {
  if (id == "searchTitle") {
    modSearch = "title";
    search.placeholder = "search by title";
  } else {
    modSearch = "category";
    search.placeholder = "search by category";
  }
  search.focus();
}

