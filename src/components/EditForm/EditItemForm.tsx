import { DetailType } from 'types/types';
import { EditDrillForm } from './Forms/EditDrillForm';
import { EditScrewForm } from './Forms/EditScrewForm';
import { EditPlateForm } from './Forms/EditPlateForm';

export const EditItemForm = ({
    id,
    visible,
    onClose,
    activeItem
}: {
    id: number | null,
    visible: boolean,
    onClose: () => void,
    activeItem: DetailType
}) => {
    if (activeItem === 'drills') {
        return <EditDrillForm id={id} visible={visible} onClose={onClose} activeItem={'drills'}  />;
    } else if (activeItem === 'screws') {
        return <EditScrewForm id={id} visible={visible} onClose={onClose} activeItem={'screws'}/>;
    } else if (activeItem === 'plates') {
        return <EditPlateForm id={id} visible={visible} onClose={onClose} activeItem={'plates'}/>;
    }
    return null;
};
