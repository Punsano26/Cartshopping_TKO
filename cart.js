document.addEventListener("DOMContentLoaded", () => {
  let cartItems = []; // เก็บข้อมูลของสินค้าในตะกร้า

  // เพิ่มการตรวจจับการคลิกปุ่มลบสินค้าในตะกร้า
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart")) {
      const indexToRemove = parseInt(
        event.target.parentElement.getAttribute("data-index")
      );
      const itemToRemove = cartItems[indexToRemove];
      if (itemToRemove.quantity > 1) {
        itemToRemove.quantity--; // ลบจำนวนสินค้าลงทีละชิ้น
      } else {
        cartItems.splice(indexToRemove, 1); // ลบสินค้าออกจากตะกร้า
      }
      updateCart(); // อัปเดตตะกร้าหลังลบสินค้า
    } else if (event.target.id === "clear-cart") {
      clearCart(); // เรียกใช้ฟังก์ชันเพื่อเคลียร์ตะกร้า
    }
  });

  // กำหนดการคลิกปุ่ม Add to Cart
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      const productPrice = parseFloat(button.getAttribute("data-price"));

      // ตรวจสอบว่าสินค้าที่เพิ่มเข้าตะกร้านี้มีอยู่ในตะกร้าแล้วหรือไม่
      const existingCartItem = cartItems.find(
        (item) => item.productId === productId
      );
      if (existingCartItem) {
        existingCartItem.quantity++; // เพิ่มจำนวนสินค้า
      } else {
        // เพิ่มสินค้าใหม่เข้าตะกร้า
        cartItems.push({ productId, quantity: 1, productPrice });
      }

      updateCart(); // อัปเดตตะกร้าหลังเพิ่มสินค้า
    });
  });

  // ฟังก์ชันเพื่ออัปเดตตะกร้าหลังจากการเปลี่ยนแปลง
  function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    let total = 0;

    // เคลียร์ข้อมูลเก่าในตะกร้า
    cartContainer.innerHTML = "";

    // แสดงรายละเอียดของสินค้าที่อยู่ในตะกร้า
    cartItems.forEach((item, index) => {
      total += item.quantity * item.productPrice;

      // สร้าง Element สำหรับแสดงรายละเอียดของสินค้าในตะกร้า
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.setAttribute("data-index", index); // เก็บ index เพื่อใช้ในการลบสินค้า
      cartItemElement.innerHTML = `
                <p>Product ${item.productId} - $${item.productPrice.toFixed(
        2
      )} - จำนวน: ${item.quantity}</p>
                <button class="remove-from-cart">Remove</button>
            `;
      cartContainer.appendChild(cartItemElement);
    });

    // แสดงราคารวมของสินค้าทั้งหมดในตะกร้า
    const totalElement = document.getElementById("total");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }

  // ฟังก์ชันเพื่อเคลียร์ตะกร้า
  function clearCart() {
    cartItems = []; // เคลียร์สินค้าทั้งหมดในตะกร้า
    updateCart(); // อัปเดตตะกร้าหลังจากเคลียร์
  }
});
