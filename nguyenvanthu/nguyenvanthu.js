// Hàm lấy hình ảnh ngẫu nhiên cho bất động sản
function getPropertyImage(type) {
  const images = {
    'apartment': [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800'
    ],
    'house': [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    'villa': [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
    ],
    'default': [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800'
    ]
  };

  // Xác định loại bất động sản dựa trên tiêu đề
  let category = 'default';
  const typeStr = type.toLowerCase();
  
  if (typeStr.includes('căn hộ') || typeStr.includes('chung cư') || typeStr.includes('apartment')) {
    category = 'apartment';
  } else if (typeStr.includes('nhà') || typeStr.includes('house')) {
    category = 'house';
  } else if (typeStr.includes('biệt thự') || typeStr.includes('villa')) {
    category = 'villa';
  }

  const imageArray = images[category];
  return imageArray[Math.floor(Math.random() * imageArray.length)];
}

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const keyword = document.getElementById("keyword").value.trim();
  const resultDiv = document.getElementById("results");
  
  resultDiv.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Đang tìm kiếm bất động sản phù hợp...</p>
    </div>
  `;

  try {
    const response = await fetch(`http://localhost:1880/timkiem?q=${encodeURIComponent(keyword)}`);
    const data = await response.json();

    if (!data || data.length === 0) {
      resultDiv.innerHTML = `
        <div class="no-results">
          Không tìm thấy kết quả nào phù hợp với từ khóa "<strong>${keyword}</strong>"
        </div>
      `;
      return;
    }

    resultDiv.innerHTML = data.map(item => {
      const imageUrl = getPropertyImage(item.Tieude);
      
      return `
        <div class="card">
          <img src="${imageUrl}" alt="${item.Tieude}" class="card-image" />
          <div class="card-header">
            <h2>${item.Tieude}</h2>
          </div>
          <div class="card-body">
            <div class="card-info">
              <span class="icon">📍</span>
              <div><strong>Địa chỉ:</strong> ${item.Diachi}</div>
            </div>
            <div class="card-info">
              <span class="icon">🏙️</span>
              <div><strong>Thành phố:</strong> ${item.Thanhpho}</div>
            </div>
            <div class="card-info">
              <span class="icon">📐</span>
              <div><strong>Diện tích:</strong> ${item.Dientich} m²</div>
            </div>
            <div class="price-tag">
              💰 ${item.Gia.toLocaleString('vi-VN')} VNĐ
            </div>
            <div class="card-info">
              <span class="icon">✅</span>
              <span class="status-badge">${item.Trangthai}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `
      <div class="no-results" style="background: #fee; color: #c33;">
        ⚠️ Lỗi khi truy vấn dữ liệu! Vui lòng kiểm tra kết nối API.
      </div>
    `;
  }
});