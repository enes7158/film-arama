"use client";

import React from "react";

interface CategoriesDropdownProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
}) => (
    <select
    onChange={onCategoryChange}
    value={selectedCategory}
    className="bg-transparent text-white px-4 py-2 rounded-lg focus:outline-none"
    >
        <option value="">Kategori Seç</option>
        {categories.map((category) => (
            <option key={category} value={category}>
                {category}
            </option>
        ))}
    </select>
)

export default CategoriesDropdown;