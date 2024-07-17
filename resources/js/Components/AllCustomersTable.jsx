import React, { useState } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Tooltip, useDisclosure} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import EditCustomerModal from './EditCustomerModal';
import ViewCustomerModal from './ViewCustomerModal';

export default function AllCustomersTable({customers, onPageChange, auth}) {
    const { delete: destroy, processing, errors } = useForm();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { isOpen: isEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
    const { isOpen: isViewOpen, onOpenChange: onViewOpenChange } = useDisclosure();
    const [ selectedCustomer, setSelectedCustomer ] = useState(null);
    const handleDeleteCustomer = (id) => {
        Swal.fire({
            icon: "warning",
			title: "Are you sure you want to delete this User?",
			showCancelButton: true,
			confirmButtonText: 'Yes'
		}).then(function(res){
            if(res.isConfirmed){

                destroy(route('customer.destroy', id), {
                    onSuccess: (response) => {
                        const message = response.props.flash.message;
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text:  message,
                        });
                         // Check if current page is now empty
                         if (customers.data.length === 1 && customers.current_page > 1) {
                            // Navigate to the previous page
                            onPageChange(customers.current_page - 1);
                        }
                    }
                })
            }
        });
    }

    const handleEditCustomer = (customer) => {
        setSelectedCustomer(customer);
        
        onEditOpenChange(true);
    }
    const handleViewCustomer = (customer) => {
        setSelectedCustomer(customer);
        
        onViewOpenChange(true);
    }
    return (
        <>
            <Table aria-label='all-customers-table-header'
                isStriped
                radius = 'none'
                bottomContent = {
                    customers.data.length > 0 && (
                        <div className="flex w-full justify-center">
                            <Pagination 
                                total={customers.last_page}
                                initialPage={customers.current_page}
                                onChange={onPageChange}
                                showControls
                                color="secondary"
                                classNames={{
                                    cursor: "bg-indigo-500"
                                }}
                            />
                        </div>
                    )
                }
            >
            <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>FIRST NAME</TableColumn>
                <TableColumn>LAST NAME</TableColumn>
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>CONTACT NUMBER</TableColumn>
                <TableColumn className="flex items-center justify-center">ACTION</TableColumn>
            </TableHeader>
               {
                customers.data.length == 0 
                ?
                <TableBody emptyContent={"No Users to display."}>{[]}</TableBody>
                :
                <TableBody>
                   { customers.data.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.first_name}</TableCell>
                        <TableCell>{customer.last_name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.contact_number}</TableCell>
                        <TableCell className="flex items-center justify-center gap-1">
                            
                            <Tooltip color="primary" content="View Customer" className="text-white"> 
                            
                            <Button className="text-white bg-primary-500 hover:bg-primary-600" isIconOnly onPress={() => handleViewCustomer(customer)}>
                            <FontAwesomeIcon icon={faEye} />
                            </Button>
                            </Tooltip>
                            <Tooltip color="success" content="Edit Customer" className="text-white"> 
                            
                            <Button className="text-white bg-success-500 hover:bg-success-600" isIconOnly onPress={() => handleEditCustomer(customer)}>
                            <FontAwesomeIcon icon={faPen} /> 
                            </Button>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete Customer">

                            <Button className="text-white bg-danger-500 hover:bg-danger-600" isIconOnly onPress={() => handleDeleteCustomer(customer.id)}>
                            <FontAwesomeIcon icon={faTrash} /> 
                            </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                   ))}
                </TableBody>
               }

            </Table>
            {selectedCustomer && (
                <>
                <EditCustomerModal
                    isOpen={isEditOpen}
                    onOpenChange={onEditOpenChange}
                    initialData={selectedCustomer}
                    customerId={selectedCustomer.id}
                />
                <ViewCustomerModal
                    isOpen={isViewOpen}
                    onOpenChange={onViewOpenChange}
                    initialData={selectedCustomer}
                    customerId={selectedCustomer.id}
                />
                </>
            )}
        </>
    )
}