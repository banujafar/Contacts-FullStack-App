import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface MyFormValues {
    id: string;
    fullname: string;
    job: string;
    email: string;
    phone: string;
    img: string;
}

interface IProps {
    editedContact?: MyFormValues | undefined;
    onSend: (values: MyFormValues) => void
}

export const AddContact = ({ editedContact, onSend }: IProps) => {
    const [initialValues, setInitialValues] = useState<MyFormValues>(editedContact || {
        id: uuidv4(),
        fullname: '',
        job: '',
        email: '',
        phone: '',
        img: ''
    });

    useEffect(() => {
        if (editedContact) {
            setInitialValues(editedContact)
        }
        else {
            setInitialValues(
                {
                    id: uuidv4(),
                    fullname: '',
                    job: '',
                    email: '',
                    phone: '',
                    img: ''
                }
            )
        }
        console.log(initialValues)

    }, [editedContact]);



    return (
        <div className="w-2/3 bg-white p-4 flex justify-center items-center">
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    onSend(values);



                }}
            >
                {() => (
                    <Form className="flex flex-col pl-4 gap-2 justify-center w-full">
                        <label htmlFor="fullname">Full Name</label>
                        <Field
                            type="text"
                            id="fullname"
                            name="fullname"
                            placeholder="Full Name"
                            className="border-b-border-bottom border-b-2"
                        />
                        <label htmlFor="job">Job</label>
                        <Field
                            type="text"
                            id="job"
                            name="job"
                            placeholder="Job"
                            className="border-b-border-bottom border-b-2"
                        />
                        <label htmlFor="email">Email</label>
                        <Field
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="border-b-border-bottom border-b-2"
                        />
                        <label htmlFor="phone">Phone</label>
                        <Field
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            className="border-b-border-bottom border-b-2"
                        />
                        <button
                            type="submit"
                            className="rounded bg-blue-500 border-none outline-none p-2 mt-4 text-white text-xl"
                        >
                            {editedContact ? 'Edit Contact' : 'Add Contact'}
                        </button>
                    </Form>
                )}
            </Formik>

        </div>
    );
};
