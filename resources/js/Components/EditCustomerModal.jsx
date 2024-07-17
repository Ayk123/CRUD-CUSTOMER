import React, { useEffect } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import { useForm } from '@inertiajs/react';
import TextInput from "./TextInput";
import InputError from "./InputError";
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from "sweetalert2";

export default function EditCustomerModal({isOpen, onOpenChange, auth, initialData, customerId}) {
        const {data, setData, put, processing, errors, reset, setError} = useForm({
            first_name: initialData.first_name,
            last_name: initialData.last_name,
            email: initialData.email,
            contact_number: initialData.contact_number,
        });

        useEffect(() => {
            if(isOpen) {
                
                setData({
                    first_name:initialData.first_name,
                    last_name:initialData.last_name,
                    email:initialData.email,
                    contact_number:initialData.contact_number,
                    
                });
            } else {
                reset();
                Object.keys(errors).forEach(key => setError(key, ''));
            }
        }, [isOpen, initialData]);

        const submitEditCustomer = (e) => {
            e.preventDefault();
            put(route('customer.update', customerId), {
                onSuccess: (response) => {
                    const message = response.props.flash.message;
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: message,
                    });
                  
                }
            });
        }
        
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" aria-labelledby="edit-customer-modal-title">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader id="edit-customer-modal-title" className="flex flex-col gap-1">Edit Customer</ModalHeader>
                    
                    <ModalBody>
                    <form>
                        <div>
                            <TextInput
                                id="first_name"
                                name="first_name"
                                value={data.first_name}
                                label="First Name"
                                classNames= {{
                                    inputWrapper: "group-data-[focus=true]:border-indigo-400"
                                }}
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.first_name} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <TextInput
                                id="last_name"
                                name="last_name"
                                value={data.last_name}
                                label="Last Name"
                                classNames= {{
                                    inputWrapper: "group-data-[focus=true]:border-indigo-400"
                                }}
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                            />
                            <InputError message={errors.last_name} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                label="Email"
                                classNames= {{
                                    inputWrapper: "group-data-[focus=true]:border-indigo-400"
                                }}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <TextInput
                                id="contact_number"
                                name="contact_number"
                                value={data.contact_number}
                                label="Contact Number"
                                classNames= {{
                                    inputWrapper: "group-data-[focus=true]:border-indigo-400"
                                }}
                                onChange={(e) => setData('contact_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.contact_number} className="mt-2"/>
                        </div>
                    </form>
                    </ModalBody>
                    <ModalFooter>
                        <PrimaryButton disabled={processing} onClick={submitEditCustomer}>Submit</PrimaryButton>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>

        </Modal>
    )
}