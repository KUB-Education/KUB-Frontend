import { ToEntity } from '@/common/mappers';
import { AuthenticatedSession } from '@/auth/entities';
import { AuthenticatedSessionDto } from '@/auth/services/dto';

export class AuthenticatedSessionDtoMapper
  implements ToEntity<AuthenticatedSession, AuthenticatedSessionDto>
{
  toEntity(dto: AuthenticatedSessionDto): AuthenticatedSession {
    return {
      accessToken: dto.access_token,
      refreshToken: dto.refresh_token,
      firstLogin: dto.first_login,
    };
  }
}
