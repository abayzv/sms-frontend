import { Transition } from '@headlessui/react'
import Input from './form/input'
import Select from './form/select'

interface DataForm {
    name: string,
    type: string,
    label: string,
    defaultValue: string | number,
    url?: string
}

export default function SideModal({ title, action, isShow, setShow, data, setData, error, isLoading }: { title: string, action: Function, isShow: boolean, setShow: Function, data: any, setData: Function, error: Array<{type?: string, msg?: string, path?: string, location?: string, value?:string}>, isLoading: boolean }) {

    const dataForm = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            defaultValue: ''
        },
        {
            name: 'email',
            type: 'text',
            label: 'Email',
            defaultValue: ''
        },
        {
            name: 'password',
            type: 'password',
            label: 'Password',
            defaultValue: ''
        },
        {
            name: 'confirmPassword',
            type: 'password',
            label: 'Confirm Password',
            defaultValue: ''
        },
        {
            name: 'roleId',
            type: 'select',
            label: 'Role',
            defaultValue: '',
            url: '/list/roles'
        },
    ]

    const renderError = (path: string) => {
        const errorMssg = error.find((item : any) => item.path.toLowerCase() === path.toLowerCase())
        if(errorMssg) return <p className="text-red-500 text-sm mt-2">{errorMssg.msg}</p>
        return null
    }

    const fieldHaveError = (path: string) => {
        const errorMssg = error.find((item : any) => item.path.toLowerCase() === path.toLowerCase())
        if(errorMssg) return true
        return false
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const renderForm = () => {
        return dataForm.map((item, index) => {

            if(item.type === 'text' || item.type === 'password' || item.type === 'number')
            return (
                <div key={index} >
                    <Input type={item.type} name={item.name} label={item.label} defaultValue={item.defaultValue} onChange={handleInputChange} isError={fieldHaveError(item.name)}/>
                    <span>{renderError(item.name)}</span>
                </div>
            )

            if(item.type === 'select')
            return (
                <div key={index}>
                    <Select name={item.name} label={item.label} defaultValue={item.defaultValue} url={item.url || ""} onChange={handleSelectChange} isError={fieldHaveError(item.name)}/>
                    <span>{renderError(item.name)}</span>
                </div>
            )

        })
    }

    return (
        <Transition
            show={isShow}
        >
            <div className="fixed w-screen h-screen top-0 left-0 bg-black z-50 bg-opacity-20">
                <Transition.Child
                    enter="transition duration-300 ease-in-out"
                    enterFrom="transform opacity-0 translate-x-full"
                    enterTo="transform opacity-100 translate-x-0"
                    leave="transition duration-100 ease-in-out"
                    leaveFrom="transform opacity-100 translate-x-0"
                    leaveTo="transform opacity-0 translate-x-full"
                >
                    <div className="fixed top-0 right-0 bg-white h-screen w-[400px] flex flex-col gap-2">
                        <div className='bg-primary-500 p-5 text-white text-center text-lg'>{title}</div>
                        <div className='p-5 overflow-y-auto'>
                            {/* Start Form */}
                            <div className='grid gap-3'>
                                {renderForm()}
                            </div>
                            {/* End Form */}
                        </div>
                        <div className='mt-auto p-5 grid gap-3'>
                            <button className="block p-3 bg-primary-500 text-white w-full rounded-md disabled:bg-gray-500" onClick={() => action()} disabled={isLoading}>Submit</button>
                            <button className="block p-3 bg-red-500 text-white w-full rounded-md disabled:bg-gray-500" onClick={() => setShow(false)} disabled={isLoading}>Cancel</button>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>
    )

}