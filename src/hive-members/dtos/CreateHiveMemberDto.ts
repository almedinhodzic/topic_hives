import { HiveRole } from '../../common/types/HiveRole';

export class CreateHiveMemberDto {
  userId: number;
  hiveId: number;
  role: HiveRole;
}
