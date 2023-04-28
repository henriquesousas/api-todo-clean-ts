import { InfraError } from '@src/domain/errors/base/infra-error';

export class NoData extends InfraError {
  constructor() {
    super(404, 'No Data');
  }
}
