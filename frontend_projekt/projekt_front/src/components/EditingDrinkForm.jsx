import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';

const EditDrinkForm = (drink) => {

        const formik = useFormik({
                initialValues: {
                    name: drink.name || '',
                    type: drink.type || '',
                    glass: drink.glass || '',
                    img: drink.img || '',
                    ingredients: drink.ingredients || '',
                    instructions: drink.instructions || '',
                },
                validate: (values) => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.type) {
                        errors.type = 'Required';
                    }
                    if (!values.glass) {
                        errors.glass = 'Required';
                    }
                    if (!values.img) {
                        errors.img = 'Required';
                    }
                    if (!values.ingredients) {
                        errors.ingredients = 'Required';
                    }
                    if (!values.instructions) {
                        errors.instructions = 'Required';
                    }
                    return errors;
                },
                onSubmit: async (values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);

                    try {
                        await fetch(`http://localhost:4200/${drink.drink[0]._fields[0].elementId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                id: drink.drink[0]._fields[0].elementId,
                                name: values.name,
                                type: values.type,
                                glass: values.glass,
                                img: values.img,
                                ingredients: values.ingredients,
                                instructions: values.instructions
                            })
                        });
                        resetForm({values: {name: '', type: '', glass: '', img: '', ingredients: '', instructions: ''}});
                    } catch (error) {
                        console.log("error", error);
                    }


                    setSubmitting(false);

                },
            }
        )



        return (
            <form className={"w-full max-w-sm mx-auto"} onSubmit={formik.handleSubmit}>
                <label className={"block text-gray-500 font-bold"} htmlFor="name">Name</label>
                <input
                    className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name ? <div className={"block text-red-500 font-bold"}>{formik.errors.name}</div> : null}
                <label className={"block text-gray-500 font-bold"} htmlFor="type">Type</label>
                <select
                    className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                    id="type"
                    name="type"
                    onChange={formik.handleChange}
                    value={formik.values.type}
                >
                    <option value="">Choose</option>
                    <option value="Alcoholic">Alcoholic</option>
                    <option value="Non-alcoholic">Non-alcoholic</option>
                </select>
                {formik.errors.type ? <div className={"block text-red-500 font-bold"}>{formik.errors.type}</div> : null}
                <label className={"block text-gray-500 font-bold"} htmlFor="glass">Glass</label>
                <input
                    className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                    id="glass"
                    name="glass"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.glass}
                />
                {formik.errors.glass ? <div className={"block text-red-500 font-bold"}>{formik.errors.glass}</div> : null}
                <label className={"block text-gray-500 font-bold"} htmlFor="img">Image</label>
                <input
                    className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                    id="img"
                    name="img"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.img}
                />
                {formik.errors.img ? <div className={"block text-red-500 font-bold"}>{formik.errors.img}</div> : null}
                <label className={"block text-gray-500 font-bold"} htmlFor="ingredients">Ingredients</label>
                <textarea
                    className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                    id="ingredients"
                    name="ingredients"
                    onChange={formik.handleChange}
                    value={formik.values.ingredients}
                />
                {formik.errors.ingredients ? (
                    <div className={"block text-red-500 font-bold"}>{formik.errors.ingredients}</div>
                ) : null}
                <label className={"block text-gray-500 font-bold"} htmlFor="instructions">Instructions</label>
                <textarea
                    className={"bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"}
                    id="instructions"
                    name="instructions"
                    onChange={formik.handleChange}
                    value={formik.values.instructions}
                />
                {formik.errors.instructions ? (
                    <div className={"block text-red-500 font-bold"}>{formik.errors.instructions}</div>
                ) : null}
                <button
                    className={"flex mx-auto justify-center items-center m-1 shadow bg-gray-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"}
                    disabled={formik.isSubmitting} type="submit">Edit Drink
                </button>
            </form>
        );
    }
;

export default EditDrinkForm;