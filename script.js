async function submitdetails(event) {
  event.preventDefault();
  const fname = event.target.name.value;
  const price = event.target.productprice.value;
  const category = event.target.categories.value;

  const obj = {
    fname,
    price,
    category,
  };

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/2142c0195657439aa1747f37cd13ab67/sellerData",
      obj
    );
    showuseronscreen(response.data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/2142c0195657439aa1747f37cd13ab67/sellerData"
    );

    console.log(response);

    for (var i = 0; i < response.data.length; i++) {
      showuseronscreen(response.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
});

async function showuseronscreen(obj) {
  const parentelem = document.getElementById(obj.category.toLowerCase());
  const childelem = document.createElement("li");
  childelem.textContent = obj.fname + " => " + obj.price;

  const deletebutton = document.createElement("input");
  deletebutton.type = "button";
  deletebutton.value = "Delete";

  deletebutton.onclick = async () => {
    try {
      await axios.delete(
        `https://crudcrud.com/api/2142c0195657439aa1747f37cd13ab67/sellerData/${obj._id}`
      );
      parentelem.removeChild(childelem);
    } catch (err) {
      console.log(err);
    }
  };

  const editbutton = document.createElement("input");
  editbutton.type = "button";
  editbutton.value = "Edit";

  editbutton.onclick = () => {
    localStorage.removeItem(obj.price);
    parentelem.removeChild(childelem);
    document.getElementById("name").value = obj.fname;
    document.getElementById("productprice").value = obj.price;
    document.getElementById("categories").value = obj.category; 
    document.getElementById("submitbutton").style.display = "none";
    const updatebutton = document.getElementById("updatebutton");
    updatebutton.style.display = "block";
    updatebutton.onclick = async () => {
      try {
        const response = await axios.put(
          `https://crudcrud.com/api/2142c0195657439aa1747f37cd13ab67/sellerData/${obj._id}`,
          {
            fname: document.getElementById("name").value,
            price: document.getElementById("productprice").value,
            category: document.getElementById("categories").value, 
          }
        );
        childelem.textContent =
          response.data.fname + " => " + response.data.price;
        document.getElementById("submitbutton").style.display = "block";
        updatebutton.style.display = "none";
      } catch (err) {
        console.log(err);
      }
    };
  };

  childelem.appendChild(deletebutton);
  childelem.appendChild(editbutton);

  parentelem.appendChild(childelem);
}
