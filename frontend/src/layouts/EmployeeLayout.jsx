import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const EmployeeLayout = () => {
	return (
		<>
			<div className="flex h-screen">
				<Sidebar role={"employee"}/>
				<div className="flex flex-col w-screen">
          <Header role={'employee'} />
          <Outlet />
        </div>
			</div>
		</>
	);
};

export default EmployeeLayout;
