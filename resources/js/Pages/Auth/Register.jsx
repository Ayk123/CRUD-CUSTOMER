import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        label = "Name"
                        classNames = {{
                            inputWrapper: "group-data-[focus=true]:border-indigo-400"
                        }}
                        onChange={(e) => setData('name', e.target.value)}
                        // required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                   

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        label = "Email"
                        classNames = {{
                            inputWrapper: "group-data-[focus=true]:border-indigo-400"
                        }}
                        onChange={(e) => setData('email', e.target.value)}
                        // required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        label = "Password"
                        classNames = {{
                            inputWrapper: "group-data-[focus=true]:border-indigo-400"
                        }}
                        onChange={(e) => setData('password', e.target.value)}
                        // required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                   

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        label = "Confirm Password"
                        classNames = {{
                            inputWrapper: "group-data-[focus=true]:border-indigo-400"
                        }}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        // required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}