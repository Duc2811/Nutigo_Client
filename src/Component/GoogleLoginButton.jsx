    import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        // Chuyển hướng đến endpoint Google OAuth
        window.location.href = 'http://localhost:3000/api/user/auth/google';
    };

    return (
        <Button 
            onClick={handleGoogleLogin}
            icon={<GoogleOutlined />}
            style={{
                width: '100%',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#fff',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#f5f5f5'
                }
            }}
        >
            Đăng nhập bằng Google
        </Button>
    );
};

export default GoogleLoginButton; 