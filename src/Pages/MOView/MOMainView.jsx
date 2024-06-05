import MONavbar from '../../Component/SidebarComponent/SideBarComponentMO.jsx';
import { BahanProvider } from '../../context/StokBahanBakuContext.jsx';

function MOMainView() {
    return (
        <div>
            <BahanProvider>
                <MONavbar />
            </BahanProvider>
        </div>
    );
}

export default MOMainView;