import { NestFastifyApplication } from '@nestjs/platform-fastify';

/**
 * Creates universes and heroes.
 */
export default async function initData(app: NestFastifyApplication) {
  console.log(app);
  // const universeService = app.get(UniverseService);
  // const heroService = app.get(HeroService);
  // const marvel = await universeService.create(1, 'marvel');
  // const dc = await universeService.create(2, 'dc');
  //
  // await heroService.create(10, 'hulk', false, marvel);
  // await heroService.create(11, 'captain marvel', true, marvel);
  //
  // await heroService.create(20, 'batman', true, dc);
  // await heroService.create(21, 'superman', true, dc);
}
