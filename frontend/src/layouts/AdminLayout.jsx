import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
	return (
		<>
			<div className="flex h-screen">
				<Sidebar role={'admin'} />
				<div className="flex flex-col w-screen">
					<Header role={'admin'} />
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default AdminLayout;
