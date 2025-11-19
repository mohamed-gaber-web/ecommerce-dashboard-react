export interface IProduct {
    _id?: string;
    title: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    discount: number;
    stock: number;
    categoryId: number | string;
    brandId: number | string;
    isFeatured: boolean;
}