import { useRouter } from 'next/router'
import useAxios from '@/lib/useAxios'
import swr from 'swr'
import FormHook from '../../components/form-hook'
import Card from '../../components/card'
import { Button } from '../../components/button'
import { AiOutlineEye, AiTwotoneFire } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { MdDiscount } from 'react-icons/md'

ProductDetails.auth = {}

export default function ProductDetails() {
    const axiosAuth = useAxios()

    const router = useRouter()
    const { id } = router.query
    const fetcher = (url: string) => axiosAuth.get(url).then(res => res.data)

    const { data, error } = swr(`/products/${id}`, fetcher)

    if (error) return <div>Error</div>

    if (data)
        return (
            <div>
                <div className='mb-5'>
                    <Card className='flex items-center gap-3'>
                        <h1 className='text-lg font-semibold text-gray-600'>
                            {data.data.name}
                        </h1>
                        <Button className='flex items-center gap-3 ml-auto' title='Show Live Product'>
                            <AiOutlineEye size={20} />
                        </Button>
                        <Button className='flex items-center gap-3' title='Delete Product' color='danger'>
                            <BiTrash size={20} />
                        </Button>
                    </Card>
                </div>
                <div className='flex gap-5'>
                    <div className='w-1/3'>
                        <Card>
                            <img src={data.data.media_url} alt="" />
                            <Button className='w-full bg-primary-500 mt-5'>Pilih Foto</Button>
                        </Card>
                    </div>
                    <div className='w-2/3'>
                        <Card>
                            <div className='flex justify-end my-3 gap-3'>
                                <Button className='bg-purple-500 flex items-center gap-3' color='purple'><AiTwotoneFire size={20} /> Jadikan Product Populer</Button>
                                <Button className='bg-green-500 flex items-center gap-3' color='warning'><MdDiscount size={20} /> Promosi</Button>
                            </div>
                            <FormHook
                                data={[
                                    {
                                        name: "name",
                                        type: "text",
                                        defaultValue: data.data.name,
                                        title: "Name",
                                    },
                                    {
                                        name: "price",
                                        type: "number",
                                        defaultValue: data.data.price,
                                        title: "Price",
                                    },
                                    {
                                        name: "category",
                                        type: "text",
                                        defaultValue: data.data.category,
                                        title: "Category",
                                    },
                                    {
                                        name: "description",
                                        type: "text",
                                        defaultValue: data.data.description,
                                        title: "Description",
                                    },
                                ]}
                                onSubmit={async (data) => {
                                    console.log(data)
                                }}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        )
}