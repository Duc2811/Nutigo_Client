import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage, getChatHistory, deleteMessage, getChatUsers } from '../../../Service/Client/ApiChatbox';
import { format } from 'date-fns';
import { Send, Trash2, User, Search } from 'lucide-react';
import { Avatar, Input, Button, List, Badge, Card, Row, Col, Typography } from 'antd';
import { Container } from 'react-bootstrap';
import { cn } from "@/lib/utils";

const { Title } = Typography;

const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef(null);
    const currentUser = useSelector(state => state.user.user);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (selectedUser) {
            loadChatHistory();
        }
    }, [selectedUser]);

    useEffect(() => {
        const fetchChatUsers = async () => {
            try {
                setLoading(true);
                const data = await getChatUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching chat users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChatUsers();
    }, []);

    const loadChatHistory = async () => {
        try {
            const data = await getChatHistory(selectedUser._id);
            setMessages(data);
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            await sendMessage(selectedUser._id, newMessage);
            setNewMessage('');
            loadChatHistory();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await deleteMessage(messageId);
            loadChatHistory();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container fluid className="p-0 h-100 bg-light">
            <Row className="h-100 g-0">
                {/* Sidebar */}
                <Col xs={4} md={3} className="border-end h-100 bg-white">
                    <Card className="h-100 rounded-0 border-0 shadow-sm">
                        <div className="p-3 border-bottom bg-white">
                            <Title level={5} className="mb-0">Messages</Title>
                            <div className="mt-2">
                                <Input
                                    prefix={<Search className="w-4 h-4 text-muted" />}
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="rounded-pill"
                                />
                            </div>
                        </div>
                        <div className="overflow-auto" style={{ height: 'calc(100vh - 140px)' }}>
                            {loading ? (
                                <div className="d-flex justify-content-center p-3">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <List
                                    dataSource={filteredUsers}
                                    renderItem={(user) => (
                                        <List.Item
                                            className={cn(
                                                "cursor-pointer hover-bg-light transition-colors px-3 py-2",
                                                selectedUser?._id === user._id && "bg-light"
                                            )}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar
                                                        src={user.avatar}
                                                        className="bg-primary"
                                                        icon={<User className="w-4 h-4" />}
                                                    />
                                                }
                                                title={<span className="fw-medium">{user.name}</span>}
                                                description={<span className="text-muted small">{user.email}</span>}
                                            />
                                            <Badge status="success" />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </div>
                    </Card>
                </Col>

                {/* Main Chat Area */}
                <Col xs={8} md={9} className="d-flex flex-column bg-white h-100">
                    {selectedUser ? (
                        <>
                            <div className="p-3 border-bottom bg-white shadow-sm">
                                <div className="d-flex align-items-center">
                                    <Avatar
                                        src={selectedUser.avatar}
                                        className="bg-primary me-2"
                                        icon={<User className="w-4 h-4" />}
                                    />
                                    <div>
                                        <h2 className="h5 mb-0">{selectedUser.name}</h2>
                                        <small className="text-muted">Online</small>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow-1 overflow-auto p-3 bg-light">
                                <div className="d-flex flex-column gap-3">
                                    {messages.map((message) => (
                                        <div
                                            key={message._id}
                                            className={cn(
                                                "d-flex align-items-end gap-2",
                                                message.sender === currentUser._id
                                                    ? "justify-content-end"
                                                    : "justify-content-start"
                                            )}
                                        >
                                            {message.sender !== currentUser._id && (
                                                <Avatar
                                                    src={selectedUser.avatar}
                                                    className="bg-primary"
                                                    icon={<User className="w-4 h-4" />}
                                                />
                                            )}
                                            <div
                                                className={cn(
                                                    "rounded p-3 shadow-sm",
                                                    message.sender === currentUser._id
                                                        ? "bg-primary text-white"
                                                        : "bg-white"
                                                )}
                                                style={{ maxWidth: '70%' }}
                                            >
                                                <p className="mb-1">{message.content}</p>
                                                <small className={cn(
                                                    "opacity-75",
                                                    message.sender === currentUser._id ? "text-white" : "text-muted"
                                                )}>
                                                    {format(new Date(message.timestamp), 'HH:mm')}
                                                </small>
                                            </div>
                                            {message.sender === currentUser._id && (
                                                <Button
                                                    type="text"
                                                    icon={<Trash2 className="w-4 h-4" />}
                                                    onClick={() => handleDeleteMessage(message._id)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            <form
                                onSubmit={handleSendMessage}
                                className="p-3 border-top bg-white shadow-sm"
                            >
                                <div className="d-flex gap-2">
                                    <Input
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-grow-1 rounded-pill"
                                    />
                                    <Button
                                        type="primary"
                                        icon={<Send className="w-4 h-4" />}
                                        htmlType="submit"
                                        className="rounded-circle"
                                    />
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">
                            <div className="text-center">
                                <User className="w-12 h-12 mb-3 text-muted" />
                                <h2 className="h5">Select a user to start chatting</h2>
                                <p className="text-muted">Choose from your contacts to begin a conversation</p>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Chatbox;
