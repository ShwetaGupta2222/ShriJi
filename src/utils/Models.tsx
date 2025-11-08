export interface EmptyProps { }

export enum FoodCategoryEnums {
    PIZZA = 'Pizza',
    BURGERS = 'Burgers',
    DRINKS = 'Drinks',
    PATTIES = 'Patties'
}

export interface FoodTag {
    id: string,
    name: string;
    bgColor?: string | null
}

export interface Item {
  id: string;
  position: number;
}

export interface FoodItem extends Item{
    category: string;
    name: string;
    description?: string | null;
    price: number;
    likes?: number | null;
    tag?: string | null;
    imgUrl?: string | null;
    available?: boolean | null;
    availableFrom?: string;
    availableTo?: string;
}

export interface FoodFormErrors {
    category?: string;
    name?: string;
    description?: string;
    price?: string;
    likes?: string;
    tag?: string;
    position?: string;
    imgUrl?: string;
}

export interface CategoryOption {
    id: string,
    name: string;
    logoUrl?: string | null;
    position?: number | null;
}

export interface CategoryFormErrors {
    name?: string;
    logoUrl?: string;
    position?: string;
}

export interface SliderDetails extends Item {
    name?: string | null;
    iconUrl: string;
}

export interface SliderFormErrors {
    name?: string;
    logoUrl?: string;
}

export enum OperationStatus {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE'
}

export interface OperationResult {
    status: OperationStatus;
    message: string;
    newId?: string;
}

export interface LoginFormData {
    userId: string;
    password: string;
}

export interface LoginFormErrors {
    userId?: string;
    password?: string;
}

export enum OrderType {
    DINING = 'Dining',
    ONLINE_ORDER = 'Online Order',
    TAKE_AWAY = 'Take Away'
}

export enum AdminRoles {
    ADD_NEW_FOOD_ITEM = '➕ New Item',
    ADD_NEW_CATEGORY = '➕ New Category',
    EDIT_FOOD_ITEM = '✏️ Edit Item',
    EDIT_SLIDERS = '✏️ Edit Sliders'
}
