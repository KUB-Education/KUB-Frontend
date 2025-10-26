import { ToEntity } from '@/common/mappers';
import { Lecturer } from '@/lecturers/entities';
import { LecturerDto } from '@/lecturers/services/dto';
import { UserDtoMapper } from '@/users/mappers';

export class LecturerDtoMapper implements ToEntity<Lecturer, LecturerDto> {
  toEntity(dto: LecturerDto): Lecturer {
    const userDtoMapper = new UserDtoMapper();
    const user = userDtoMapper.toEntity.call(userDtoMapper, dto.user);

    return {
      id: dto.id,
      userId: dto.user.id,
      userStatus: user.status,
      email: user.email,
      middleName: user.middleName,
      firstName: user.firstName,
      lastName: user.lastName,
      academicTitles: dto.academic_titles,
      departmentPositions: dto.department_positions,
    };
  }
}
