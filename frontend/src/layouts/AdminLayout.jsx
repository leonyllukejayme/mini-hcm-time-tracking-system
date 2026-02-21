import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminLayout = () => {
	return (
		<>
			<div className="flex h-screen">
				<Sidebar role={"admin"}/>
				<div className="flex flex-col w-screen">
          <Header role={'admin'} />
          <Outlet />
        </div>
			</div>
		</>
	);
};

export default AdminLayout;
