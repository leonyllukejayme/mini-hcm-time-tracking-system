import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const Layout = () => {
	return (
		<>
			<div className="flex h-screen">
				<Sidebar />
				<div className="flex flex-col w-screen">
          <Header />
          <Outlet />
        </div>
			</div>
		</>
	);
};

export default Layout;
