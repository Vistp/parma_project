import { Button } from 'antd';
import { Switch as MUISwitch } from '@mui/material';
import tableStore from 'store/tableStore';
import AddDrillForm from './../AddDrillForm';
import 'app/index.css'


const TablesButtons = ({
	openFilter
} : {
	openFilter: () => void
}) => {
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
    <label>
      Показать сломанные
      <MUISwitch
        checked={tableStore.isBroken}
        onChange={() => tableStore.handleIsBroken()}
      />
    </label>
			<Button type="primary" onClick={openFilter}>Фильтры</Button>
			<AddDrillForm />
		</div>
	)
}

export default TablesButtons;
