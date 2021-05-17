import React, { useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import Background from '../components/background/Background';
import Navbar from '../components/navbar/Navbar';
import GroupedModals from '../components/modals/GroupedModals';
import { useDispatch, Provider } from 'react-redux';
import store from '../redux/store';
import { SET_TOKEN } from '../redux/actions/Auth';

function Index({ Component, pageProps }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
console.log(token);
        dispatch({ type: SET_TOKEN, payload: { token: token } });
    }, []);

    return (
        <>
        <Head>
            <title>RSTransfer</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </Head>
        <Navbar />
        <Background />
        <GroupedModals />
        <Component {...pageProps} />
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
        </>
    )
}

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Index
                Component={Component}
                pageProps={pageProps}
            />
        </Provider>
    );
}

export default MyApp