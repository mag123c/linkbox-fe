import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/axios-client';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/auth/login/callback`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('로그인 완료, 이동할 URL:', data.redirectUrl);
                navigate(data.redirectUrl);
            })
            .catch((err) => console.error('로그인 오류:', err));
    }, []);

    return <div>로그인 중...</div>;
};

export default AuthCallback;
