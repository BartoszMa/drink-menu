import React from "react";
import {useFormik} from 'formik';

const AddCommentForm = ({id}) => {
    const formik = useFormik({
        initialValues: {
            nickname: '',
            comment: '',
        },
        validate: values => {
            const errors = {};
            if (!values.nickname) {
                errors.nickname = 'Required';
            }
            if (!values.comment) {
                errors.comment = 'Required';
            }
            return errors;
        },
        onSubmit: async (values, {setSubmitting}) => {
            formik.resetForm({
                values: {nickname: '', comment: ''},
            });

            try {
                await fetch(`http://localhost:4200/${id}/comments/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        nickname: values.nickname,
                        text: values.comment
                    })
                });
            } catch (error) {
                console.log("error", error);
            }

            setSubmitting(false);
        },
    });

    return (
        <form className={"w-full max-w-sm mx-auto"} onSubmit={formik.handleSubmit}>
            <label className={"block text-gray-500 font-bold"} htmlFor="nickname">Nickname:</label>
            <input
                className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                id="nickname"
                name="nickname"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nickname}
            />
            {formik.errors.nickname ?
                <div className={"block text-red-500 font-bold"}>{formik.errors.nickname}</div> : null}
            <label className={"block text-gray-500 font-bold"} htmlFor="comment">Comment:</label>
            <input
                className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                id="comment"
                name="comment"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.comment}
            />
            {formik.errors.comment ?
                <div className={"block text-red-500 font-bold"}>{formik.errors.comment}</div> : null}
            <button
                className={"flex mx-auto my-auto shadow bg-gray-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}
                type="submit">Submit
            </button>

        </form>);
}

export default AddCommentForm


