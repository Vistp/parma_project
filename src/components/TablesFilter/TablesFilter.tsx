import { Button, Drawer, Checkbox } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useThemeContext } from 'app/ThemeContextProvaider';
import tableStore from 'store/tableStore';
import 'app/index.css'
import { DetailType } from 'types/types';
import { useLocation } from 'react-router-dom';


const TablesFilter = ({
	closeFilterDrawer,
	drawerVisible,
	setSelectedParameters,
	selectedParameters,
	resetFilter,
} : {
	closeFilterDrawer: () => void,
	drawerVisible: boolean,
	setSelectedParameters: Dispatch<SetStateAction<number[]>>,
	selectedParameters: number[],
	resetFilter: () => void,
}) => {
	const { mode } = useThemeContext(); // тема 'light' или 'dark'
  const activeItems = useLocation().pathname.slice(1) as DetailType;
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);

	useEffect(() => {
		const fetchDetails = async () => {
			await tableStore.getDetails(activeItems as DetailType);
			const detailsParameters = tableStore.getDetailsParameters(activeItems);

			if (Array.isArray(detailsParameters)) {
				const uniqueParameters = Array.from(new Set(detailsParameters.filter((param) => param !== undefined)));
				setOptions(
					uniqueParameters.map((param) => ({
						label: `${param} мм`,
						value: param,
					}))
				);
			} else {
				setOptions([]);
			}

			if (drawerVisible) {
				setSelectedParameters(selectedParameters);
			}
		};

		if (drawerVisible) {
			fetchDetails();
		}
	}, [activeItems, drawerVisible, selectedParameters, setSelectedParameters]);


	return (
		<Drawer
				title="Фильтрация по диаметрам"
				placement="right"
				onClose={closeFilterDrawer}
				open={drawerVisible}
				className={mode === 'light' ? 'light-theme' : 'dark-theme'}
			>
        <div>
          <h3>Выберите диаметры:</h3>
          <Checkbox.Group
            options={options}
            onChange={setSelectedParameters}
            value={selectedParameters}
            style={{ display: 'flex', flexDirection: 'column' }}
          />
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={resetFilter}>Сброс</Button>
            <Button type="primary" onClick={closeFilterDrawer}>
              Применить фильтр
            </Button>
          </div>
        </div>
      </Drawer>
	)
}

export default TablesFilter;
