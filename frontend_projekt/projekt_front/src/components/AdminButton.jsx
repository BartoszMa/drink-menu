import {useDispatch} from 'react-redux';
import {login, logout} from '../actions/adminActions';
import React from 'react';
import {useSelector} from 'react-redux';

export default function AdminButton() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);

    function handleClick() {
        dispatch(login());
    }

    function handleLogoutClick() {
        dispatch(logout());
    }

    return (
        <div className="mx-auto object-center">
            {isLoggedIn ? (
                <button className={"m-1 shadow bg-gray-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"} onClick={handleLogoutClick}>
                    Administrator Panel Off
                </button>
            ) : (
                <button className={"m-1 shadow bg-gray-600 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"} onClick={handleClick}>
                    Administrator Panel On
                </button>
            )}
        </div>
    );
}
