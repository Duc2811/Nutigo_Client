import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../store/reducer/userReducer';
import { message } from 'antd';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleGoogleCallback = () => {
            try {
                const params = new URLSearchParams(location.search);
                const token = params.get('token');
                const userData = JSON.parse(decodeURIComponent(params.get('user')));
                const error = params.get('error');

                if (error) {
                    message.error('Đăng nhập thất bại: ' + error);
                    navigate('/login');
                    return;
                }

                if (token && userData) {
                    // Lưu token vào localStorage
                    localStorage.setItem('token', token);
                    
                    // Dispatch action để lưu thông tin user vào Redux store
                    dispatch(doLogin({
                        _id: userData.id,
                        token: token,
                        role: userData.role,
                        userName: userData.userName,
                        email: userData.email,
                        avatar: userData.avatar
                    }));

                    message.success('Đăng nhập thành công!');
                    navigate('/');
                } else {
                    throw new Error('Không nhận được dữ liệu người dùng');
                }
            } catch (error) {
                console.error('Error processing Google login:', error);
                message.error('Đăng nhập thất bại: ' + error.message);
                navigate('/login');
            }
        };

        handleGoogleCallback();
    }, [location, navigate, dispatch]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <div>Đang xử lý đăng nhập...</div>
        </div>
    );
};

export default GoogleCallback;