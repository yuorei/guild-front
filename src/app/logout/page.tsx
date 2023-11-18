'use client';
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Logout() {
    const [cookies, , removeCookie] = useCookies(["token", "userID"]);

    useEffect(() => {
        // useEffect for performing side effects (like redirect) after component mounts
        removeCookie("token");
        removeCookie("userID");
        // Redirect to the login page
        window.location.href = '/login';
    }, [removeCookie]); // Empty dependency array ensures useEffect runs once after the component mounts

    return <a href="/login">Move to login</a>;
};
