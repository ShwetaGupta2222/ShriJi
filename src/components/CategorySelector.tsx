import React, { useEffect } from 'react';
import type { CategoryOption } from '../utils/Models';
import { useFoodGridData } from '../context/FoodGridContext';
import { useData } from '../context/DataContext';
import { DEFAULT_FOOD_CATEGORY_LOGO } from '../utils/Constants';

interface CategorySelectorProps {}
const CategorySelector: React.FC<CategorySelectorProps> = ({}) => {
    const { categories } = useData();
    const { activeCategory, setActiveCategory } = useFoodGridData();
    const categoryData: CategoryOption[] = categories;
    useEffect(() => { setActiveCategory(categoryData[0].name) }, [])
    const handleCategoryClick = (categoryName: string) => { setActiveCategory(categoryName); };

    return (
        <div className={`w-full lg:w-fit mx-auto bg-white shadow-md md:rounded-[12px] md:px-4 z-4`}>
            <div className="flex overflow-x-scroll hide-x-scrollbar md:gap-4 lg:gap-8 z-4">
                {categoryData.map((category) => {
                    const isActive = activeCategory === category.name;
                    return (
                        <div key={category.id} className='md:min-w-[120px] min-w-[90px] max-w-[140px] flex flex-col'>
                            <div key={category.name} onClick={() => handleCategoryClick(category.name)} className={`flex flex-col items-center flex-shrink-0 cursor-pointer group py-2 px-4 ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 group-hover:text-gray-700'}`} >
                                <div className={`p-1 rounded-full transition-colors }`} >
                                    {category.logoUrl
                                        ? <img
                                            className="h-[18px] w-[18px] md:h-[36px] md:w-[36px] object-cover"
                                            src={category.logoUrl} alt=" "
                                            onError={
                                                (e) => {
                                                    if (e.currentTarget.src !== DEFAULT_FOOD_CATEGORY_LOGO) {
                                                        e.currentTarget.src = DEFAULT_FOOD_CATEGORY_LOGO;
                                                    }
                                                }
                                            } />
                                        : <img className="h-[18px] w-[18px] md:h-[36px] md:w-[36px] object-cover" src={DEFAULT_FOOD_CATEGORY_LOGO} alt="default" />
                                    }
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className={`text-[11px] md:text-[15px] md:mb-2 font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>
                                        {category.name}
                                    </span>
                                </div>
                            </div>
                            <div className={`h-[3px] w-full transition-all duration-300 ${isActive ? 'bg-black' : 'bg-transparent'}`}></div>
                        </div>
                    );
                })}
            </div >
        </div >
    )
}

export default CategorySelector;