document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".filter-btn");
    const propertyCards = document.querySelectorAll(".property-card");

    searchButton.addEventListener("click", function () {
        // 선택된 필터 값 가져오기
        const selectedTypes = Array.from(document.querySelectorAll(".filter-section:nth-of-type(1) input[type='checkbox']:checked"))
            .map(input => input.nextElementSibling.innerText.trim());

        const minPriceInput = document.querySelector(".price-range input:nth-child(1)").value.trim();
        const maxPriceInput = document.querySelector(".price-range input:nth-child(2)").value.trim();
        const minPrice = minPriceInput ? parseInt(minPriceInput) : null;
        const maxPrice = maxPriceInput ? parseInt(maxPriceInput) : null;

        const selectedSizes = Array.from(document.querySelectorAll(".filter-section:nth-of-type(3) input[type='checkbox']:checked"))
            .map(input => input.nextElementSibling.innerText.trim());

        const selectedOptions = Array.from(document.querySelectorAll(".filter-section:nth-of-type(4) input[type='checkbox']:checked"))
            .map(input => input.nextElementSibling.innerText.trim());

        // 매물 필터링
        propertyCards.forEach(card => {
            const type = card.querySelector(".property-type").innerText.trim();
            const priceText = card.querySelector(".property-price").innerText.replace(/[^0-9]/g, '');
            const price = parseInt(priceText) || 0;
            const sizeText = card.querySelector(".detail-item:nth-child(1) dd").innerText.replace(/[^0-9]/g, '');
            const size = parseInt(sizeText) || 0;
            const tags = Array.from(card.querySelectorAll(".tags .tag")).map(tag => tag.innerText.trim());

            let typeMatch = selectedTypes.length === 0 || selectedTypes.includes(type);
            let priceMatch = (minPrice === null && maxPrice === null) || 
                             (minPrice !== null && price >= minPrice) && 
                             (maxPrice !== null && price <= maxPrice);
            let sizeMatch = selectedSizes.length === 0 || selectedSizes.some(sizeOption => {
                if (sizeOption.includes("이하")) return size <= 20;
                if (sizeOption.includes("20-30")) return size > 20 && size <= 30;
                if (sizeOption.includes("30-40")) return size > 30 && size <= 40;
                if (sizeOption.includes("40 이상")) return size > 40;
                return false;
            });

            let optionsMatch = selectedOptions.length === 0 || selectedOptions.every(option => tags.includes(option));

            if (typeMatch && priceMatch && sizeMatch && optionsMatch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".filter-btn");
    const sortSelect = document.querySelector(".sort-options select");
    const propertyGrid = document.querySelector(".property-grid");

    function filterProperties() {
        const propertyCards = Array.from(document.querySelectorAll(".property-card"));

        // 필터 값 가져오기
        const selectedTypes = Array.from(document.querySelectorAll(".filter-section:nth-of-type(1) input[type='checkbox']:checked"))
            .map(input => input.nextElementSibling.innerText.trim());

        const minPriceInput = document.querySelector(".price-range input:nth-child(1)").value.trim();
        const maxPriceInput = document.querySelector(".price-range input:nth-child(2)").value.trim();
        const minPrice = minPriceInput ? parseInt(minPriceInput) : null;
        const maxPrice = maxPriceInput ? parseInt(maxPriceInput) : null;

        const selectedSizes = Array.from(document.querySelectorAll(".filter-section:nth-of-type(3) input[type='checkbox']:checked"))
            .map(input => input.nextElementSibling.innerText.trim());

        const selectedOptions = Array.from(document.querySelectorAll(".filter-section:nth-of-type(4) input[type='checkbox']:checked"))
            .map(input => input.nextElementSibling.innerText.trim());

        // 필터링 적용
        const filteredProperties = propertyCards.filter(card => {
            const type = card.querySelector(".property-type").innerText.trim();
            const priceText = card.querySelector(".property-price").innerText.replace(/[^0-9]/g, '');
            const price = parseInt(priceText) || 0;
            const sizeText = card.querySelector(".detail-item:nth-child(1) dd").innerText.replace(/[^0-9]/g, '');
            const size = parseInt(sizeText) || 0;
            const tags = Array.from(card.querySelectorAll(".tags .tag")).map(tag => tag.innerText.trim());

            let typeMatch = selectedTypes.length === 0 || selectedTypes.includes(type);
            let priceMatch = (minPrice === null && maxPrice === null) || 
                             (minPrice !== null && price >= minPrice) && 
                             (maxPrice !== null && price <= maxPrice);
            let sizeMatch = selectedSizes.length === 0 || selectedSizes.some(sizeOption => {
                if (sizeOption.includes("이하")) return size <= 20;
                if (sizeOption.includes("20-30")) return size > 20 && size <= 30;
                if (sizeOption.includes("30-40")) return size > 30 && size <= 40;
                if (sizeOption.includes("40 이상")) return size > 40;
                return false;
            });

            let optionsMatch = selectedOptions.length === 0 || selectedOptions.every(option => tags.includes(option));

            return typeMatch && priceMatch && sizeMatch && optionsMatch;
        });

        // 정렬 적용
        sortProperties(filteredProperties);
    }

    function sortProperties(properties) {
        const sortOption = sortSelect.value;

        if (sortOption === "가격 높은순") {
            properties.sort((a, b) => {
                let priceA = parseInt(a.querySelector(".property-price").innerText.replace(/[^0-9]/g, '')) || 0;
                let priceB = parseInt(b.querySelector(".property-price").innerText.replace(/[^0-9]/g, '')) || 0;
                return priceB - priceA;
            });
        } else if (sortOption === "가격 낮은순") {
            properties.sort((a, b) => {
                let priceA = parseInt(a.querySelector(".property-price").innerText.replace(/[^0-9]/g, '')) || 0;
                let priceB = parseInt(b.querySelector(".property-price").innerText.replace(/[^0-9]/g, '')) || 0;
                return priceA - priceB;
            });
        }

        // 정렬된 매물 다시 추가
        propertyGrid.innerHTML = "";
        properties.forEach(property => propertyGrid.appendChild(property));
    }

    // 이벤트 리스너 추가
    searchButton.addEventListener("click", filterProperties);
    sortSelect.addEventListener("change", () => {
        sortProperties(Array.from(document.querySelectorAll(".property-card")));
    });
});