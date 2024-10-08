import { DataSource } from 'typeorm';
import {
  SeederFactoryManager,
  Seeder as TypeormExtensionSeeder,
} from 'typeorm-extension';
import { Seed } from './entities/seed.entity';

export default abstract class Seeder implements TypeormExtensionSeeder {
  protected name;
  private seedRepository;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    if (!this.name) {
      throw new Error('Name must be provided');
    }

    if (await this.seedAlreadyExist(dataSource)) return;

    await this.execute(dataSource, factoryManager);

    await this.saveSeed();
  }

  protected abstract execute(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any>;

  private async seedAlreadyExist(dataSource: DataSource) {
    this.seedRepository = dataSource.getRepository(Seed);

    const seed = await this.seedRepository.findOneBy({ name: this.name });

    return !!seed;
  }

  private async saveSeed() {
    await this.seedRepository.save({ name: this.name });
  }
}
