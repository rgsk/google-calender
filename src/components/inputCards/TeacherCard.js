import styles from './TeacherCard.module.scss';
import CommonInputCard from './CommonInputCard';
import { useState } from 'react';
import { useEditState } from '../../state/editState';
import teachersApi from '../../api/teachersApi';

function TeacherCard() {
  const [name, setName] = useState('');
  const { setEditingTeacher } = useEditState();
  const close = () => {
    setEditingTeacher(false);
  };
  const save = async () => {
    const data = await teachersApi.create({
      name,
    });
    // console.log(data);
    close();
  };
  return (
    <CommonInputCard save={save} close={close}>
      <div className={styles.name}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </CommonInputCard>
  );
}

export default TeacherCard;
