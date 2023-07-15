import { Modal, Button, Input, Form, Row, Col, Upload } from 'antd';
import { useState } from 'react';
import { postCreateUser } from '../../services/UserService';
import { toast } from 'react-toastify';

const ModalAddUsers = (props) => {
    const [form] = Form.useForm();
    const { show, close, onAddUsers } = props;
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUsers = async () => {
        let res = await postCreateUser(name, job);

        if (res && res.id) {
            toast.success('Thêm mới thành công!!!');
            close();
            onAddUsers({first_name: name, id: res.id});
        } else {
            toast.error('Thêm mới thất bại!!!');
        }
    }

    return (
        <Modal
            width={600}
            title={props ? "Thêm mới User" : "Edit Users"}
            open={show}
            onCancel={close}
            footer
        >
            <Form form={form}>
                <Form.Item
                    name="name"
                    label='Name'
                >
                    <Input
                        size="large"
                        labelText="Name"
                        value={name}
                        onClick={(event) => setName(event.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="job"
                    label='Job'
                >
                    <Input
                        size="large"
                        labelText="Job"
                        value={name}
                        onClick={(event) => setJob(event.target.value)}
                    />
                </Form.Item>

                {/* <Form.Item
                    name="email"
                    label='Email'
                >
                    <Input
                        size="large"
                        labelText="Email"
                        value={email}
                        onClick={(event) => setEmail(event.target.value)}
                    />
                </Form.Item> */}

                {/* <Form.Item>
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
                </Form.Item> */}
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
                            onClick={() => handleSaveUsers()}
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