import { BaseService } from '@/common/services';
import {
  AddDepartmentParams,
  EditDepartmentParams,
  Department,
  DepartmentId,
} from '@/departments/entities';
import { HttpClient } from '@/common/http-client';
import { DepartmentDto } from '@/departments/services/dto';

export class DepartmentsService extends BaseService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  async getDepartments(): Promise<Department[]> {
    const { data } = await this.http.get<DepartmentDto[]>('/departments');
    return data;
  }

  async addDepartment(params: AddDepartmentParams): Promise<Department> {
    const { data } = await this.http.post<DepartmentDto>('/departments', {
      data: params,
    });

    return data;
  }

  async deleteDepartments(ids: Array<DepartmentId>): Promise<void> {
    await Promise.all(ids.map((id) => this.http.delete(`/departments/${id}`)));
  }

  async editDepartment(params: EditDepartmentParams): Promise<Department> {
    const { id, name } = params;
    const { data } = await this.http.put<DepartmentDto>(`/departments/${id}`, {
      data: {
        name,
      },
    });

    return data;
  }
}
