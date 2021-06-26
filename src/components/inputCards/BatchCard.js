import styles from './BatchCard.module.scss';
import CommonInputCard from './CommonInputCard';
import { useState } from 'react';
import { useEditState } from '../../state/editState';
import batchesApi from '../../api/batchesApi';
import DatePicker from 'react-datepicker';
import { getDateForServer } from '../../helpers/dateHelper';
function BatchCard() {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

  const { setEditingBatch } = useEditState();

  const close = () => {
    setEditingBatch(false);
  };
  const save = async () => {
    const dateForServer = getDateForServer(date);
    const data = await batchesApi.create({
      name,
      start_date: dateForServer,
      duration,
    });
    console.log(data);
    close();
  };
  return (
    <CommonInputCard save={save} close={close}>
      <div className={styles.name}>
        <input
          type="text"
          placeholder="Batch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.date}>
        <span className="material-icons-outlined">date_range</span>

        <div className={styles.picker}>
          <DatePicker
            selected={date}
            dateFormat={'dd/MM/yyyy'}
            onChange={(date) => setDate(date)}
          />
        </div>
      </div>
      <div className={styles.duration}>
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
    </CommonInputCard>
  );
}

export default BatchCard;
