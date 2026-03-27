const products = JSON.parse(localStorage.getItem("products")) || [];
let edit = -1;
document.querySelector(".overlay").style.display = "none";

function addproduct() {
    let newproductname = document.getElementById("iName").value.trim();
    let newproductprice = document.getElementById("iPrice").value.trim();
    let newproductstock = document.getElementById("iStock").value.trim();
    let checkname = products.find((value) => value.name === newproductname)
    if (checkname) {
        errorname("Tên bị trùng,Vui lòng nhập lại", "block");
        return;
    }
    errorname("", "none");
    if (newproductprice <= 0) {
        errorprice("Giá bán phải lớn hơn 0", "block");
        return;
    }
    errorprice("", "none");
    if (newproductstock < 0) {
        errorstock("Số lượng tồn kho phải lớn hơn hoặc bằng 0", "block");
        return;
    }
    errorstock("", "none");
    if (newproductstock == "") {
        newproductstock = 0;
    }
    if (edit === -1) {
        let newproduct = {
            id: products.length !== 0 ? products[products.length - 1].id + 1 : 1,
            name: newproductname,
            price: newproductprice,
            quantity: newproductstock,
            status: newproductstock == 0 ? "Hết hàng" : "Còn hàng",
        };
        products.push(newproduct);

    } else {
        products[edit].name = newproductname;
        products[edit].price = newproductprice;
        products[edit].quantity = newproductstock;
        edit = -1;
        document.getElementById("btnSubmit").innerHTML = ("Thêm sản phẩm")
        localStorage.setItem("products", JSON.stringify(products));
    }
    localStorage.setItem("products", JSON.stringify(products));
    renderlist(products);
}
function resetForm() {
    let newproductname = document.getElementById("iName");
    let newproductprice = document.getElementById("iPrice");
    let newproductstock = document.getElementById("iStock");
    newproductname.value = "";
    newproductprice.value = "";
    newproductstock.value = "";
    errorname("", "none");
    errorprice("", "none");
    errorstock("", "none");

}
function errorstock(text, display) {
    document.querySelector(".error-stock").style.display = display;
    document.querySelector(".error-stock").innerHTML = text;
}
function errorprice(text, display) {
    document.querySelector(".error-price").style.display = display;
    document.querySelector(".error-price").innerHTML = text;
}
function errorname(text, display) {
    document.querySelector(".error-name").style.display = display;
    document.querySelector(".error-name").innerHTML = text;
}
function renderlist(products) {
    tbody.innerHTML = products
        .map((value, index) => {
            return `<tr id="row-SPJ806NEC">
                            <td>${value.id}</td>
                            <td class="td-name">${value.name}</td>
                            <td class="td-price">${value.price}</td>
                            <td class="center" style="font-weight: 700">${value.quantity}</td>
                            <td class="status">${value.quantity == 0 ? "Hết hàng" : "Còn hàng"}</td>
                            <td>
                                <div class="td-actions">
                                    <button class="btn btn-sm btn-edit" onclick = "updateproduct(${index})">✏ Sửa</button>
                                    <button class="btn btn-sm btn-del" onclick = "confirmdelete(${index})">✕ Xóa</button>
                                </div>
                            </td>
                        </tr>
                        `
        }).join("");
}
function updateproduct(index) {
    let products = JSON.parse(localStorage.getItem("products"));
    let editproductname = document.getElementById("iName").value.trim();
    let editproductprice = document.getElementById("iPrice").value.trim();
    let editproductstock = document.getElementById("iStock").value.trim();
    editproductname = products[index].name;
    editproductprice = products[index].price;
    editproductstock = products[index].quantity;
    edit = index;
    document.getElementById("btnSubmit").innerText = ("Cập Nhật");
}
function confirmdelete(index) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này")) {
        products.splice(index, 1);
        renderlist(products);
        localStorage.setItem("products", JSON.stringify(products));
        document.querySelector(".overlay").style.display = "none";
    }

}
function searchproduct() {
    let keyword = document.getElementById("searchInput").value.trim().toLowerCase();
    let foundProduct = products.filter((value) => {
        return value.name.toLowerCase().includes(keyword);
    })
    renderlist(foundProduct);
}
function sortproduct() {
    let sortvalue = document.getElementById("sortSelect");
    if (sortvalue == "price_asc") {
        for (let i = 0; i < products.length; i++) {
            for (let j = i - 1; j < products.length; j++) {
                if (products[i].price > products[j].price) {
                    let temp = products[i]
                    products[i] = products[j]
                    products[j] = temp
                }
                renderlist();
            }
        }
    }
}
// localStorage.clear();
