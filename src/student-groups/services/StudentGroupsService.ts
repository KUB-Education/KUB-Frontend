import { BaseService } from '@/common/services';
import { StudentGroup } from '@/student-groups/entities';
import { faker } from '@faker-js/faker';
import { AddStudentGroupParams, EditStudentGroupParams } from '@/student-groups/entities';

export class StudentGroupsService extends BaseService {
  private groups: StudentGroup[] = [];

  async getGroups(): Promise<StudentGroup[]> {
    if (this.groups.length) {
      return this.groups;
    }

    this.groups = new Array(faker.number.int({ min: 0, max: 15 })).fill({
      id: faker.number.int(),
      name: faker.company.name(),
      createdAt: faker.date.past().getTime(),
    }).map((group, i) => ({...group, id: i}));

    return this.groups;
  }

  async deleteStudentGroups(ids: number[]) {
    for (const id of ids) {
      this.groups = this.groups.filter(g => g.id !== id);
    }
  }

  async addStudentGroup(params: AddStudentGroupParams): Promise<StudentGroup> {
    const newGroup: StudentGroup = {
      id: this.groups.length ? Math.max(...this.groups.map(g => g.id)) + 1 : 1,
      name: params.name,
      createdAt: Date.now(),
    };
    this.groups.push(newGroup);
    return newGroup;
  }

  async editStudentGroup(params: EditStudentGroupParams): Promise<StudentGroup> {
    const index = this.groups.findIndex(g => g.id === params.id);
    if (index === -1) {
      throw new Error('Student group not found');
    }
    this.groups[index] = { ...this.groups[index], ...params };
    
    return this.groups[index];
  }
}