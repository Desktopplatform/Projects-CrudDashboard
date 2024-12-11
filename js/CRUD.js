let getData = JSON.parse(localStorage.getItem('data')) || [];
let currentIndex = null;

function renderTable() {
    const tableBody = document.getElementById('itemTableBody');
    tableBody.innerHTML = '';
    getData.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.Price}</td>
                <td>${item.Phone}</td>
                <td>
                    <button class="btn btn-warning" onclick="openEditModal(${index})">Update</button>
                    <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

/**Add Data */
document.getElementById('addItem').addEventListener('click', () => {
    let i = Math.floor(Math.random() * 100); // ایدی می‌سازد
    const proName = document.getElementById('pro_name').value;
    const proPrice = document.getElementById('pro_price').value;
    const phon = document.getElementById('phonNumber').value;
    if (i && proName && proPrice && phon) {
        getData.push({
            id: i,
            name: proName,
            Price: proPrice,
            Phone: phon
        });
        localStorage.setItem('data', JSON.stringify(getData));
        document.getElementById('pro_name').value = '';
        document.getElementById('pro_price').value = '';
        document.getElementById('phonNumber').value = '';
        renderTable();
    }
});

/**Edit Data */
function openEditModal(index) {
    currentIndex = index;
    const item = getData[index];
    document.getElementById('updatedProName').value = item.name;
    document.getElementById('updatedProprice').value = item.Price;
    document.getElementById('updatedPhone').value = item.Phone;
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

document.getElementById('updateItem').addEventListener('click', () => {
    const updated_ProName = document.getElementById('updatedProName').value;
    const updated_Proprice = document.getElementById('updatedProprice').value;
    const updated_Phone = document.getElementById('updatedPhone').value;

    if (updated_ProName !== '' && updated_Proprice !== '' && updated_Phone !== '') {
        getData[currentIndex].name = updated_ProName;
        getData[currentIndex].Price = updated_Proprice;
        getData[currentIndex].Phone = updated_Phone;
        localStorage.setItem('data', JSON.stringify(getData));
        renderTable();
        // bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }
});

/**Delete Data */
function deleteItem(index) {
    getData.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(getData));
    renderTable();
}

/**Search Data **/
document.getElementById('searchInput').addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const filteredData = getData.filter(item =>
        item.name.toLowerCase().includes(filter) ||
        item.Price.toString().includes(filter) ||
        item.Phone.toLowerCase().includes(filter)
    );

    const tableBody = document.getElementById('itemTableBody');
    tableBody.innerHTML = '';
    filteredData.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.Price}</td>
                <td>${item.Phone}</td>
                <td>
                    <button class="btn btn-warning" onclick="openEditModal(${index})">Update</button>
                    <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
});

document.addEventListener('DOMContentLoaded', renderTable);