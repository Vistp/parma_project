import { observer } from "mobx-react-lite"
import tableStore from "store/tableStore"

export const WindowItemDrill:React.FC = observer(() => {
  
  return (
    <div>
      <h1>{tableStore.idDrillDescription}</h1>
    </div>
  )
})
