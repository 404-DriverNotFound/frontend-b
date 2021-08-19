import { RawUserInfoType } from '../types/Response';
import { MyInfoType, RelatedInfoType } from '../types/User';

const makeRelatedInfo = (me: MyInfoType, rawData: RawUserInfoType): RelatedInfoType => {
  // TODO: 구현
  // eslint-disable-next-line no-console
  console.log(me, rawData);
  return {
    id: '',
    name: '',
    avatar: '',
    status: 'OFFLINE',
    relationship: 'NONE',
  };
};

export default makeRelatedInfo;
