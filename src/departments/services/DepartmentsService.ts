import { BaseService } from '@/common/services';
import {
  Department,
  DepartmentId,
  AddDepartmentParams,
  EditDepartmentParams,
} from '@/departments/entities';
import { faker } from '@faker-js/faker';
import { delay, SECOND } from '@/common/utils';
import { HttpClient } from '@/common/http-client';

export class DepartmentsService extends BaseService {
  private departments: Department[];

  constructor(httpClient: HttpClient) {
    super(httpClient);

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

  async addDepartment(params: AddDepartmentParams) {
    await delay(5 * SECOND);
    this.departments.push({
      ...params,
      id: faker.number.int(),
    });
  }

  async deleteDepartments(ids: Array<DepartmentId>) {
    await delay(2 * SECOND);
    this.departments = this.departments.filter(
      (department) => !ids.includes(department.id),
    );
  }

  async editDepartment(params: EditDepartmentParams) {
    await delay(5 * SECOND);
    this.departments = this.departments.map((department) => {
      if (department.id !== params.id) return department;

      return { ...department, ...params };
    });
  }
}
