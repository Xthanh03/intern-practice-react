import { Layout, Menu } from 'antd';
import './App.scss';
import TableUser from './components/table/TableUser';
import { ToastContainer } from 'react-toastify';

function App() {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      <Header
        className="header"
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
      <Content
        className="site-layout"
      >
        <div
          className="table-user"
        >
          <TableUser />
        </div>
      </Content>
      <Footer
        className="footer"
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
}

export default App;
