import { FC, useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { ISelectOption } from '../../../../types/select-option.ts';
import { IUser } from '../../../../types/user.ts';
import UserStore from '../../../../stores/user.ts';
import SkillStore from '../../../../stores/skill.ts';

type IProps = {
  userData: IUser,
  onConfirm: () => void,
}

const userStore = UserStore;
const skillStore = SkillStore;

const SkillModal: FC<IProps> = ({ userData, onConfirm }) => {
  const [skillOptions, setSkillOptions] = useState<ISelectOption[]>([]);
  const [userSkills, setUserSkills] = useState<ISelectOption[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await skillStore.fetchSkills();
        const skillsFromStore = skillStore.getSkills();
        if (!skillsFromStore || !skillsFromStore.length) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSkillOptions(skillsFromStore.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        }));
        if (userData.skills && userData.skills.length) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setUserSkills(userData.skills.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          }));
        }
      } catch (e) {
        throw new Error();
      }
    })();
  }, []);

  const changeSkills = async () => {
    try {
      const payload: number[] = userSkills.map(skill => skill.value as number);
      await userStore.updateUserSkills(payload, userData.id);
      onConfirm();
    } catch (e) {
      throw new Error();
    }
  };

  return (skillOptions.length &&
    <div className={'app__form-field'}>
      <MultiSelect
        options={skillOptions}
        value={userSkills}
        onChange={(newSkill: ISelectOption[]) => setUserSkills([...newSkill])}
        labelledBy={'Select skill'}
      />

      <div className={'app__modal-btn-wrp'}>
        <button
          type={'button'}
          className={'app__modal-confirm-btn'}
          disabled={!Array.isArray(userSkills)}
          onClick={changeSkills}
        >
          save
        </button>
      </div>
    </div>
  )
};

export default SkillModal;