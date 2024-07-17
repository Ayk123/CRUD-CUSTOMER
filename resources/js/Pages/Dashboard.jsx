import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Card, CardHeader, Divider, useDisclosure } from '@nextui-org/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AddCustomerModal from '@/Components/AddCustomerModal';
import AllCustomersTable from '@/Components/AllCustomersTable';

export default function Dashboard({ auth, customers }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const handlePageChange = (page) => {
        router.visit(route('dashboard', {page}));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customer Page</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> */}
                       <Card>
                            <CardHeader className='flex justify-between'>
                                <div className='flex items-center'>
                                <p className='text-md'>Customer Table</p>
                                </div>
                                <PrimaryButton onClick={onOpen}>Add Customer</PrimaryButton>
                            </CardHeader>
                            <Divider />
                            <AllCustomersTable auth={auth} customers={customers} onPageChange={handlePageChange}/>
                       </Card>
                    {/* </div> */}
                </div>
            </div>
            <AddCustomerModal isOpen={isOpen} onOpenChange={onOpenChange} auth={auth}/>
        </AuthenticatedLayout>
    );
}
