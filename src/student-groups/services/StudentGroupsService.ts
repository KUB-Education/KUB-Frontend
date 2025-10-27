import { BaseService } from '@/common/services';
import { StudentGroup } from '@/student-groups/entities';
import { faker } from '@faker-js/faker';

export class StudentGroupsService extends BaseService {
  private groups: StudentGroup[] = [];

  async getGroups(): Promise<StudentGroup[]> {
    this.groups = new Array(faker.number.int({ min: 0, max: 15 })).fill({
      id: faker.number.int(),
      name: faker.company.name(),
      createdAt: faker.date.past().getTime(),
    });

    return this.groups;
  }
}
