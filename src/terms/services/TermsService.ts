import { BaseService } from '@/common/services';
import { EducationalProgramId } from '@/educational-programs/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';
import {
  AddTermParams,
  DeleteTermParams,
  EditTermParams,
  Term,
  TermId,
} from '@/terms/entities';

export class TermsService extends BaseService {
  private terms: Record<EducationalProgramId, Record<TermId, Term>> = {};

  async getTerms(educationalProgramId: EducationalProgramId) {
    await delay(2 * SECOND);
    const educationalProgramTerms = this.terms[educationalProgramId];

    if (
      educationalProgramTerms &&
      Object.keys(educationalProgramTerms).length
    ) {
      return Object.values(educationalProgramTerms);
    }

    const arr = new Array(5).fill(null);

    this.terms[educationalProgramId] = arr.reduce(
      (acc, _, index) => {
        const id = faker.number.int();
        return {
          ...acc,
          [id]: {
            id,
            educationalProgramId,
            number: index + 1,
          },
        };
      },
      {} as Record<TermId, Term>,
    );

    return Object.values(this.terms[educationalProgramId]);
  }

  async addTerm(params: AddTermParams): Promise<Term> {
    await delay(2 * SECOND);

    const educationalProgramTerms = this.terms[params.educationalProgramId];

    const term: Term = {
      id: faker.number.int(),
      educationalProgramId: params.educationalProgramId,
      number: params.number,
    };

    if (!educationalProgramTerms) {
      this.terms[params.educationalProgramId] = {
        [term.id]: term,
      };
      return term;
    }

    this.terms[params.educationalProgramId] = {
      ...this.terms[params.educationalProgramId],
      [term.id]: term,
    };

    return term;
  }

  async editTerm(params: EditTermParams): Promise<Term> {
    await delay(2 * SECOND);

    const educationalProgramTerms = this.terms[params.educationalProgramId];

    if (!educationalProgramTerms) {
      throw Error(`Could not edit term: ${params.educationalProgramId}`);
    }

    const term = educationalProgramTerms[params.termId];

    if (!term) {
      throw Error(`Could not edit term: ${params.educationalProgramId}`);
    }

    educationalProgramTerms[params.termId] = {
      ...educationalProgramTerms[params.termId],
      number: params.number,
    };

    return educationalProgramTerms[params.termId];
  }

  async deleteTerms(params: DeleteTermParams): Promise<void> {
    await delay(2 * SECOND);

    const educationalProgramTerms = this.terms[params.educationalProgramId];

    if (!educationalProgramTerms) {
      throw Error(`Could not edit term: ${params.educationalProgramId}`);
    }

    params.termIds.forEach((termId) => {
      delete educationalProgramTerms[termId];
    });
  }
}
