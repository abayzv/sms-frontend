import Card from "../../../components/card";
import Layout from "../../../components/layout/main";
import FormHook from "../../../components/form-hook";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICategories, ICategoriesProps } from "@/types/category";
import { IProducts, IProductsProps } from "@/types/product";
import { IFormInput } from "@/types/form";
import { IPlatforms, IPlatformsProps } from "@/types/platforms";


const Categories = ({ storeId, setCategory }: ICategoriesProps) => {
    const [timer, setTimer] = useState<any>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<ICategories[]>([])

    const fetchCategories = async () => {
        setIsLoading(true)
        setError(false)
        axios.get(`https://api-tokopedia.mahesadev.com/categories/${storeId}`).then((res) => {
            setData(res.data.data)
        }).catch((error) => {
            setError(true)
        }).finally(() => {
            setIsLoading(false)
        })
    };

    const renderTimer = () => {
        return (
            <div className="text-slate-400 text-sm mb-5">
                <span>Next request in {timer} seconds</span>
            </div>
        )
    }

    const handleSetCategory = (slug: string) => {
        if (timer > 0) return

        setCategory(slug)
        setTimer(15)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer - 1)
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        fetchCategories()
    }, [storeId])

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error</div>

    return (
        <Card title="Categories">
            <div>
                {timer > 0 && renderTimer()}
                <ul className="flex gap-3 flex-wrap">
                    {data.map((item, index) => {
                        return (
                            <button key={index} onClick={() => handleSetCategory(item.slug)} className="bg-primary-50 text-primary-500 border border-primary-500 p-2 px-5 rounded-xl hover:bg-opacity-50">
                                {item.name}
                            </button>
                        )
                    })}
                </ul>
            </div>
        </Card>
    )
}

const Products = ({ storeId, categorySlug }: IProductsProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<IProducts[]>([])
    const [selectedProducts, setSelectedProducts] = useState<IProducts[]>([])

    const fetchProducts = async () => {
        setIsLoading(true)
        setError(false)
        axios.get(`https://api-tokopedia.mahesadev.com/products/${storeId}/${categorySlug}`).then((res) => {
            setSelectedProducts([])
            setData(res.data.data)
        }).catch((error) => {
            setError(true)
        }).finally(() => {
            setIsLoading(false)
        })
    };

    const handleSelectProduct = (product: IProducts) => {
        const findProduct = selectedProducts.find(item => item.name === product.name)

        if (findProduct) {
            const filterProduct = selectedProducts.filter(item => item.name !== product.name)
            setSelectedProducts(filterProduct)
        } else {
            setSelectedProducts([...selectedProducts, product])
        }
    }

    const isProductSelected = (product: IProducts) => {
        const findProduct = selectedProducts.find(item => item.name === product.name)

        if (findProduct) {
            return "border-primary-500 bg-primary-50 text-primary-500"
        } else {
            return "border-slate-300 bg-slate-50"
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [categorySlug])

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error</div>

    return (
        <Card title="Products">
            <div>
                <ul className="grid grid-cols-5 gap-3">
                    {data.map((item, index) => {
                        return (
                            <li key={index} onClick={() => handleSelectProduct(item)} className={`cursor-pointer p-5 border rounded-xl ${isProductSelected(item)} hover:bg-opacity-50`}>
                                <div className="flex items-center gap-3">
                                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" />
                                    <div>
                                        <div className="font-semibold text-slate-700">{item.name}</div>
                                        <div className="text-slate-400">Rp {item.price}</div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="mt-5 text-end">
                <button className="bg-primary-500 text-white p-3 px-5 rounded-xl hover:bg-opacity-80">
                    + Import {selectedProducts.length} Products
                </button>
            </div>
        </Card>
    )

}

const Platforms = ({ data, onSelect, selectedPlatform }: IPlatformsProps) => {
    const isSelected = (index: number) => {
        if (index === selectedPlatform) {
            return "border-primary-500 bg-primary-50 text-primary-500"
        } else {
            return "border-slate-300 bg-slate-50 grayscale"
        }
    }

    return (
        <div className="p-2">
            <p className="text-slate-600">Select Platform</p>
            <div className="grid grid-cols-3 gap-2 my-2">
                {data.map((item, index) => {
                    return (
                        <button key={index} title={item.name} disabled={item.disabled} onClick={() => onSelect(index)} className={`cursor-pointer flex items-center justify-center rounded-xl p-5 border disabled:grayscale ${isSelected(index)}`}>
                            <img src={item.image} className="w-14 h-14 object-contain" />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}


export default function ScrapeTokopedia() {
    const [storeId, setStoreId] = useState<string>("")
    const [categorySlug, setCategorySlug] = useState<string>("")
    const [selectedPlatform, setSelectedPlatform] = useState<number>(0)

    const platforms: IPlatforms[] = [
        {
            name: "Tokopedia",
            image: "https://4.bp.blogspot.com/-VGr7kKhpibQ/YYtxvLOGH8I/AAAAAAAASvs/60b31jcrE9IuQZJ6KIjMNdO1ym7fezInACLcBGAsYHQ/s256/logo%2Blogo%2Btokopedia%2Bputih.png"
        },
        {
            name: "Shopee",
            image: "https://4.bp.blogspot.com/-ZfTcHpuYnws/YYzYspsZlgI/AAAAAAAASx0/uo-2qi4dvwsdNM8T8UbV1YRl2mU4udlqACLcBGAsYHQ/s256/mentahan%2Blogo%2Bshopee.png",
        },
        {
            name: "Google Sheet",
            image: "https://cdn-icons-png.flaticon.com/256/2965/2965327.png",
        }
    ]

    const onSubmit = async (data: IFormInput) => {
        setStoreId(data.storeId)
    };

    const handleSelectPlatform = (index: number) => {
        setSelectedPlatform(index)
    }

    const renderTokoPediaForm = () => {
        return (
            <FormHook data={[
                {
                    name: "storeId",
                    type: "text",
                    placeholder: "Enter Store ID from Tokopedia",
                    description: "Store ID from Tokopedia, example: https://www.tokopedia.com/rexusId, then brandId is rexusId"
                }
            ]} onSubmit={onSubmit} />
        )
    }

    const renderShopeeForm = () => {
        return (
            <FormHook data={[
                {
                    name: "storeId",
                    type: "text",
                    placeholder: "Enter Store ID from Shopee",
                    description: "Store ID from Shopee, example: https://shopee.co.id/logitech, then brandId is logitech"
                }
            ]} onSubmit={onSubmit} />
        )
    }

    const renderGoogleSheetForm = () => {
        return (
            <FormHook data={[
                {
                    name: "sheetId",
                    type: "file",
                    description: "Allowed file types .csv, .xls, .xlsx"
                }
            ]} onSubmit={onSubmit} />
        )
    }

    return (
        <Layout>
            <div className="grid grid-cols-2 gap-5">
                <Card title="Imports Product">
                    <Platforms data={platforms} selectedPlatform={selectedPlatform} onSelect={(index) => handleSelectPlatform(index)} />
                    {selectedPlatform === 0 && renderTokoPediaForm()}
                    {selectedPlatform === 1 && renderShopeeForm()}
                    {selectedPlatform === 2 && renderGoogleSheetForm()}
                </Card>

                {storeId && <Categories storeId={storeId} setCategory={(slug) => setCategorySlug(slug)} />}
            </div>
            <div className="mt-5">
                {categorySlug && <Products categorySlug={categorySlug} storeId={storeId} />}
            </div>
        </Layout>
    )
}