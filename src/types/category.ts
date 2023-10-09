export interface ICategories {
    name: string;
    slug: string;
}

export interface ICategoriesProps { storeId: string, setCategory: (slug: string) => void }
