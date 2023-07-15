import { Modal, Button, Input, Form, Row, Col, Upload } from 'antd';
import { useState } from 'react';

const ModalAddUsers = (props) => {
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [avatar, setAvatar] = useState("");

    const handleSaveUser = () => {
        console.log('handleSaveUser: ', "email =", email);
    }

    return (
        <Modal
            width={600}
            title={props ? "Thêm mới User" : "Edit Users"}
            open={props.show}
            onCancel={props.close}
            footer
        >
            <Form form={form}>
                <Form.Item
                    name="email"
                    label='Email'
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ email của bạn !!!',
                        },
                        {
                            type: 'email',
                            message: 'Địa chỉ email không đúng định dạng !!!',
                        },
                    ]}
                >
                    <Input
                        size="large"
                        labelText="Email"
                        value={email}
                        onClick={(event) => setEmail(event.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item label='First Name'>
                                <Input
                                    size="large"
                                    value={firstName}
                                    onClick={(event) => setFirstName(event.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Last Name'>
                                <Input
                                    size="large"
                                    value={lastName}
                                    onClick={(event) => setLastName(event.target.value)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="avatar"
                    label="Avatar"
                    rules={[{ required: true, message: 'Vui lòng thêm hình ảnh!!!' }]}
                >
                    <Upload
                        action="/upload.do"
                        maxCount={1}
                        listType="picture-card"
                        multiple={true}
                        value={avatar}
                        onClick={(event) => setAvatar(event.target.value)}
                    >
                        <div>Upload</div>
                    </Upload>
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div></div>
                    <Form.Item>
                        <Button onClick={props.close} size="large">
                            Hủy
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            style={{ marginLeft: 10 }}
                            onClick={() => handleSaveUser()}
                        >
                            Thêm mới
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
export default ModalAddUsers;