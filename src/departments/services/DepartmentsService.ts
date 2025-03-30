import { BaseService } from '@/common/services';
import { Department, DepartmentId } from '@/departments/entities';
import { faker } from '@faker-js/faker';

export class DepartmentsService extends BaseService {
  private readonly departments: Department[];

  constructor() {
    super();

    this.departments = new Array(10).fill(0).map((_, i) => {
      return { id: i, name: faker.person.jobArea() };
    });
  }

  async getDepartments(): Promise<Department[]> {
    return this.departments;
  }

  async getDepartment(id: DepartmentId): Promise<Department | null> {
    const foundDepartment = this.departments.find((d) => d.id === id);

    return foundDepartment || null;
  }
}
